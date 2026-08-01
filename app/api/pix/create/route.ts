import { NextResponse } from "next/server";
import {
  consumeRateLimit,
  getCheckoutSessionToken,
  getClientIp,
  hashRateLimitValue,
  validateCheckoutSession,
} from "@/lib/checkout-security";
import { buildOrderCode } from "@/lib/order-code";
import { saveOrder } from "@/lib/order-store";
import { indexOrder } from "@/lib/orders";
import type { OrderEmailItem } from "@/lib/order-email";
import type { Attribution } from "@/lib/attribution";
import { sanitizeAttribution } from "@/lib/attribution";
import type { GatewayConfig, GatewayId } from "@/lib/gateways/active";
import {
  WEBHOOK_PATH,
  gatewayConfigured,
  getGatewayChain,
  getGatewayConfig,
  markTxGateway,
} from "@/lib/gateways/active";
import { createPixMedusa } from "@/lib/gateways/medusa";
import { createPixCenturion } from "@/lib/gateways/centurion";
import { qstashConfigured, scheduleDelayedCall, abandonedSig } from "@/lib/qstash";

export const dynamic = "force-dynamic";

// Depois de gerar o PIX, o QStash chama /api/abandoned/check nesse tempo. Se o
// pedido não tiver sido pago, dispara o e-mail de pedido pendente. (PIX expira
// em 10 min → 15 dá margem depois do vencimento.)
const ABANDONED_DELAY_MIN = 5;

// Agenda o e-mail de pedido pendente via QStash (best-effort). Precisa de
// NEXT_PUBLIC_APP_URL (o QStash chama uma URL pública) + QSTASH_TOKEN.
async function scheduleAbandonedCheck(appBaseUrl: string, txid: string) {
  if (!qstashConfigured() || !appBaseUrl) return;
  try {
    const callback = `${appBaseUrl}/api/abandoned/check?txid=${encodeURIComponent(txid)}&sig=${abandonedSig(txid)}`;
    await scheduleDelayedCall(callback, ABANDONED_DELAY_MIN * 60);
  } catch (err) {
    console.error("[PIX API] Falha ao agendar e-mail de pendente:", err);
  }
}

// Persiste o pedido no KV (snapshot pro e-mail/painel) e indexa. Compartilhado
// pelos gateways Medusa/Centurion. Espelha a persistência do fluxo Pagou abaixo.
async function persistNewOrder(
  txid: string,
  order: any,
  value: number,
  customer: { name: string; email: string; phone: string; cpf: string },
  // De onde o cliente veio. Vai DENTRO do mesmo registro de pedido — é o que
  // permite creditar a venda ao anúncio quando o webhook confirmar o pagamento,
  // sem depender do cliente voltar pra loja depois de pagar o PIX.
  attribution?: Attribution
): Promise<string> {
  const orderCode = buildOrderCode(txid);
  try {
    await saveOrder(txid, {
      txid,
      createdAt: new Date().toISOString(),
      orderCode,
      paymentMethod: "pix",
      customer,
      address: {
        cep: String(order?.address?.cep ?? "").trim(),
        street: String(order?.address?.street ?? "").trim(),
        number: String(order?.address?.number ?? "").trim(),
        complement: order?.address?.complement ? String(order.address.complement).trim() : undefined,
        neighborhood: String(order?.address?.neighborhood ?? "").trim(),
        city: String(order?.address?.city ?? "").trim(),
        stateUF: String(order?.address?.stateUF ?? "").trim().toUpperCase(),
      },
      items: Array.isArray(order?.items) ? (order.items as OrderEmailItem[]) : [],
      subtotal: Number(order?.subtotal ?? value),
      shipping: Number(order?.shipping ?? 0),
      discount: Number(order?.discount ?? 0) > 0 ? Number(order.discount) : undefined,
      coupon: order?.coupon ? String(order.coupon) : undefined,
      total: Number(value),
      ...(attribution ? { attribution } : {}),
    });
    await indexOrder(txid, Date.now());
  } catch (err) {
    console.error("[PIX API] Falha ao persistir pedido no KV:", err);
  }
  return orderCode;
}

// Domínio público desta loja (usado quando o relay do gateway está desligado).
function getOwnWebhookUrl(request: Request, path: string) {
  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || url.host;
  const hostname = host.split(":")[0]?.toLowerCase() || "";

  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)
  ) {
    return null;
  }

  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const proto = forwardedProto === "http" || forwardedProto === "https" ? forwardedProto : url.protocol.replace(":", "");
  return `${proto === "http" ? "https" : proto}://${host}${path}`;
}

// Pra onde o gateway avisa o pagamento: o relay dele (se ligado no /admin) ou o
// domínio próprio desta loja.
async function resolveNotifyUrl(request: Request, id: GatewayId, relay: GatewayConfig["relay"]) {
  if (relay.enabled[id] && relay.url) return relay.url;
  return getOwnWebhookUrl(request, WEBHOOK_PATH[id]);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const ipLimit = consumeRateLimit(`pix:create:ip:${ip}`, 8, 10 * 60 * 1000);
  if (!ipLimit.ok) {
    return NextResponse.json(
      { error: "Muitas tentativas de pagamento. Tente novamente em instantes." },
      { status: 429, headers: { "Retry-After": String(ipLimit.retryAfterSeconds) } }
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { value, phone, email, name, cpf, title } = body ?? {};

  // Validação estrita
  if (!value || value <= 0) {
    return NextResponse.json({ error: "Valor da transação inválido." }, { status: 400 });
  }
  if (!name || name.trim() === "") {
    return NextResponse.json({ error: "O Nome é obrigatório." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const phoneDigits = (phone || "").replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    return NextResponse.json({ error: "Telefone deve ter 10 ou 11 dígitos (com DDD)." }, { status: 400 });
  }

  const cpfDigits = (cpf || "").replace(/\D/g, "");
  if (cpfDigits.length !== 11) {
    return NextResponse.json({ error: "CPF inválido. Deve conter 11 dígitos." }, { status: 400 });
  }

  const identityLimit = consumeRateLimit(
    `pix:create:identity:${hashRateLimitValue(`${cpfDigits}|${email}|${phoneDigits}`)}`,
    4,
    30 * 60 * 1000
  );
  if (!identityLimit.ok) {
    return NextResponse.json(
      { error: "Muitas tentativas para estes dados. Aguarde alguns minutos e tente novamente." },
      { status: 429, headers: { "Retry-After": String(identityLimit.retryAfterSeconds) } }
    );
  }

  // Origem do visitante (gclid/utm) enviada pelo checkout. Corpo vindo do
  // cliente: passa pelo sanitizador antes de encostar no pedido.
  const attribution = sanitizeAttribution(body?.attribution);

  const amountCents = Math.round(Number(value) * 100);
  const checkoutSession = validateCheckoutSession(getCheckoutSessionToken(request), amountCents);
  if (!checkoutSession.ok) {
    return NextResponse.json(
      { error: "Sessao de checkout expirada ou invalida. Volte ao carrinho e tente novamente." },
      { status: 403 }
    );
  }

  // IP do comprador (os gateways exigem em todos os métodos). Em local/dev cai
  // num IP público BR. Calculado aqui em cima pra servir os 3 gateways.
  const isPrivateIp = (v: string) =>
    !v ||
    v === "unknown" ||
    v === "127.0.0.1" ||
    v === "::1" ||
    v === "0.0.0.0" ||
    v.startsWith("192.168.") ||
    v.startsWith("10.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(v);
  const buyerIp = isPrivateIp(ip) ? "177.71.248.55" : ip;

  // ── Multi-gateway com fallback: tenta os gateways LIGADOS na ordem de
  // prioridade definida no /admin. Se um estiver fora (chave inválida,
  // adquirente caído, timeout), passa pro próximo sozinho. Erro de dado do
  // comprador (400) não tenta outro — trocar de gateway não conserta CPF. ──
  const gwConfig = await getGatewayConfig();
  const chain = gwConfig.order.filter((id) => gwConfig.enabled[id]);
  if (!chain.length) chain.push(...(await getGatewayChain()));
  const appBaseUrl = (process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");
  // Relay por gateway (ligado no /admin): o aviso de pagamento vai pro relay em
  // vez do domínio da loja. A Medusa é exceção — a v2 não aceita URL no request,
  // então lá o relay é cadastrado no painel dela (o painel mostra qual URL usar).

  // "ok" → resposta pronta; "fatal" → devolve sem tentar outro gateway;
  // "retry" → gateway fora do ar, tenta o próximo da fila.
  type Attempt =
    | { outcome: "ok"; json: Record<string, unknown> }
    | { outcome: "fatal"; response: NextResponse }
    | { outcome: "retry"; reason: string };

  async function attemptMedusa(): Promise<Attempt> {
    // Na API v2 o webhook é cadastrado no painel da Medusa (Configurações → API
    // e Integrações → Webhook) apontando para {dominio}/api/webhooks/medusa —
    // não existe mais postbackUrl no corpo da cobrança.
    const result = await createPixMedusa({
      amountCents,
      name: name.trim(),
      email: email.trim(),
      cpfDigits,
      phoneDigits,
      ip: buyerIp,
      title: title || "Gold Grill",
    });
    if (!result.ok) {
      console.error(`[PIX/Medusa] Erro (${result.status}/${result.code ?? "-"}):`, result.error);
      if (result.status === 400) {
        return {
          outcome: "fatal",
          response: NextResponse.json({ error: result.error || "Dados recusados pela MedusaPay." }, { status: 400 }),
        };
      }
      return { outcome: "retry", reason: `http ${result.status ?? "-"} ${result.code ?? result.error ?? ""}`.trim() };
    }
    if (result.simulated) {
      // Conta em Modo Teste: a Medusa aprova na hora e não gera PIX real.
      console.error("[PIX/Medusa] conta em Modo Teste — venda simulada, sem QR Code.");
      return { outcome: "retry", reason: "modo teste (venda simulada, sem PIX real)" };
    }
    if (!result.qrCode) {
      return { outcome: "retry", reason: "resposta sem QR Code" };
    }
    const txid = result.txid ?? null;
    let orderCode: string | null = null;
    if (txid) {
      orderCode = await persistNewOrder(String(txid), body?.order ?? {}, Number(value), {
        name: name.trim(),
        email: email.trim(),
        phone: phoneDigits,
        cpf: cpfDigits,
      }, attribution);
      await markTxGateway(String(txid), "medusa");
      await scheduleAbandonedCheck(appBaseUrl, String(txid));
    }
    return {
      outcome: "ok",
      json: {
        txid,
        orderCode,
        qrCode: result.qrCode,
        qrCodeImage: result.qrCodeImage ?? null,
        expiresAt: result.expiresAt ?? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: result.paymentStatus ?? "pending",
        amount: value,
        phone: phoneDigits,
      },
    };
  }

  async function attemptCenturion(): Promise<Attempt> {
    const postbackUrl =
      (await resolveNotifyUrl(request, "centurion", gwConfig.relay)) ??
      (appBaseUrl ? `${appBaseUrl}${WEBHOOK_PATH.centurion}` : undefined);
    const a = body?.order?.address;
    const address =
      a && a.cep
        ? {
            cep: String(a.cep || ""),
            street: String(a.street || ""),
            number: String(a.number || ""),
            complement: a.complement ? String(a.complement) : undefined,
            neighborhood: String(a.neighborhood || ""),
            city: String(a.city || ""),
            stateUF: String(a.stateUF || ""),
          }
        : undefined;
    const result = await createPixCenturion({
      amountCents,
      name: name.trim(),
      email: email.trim(),
      cpfDigits,
      phoneDigits,
      ip: buyerIp,
      title: title || "Gold Grill",
      postbackUrl,
      address,
    });
    if (!result.ok) {
      console.error(`[PIX/Centurion] Erro (${result.status}):`, result.error);
      if (result.status === 400) {
        return {
          outcome: "fatal",
          response: NextResponse.json({ error: result.error || "Dados recusados pela CenturionPay." }, { status: 400 }),
        };
      }
      return { outcome: "retry", reason: `http ${result.status ?? "-"} ${result.error ?? ""}`.trim() };
    }
    if (!result.qrCode) {
      return { outcome: "retry", reason: "resposta sem QR Code" };
    }
    const txid = result.txid ?? null;
    let orderCode: string | null = null;
    if (txid) {
      orderCode = await persistNewOrder(String(txid), body?.order ?? {}, Number(value), {
        name: name.trim(),
        email: email.trim(),
        phone: phoneDigits,
        cpf: cpfDigits,
      }, attribution);
      await markTxGateway(String(txid), "centurion");
      await scheduleAbandonedCheck(appBaseUrl, String(txid));
    }
    return {
      outcome: "ok",
      json: {
        txid,
        orderCode,
        qrCode: result.qrCode,
        qrCodeImage: result.qrCodeImage ?? null,
        expiresAt: result.expiresAt ?? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: result.paymentStatus ?? "pending",
        amount: value,
        phone: phoneDigits,
      },
    };
  }

  // ── Pagou.ai (gateway padrão — mesmo fluxo de sempre, com o relay dele) ──
  async function attemptPagou(): Promise<Attempt> {
  const secretKey = (process.env.PAGOUAI_SECRET_KEY || "").trim().replace(/^Bearer\s+/i, "");
  const endpoint = "https://api.pagou.ai/v2/transactions";
  const externalRef = `order_${Date.now()}_${hashRateLimitValue(`${cpfDigits}|${amountCents}|${email}`).slice(0, 8)}`;

  // buyerIp já calculado no topo (serve os 3 gateways).
  const payload: Record<string, any> = {
    external_ref: externalRef,
    amount: amountCents,
    currency: "BRL",
    method: "pix",
    ip_address: buyerIp,
    buyer: {
      name: name.trim(),
      email: email.trim(),
      phone: phoneDigits,
      ip_address: buyerIp,
      document: {
        number: cpfDigits,
        type: "CPF",
      },
    },
    products: [
      {
        name: title || "Gold Grill",
        quantity: 1,
        price: amountCents,
      },
    ],
  };

  const notifyUrl = await resolveNotifyUrl(request, "pagou", gwConfig.relay);
  if (notifyUrl) {
    Object.assign(payload, { notify_url: notifyUrl });
  }

  try {
    // Log sem dado pessoal (CPF/e-mail/telefone) e sem pedaço de chave: o log
    // serve pra diagnosticar, não pra guardar cadastro de cliente.
    console.log("[PIX API] >>> criando cobranca:", { ref: externalRef, valor: amountCents, notify: Boolean(notifyUrl) });

    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${secretKey}`,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const raw = await upstream.text();
    console.log(`[PIX API] <<< status ${upstream.status}`);

    let data: any = null;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = null;
    }

    if (!upstream.ok) {
      const collectErrors = (input: any): string[] => {
        if (!input) return [];
        if (typeof input === "string") return [input];
        if (Array.isArray(input)) return input.flatMap(collectErrors);
        if (typeof input === "object") {
          const parts: string[] = [];
          if (input.message) parts.push(String(input.message));
          if (input.detail) parts.push(String(input.detail));
          if (input.error && typeof input.error === "string") parts.push(input.error);
          if (input.field && input.message) parts.push(`${input.field}: ${input.message}`);
          if (input.path) parts.push(`${Array.isArray(input.path) ? input.path.join(".") : input.path}: ${input.message || ""}`);
          return parts.length ? parts : [JSON.stringify(input)];
        }
        return [String(input)];
      };

      const errorParts = [
        ...collectErrors(data?.errors),
        ...collectErrors(data?.validation_errors),
        ...collectErrors(data?.error),
        ...collectErrors(data?.detail),
        ...collectErrors(data?.message),
      ].filter(Boolean);

      const detail = errorParts.length ? errorParts.join(" | ") : raw || "Erro desconhecido no gateway";
      console.error(`[PIX API] Erro (${upstream.status}):`, raw);

      if (upstream.status === 400 || upstream.status === 422) {
        return { outcome: "fatal", response: NextResponse.json({ error: detail }, { status: 400 }) };
      }

      return { outcome: "retry", reason: `http ${upstream.status} ${detail}`.slice(0, 200) };
    }

    const transaction = data?.data ?? data ?? {};
    const pix = transaction?.pix ?? {};
    const qrCode = pix.qr_code ?? pix.qrcode ?? pix.qrCode ?? "";
    const qrCodeImage = pix.url ?? null;

    if (!qrCode) {
      console.error("[PIX API] Resposta de sucesso, mas sem QR Code:", raw);
      return { outcome: "retry", reason: "resposta sem QR Code" };
    }

    const expiresAt = pix.expiration_date ?? new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const txid = transaction?.id ?? data?.id ?? data?.transactionId ?? null;

    // Persiste o pedido completo associado ao txid para que o webhook consiga
    // disparar o e-mail de confirmação no servidor (mesmo com a aba fechada).
    // O código do pedido é gerado aqui e devolvido ao front, que o salva no
    // localStorage do rastreio — mantendo um único código em toda a jornada.
    let orderCode: string | null = null;
    if (txid) {
      orderCode = buildOrderCode(String(txid));
      try {
        const orderInput = (body?.order ?? {}) as {
          address?: any;
          items?: OrderEmailItem[];
          subtotal?: number;
          shipping?: number;
          discount?: number;
          coupon?: string;
        };

        await saveOrder(String(txid), {
          txid: String(txid),
          createdAt: new Date().toISOString(),
          orderCode,
          paymentMethod: "pix",
          customer: {
            name: name.trim(),
            email: email.trim(),
            phone: phoneDigits,
            cpf: cpfDigits,
          },
          address: {
            cep: String(orderInput.address?.cep ?? "").trim(),
            street: String(orderInput.address?.street ?? "").trim(),
            number: String(orderInput.address?.number ?? "").trim(),
            complement: orderInput.address?.complement
              ? String(orderInput.address.complement).trim()
              : undefined,
            neighborhood: String(orderInput.address?.neighborhood ?? "").trim(),
            city: String(orderInput.address?.city ?? "").trim(),
            stateUF: String(orderInput.address?.stateUF ?? "").trim().toUpperCase(),
          },
          items: Array.isArray(orderInput.items) ? orderInput.items : [],
          subtotal: Number(orderInput.subtotal ?? value),
          shipping: Number(orderInput.shipping ?? 0),
          discount: Number(orderInput.discount ?? 0) > 0 ? Number(orderInput.discount) : undefined,
          coupon: orderInput.coupon ? String(orderInput.coupon) : undefined,
          total: Number(value),
          ...(attribution ? { attribution } : {}),
        });

        // Indexa o pedido pro painel /admin listar os mais recentes (best-effort).
        await indexOrder(String(txid), Date.now());
      } catch (err) {
        // Não bloqueia o pagamento; apenas o e-mail server-side pode não sair.
        console.error("[PIX API] Falha ao persistir pedido no KV:", err);
      }
      // Marca o gateway que processou (pro painel mostrar) e agenda o e-mail
      // de pedido pendente (Pagou.ai).
      await markTxGateway(String(txid), "pagou");
      await scheduleAbandonedCheck(appBaseUrl, String(txid));
    }

    return {
      outcome: "ok",
      json: {
        txid,
        orderCode,
        qrCode,
        qrCodeImage,
        expiresAt,
        status: transaction?.status ?? "pending",
        amount: value,
        phone: phoneDigits,
      },
    };
  } catch (err) {
    console.error("[PIX API] Falha na rede/comunicação:", err);
    return { outcome: "retry", reason: "falha de rede" };
  }
  }

  // ── Percorre a fila até um gateway devolver PIX ──
  const attempts: Record<GatewayId, () => Promise<Attempt>> = {
    medusa: attemptMedusa,
    centurion: attemptCenturion,
    pagou: attemptPagou,
  };

  const falhas: string[] = [];
  for (const gw of chain) {
    if (!gatewayConfigured(gw)) {
      falhas.push(`${gw}: sem chave no ambiente`);
      continue;
    }
    let attempt: Attempt;
    try {
      attempt = await attempts[gw]();
    } catch (err) {
      console.error(`[PIX API] Exceção no gateway ${gw}:`, err);
      attempt = { outcome: "retry", reason: "exceção inesperada" };
    }

    if (attempt.outcome === "ok") {
      if (falhas.length) {
        console.warn(`[PIX API] fallback: ${gw} assumiu depois de ${falhas.join(" | ")}`);
      }
      return NextResponse.json(attempt.json);
    }
    if (attempt.outcome === "fatal") return attempt.response;

    falhas.push(`${gw}: ${attempt.reason}`);
    console.error(`[PIX API] gateway ${gw} fora — tentando o próximo. Motivo: ${attempt.reason}`);
  }

  console.error(`[PIX API] TODOS os gateways falharam: ${falhas.join(" | ")}`);
  return NextResponse.json(
    { error: "Pagamento indisponível no momento. Tente novamente em instantes." },
    { status: 502 }
  );
}
