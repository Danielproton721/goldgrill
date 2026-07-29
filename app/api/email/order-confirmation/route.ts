import { NextResponse } from "next/server";
import { getOrder } from "@/lib/order-store";
import { dispatchOrderEmailOnce } from "@/lib/send-order-email";
import { consumeRateLimit, getClientIp } from "@/lib/checkout-security";
import { kvConfigured } from "@/lib/kv-store";

export const dynamic = "force-dynamic";

// Dispara o e-mail de confirmação do pedido (o front chama isto quando o
// pagamento confirma com a aba aberta; os webhooks fazem o mesmo pelo servidor).
//
// ATENÇÃO — esta rota é PÚBLICA e manda e-mail pelo domínio da loja. Antes ela
// aceitava o pedido inteiro pelo corpo e só validava o FORMATO: qualquer pessoa
// podia mandar e-mail com conteúdo e destinatário próprios saindo de
// atendimento-pedidos@goldgrill.shop — phishing com o nosso domínio, queima da
// cota do Resend e reputação do domínio no lixo (aí o e-mail de confirmação
// legítimo passa a cair no spam do cliente).
//
// Agora o corpo é ignorado: manda-se só o txid, e o conteúdo sai do pedido
// gravado no KV. Quem não tem um pedido real não manda e-mail nenhum.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!consumeRateLimit(`email:confirm:${ip}`, 10, 10 * 60 * 1000).ok) {
    return NextResponse.json({ error: "Muitas tentativas. Aguarde alguns minutos." }, { status: 429 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const txid = String(body?.txid || "").trim();
  if (!txid) {
    return NextResponse.json({ error: "txid obrigatório." }, { status: 400 });
  }

  if (!kvConfigured()) {
    // Sem banco não há pedido pra conferir. O webhook do gateway cuida do envio.
    return NextResponse.json({ ok: false, error: "Indisponível." }, { status: 503 });
  }

  // Fonte da verdade: o pedido persistido no momento da cobrança.
  const pedido = await getOrder(txid);
  if (!pedido) {
    console.warn("[EMAIL] pedido inexistente pro txid recebido:", txid, "ip:", ip);
    return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  }

  const result = await dispatchOrderEmailOnce(txid, pedido);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true, id: result.id ?? null, deduped: result.deduped ?? false });
}
