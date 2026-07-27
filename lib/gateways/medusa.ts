// Provider MedusaPay — API v2 (doc: https://app.medusapayoficial.pro/docs).
//
// Mudou tudo em relação à versão antiga (api.v2.medusapay.com.br + Basic Auth):
//   • base       https://api.medusapayoficial.pro/api/v1
//   • auth       Authorization: Bearer mk_live_<token>   (era Basic secret:x)
//   • valor      em REAIS (150.00), NÃO em centavos
//   • campos     clienteNome/clienteEmail/clienteCpf/produto/valor/metodo
//   • status     pendente | aprovado | recusado | estornado (era paid/captured)
//   • webhook    assinado com HMAC SHA-256 e cadastrado NO PAINEL da Medusa
//                (Configurações → API e Integrações → Webhook). Não existe mais
//                postbackUrl no corpo do request.
//
// O path repete o "/api": o endpoint real é .../api/v1/api/pagamentos — confirmado
// contra a API (chave inválida → 401; /api/v1/pagamentos → "Rota não encontrada").

import crypto from "node:crypto"

const BASE_URL = "https://api.medusapayoficial.pro/api/v1"
const PAGAMENTOS_PATH = "/api/pagamentos"

// Janela da chave de idempotência: dentro dela, o mesmo comprador com a mesma
// sacola recebe a MESMA cobrança em vez de duas (double-click, retry do front).
const IDEMPOTENCY_WINDOW_MS = 15 * 60 * 1000

function apiKey(): string {
  // MEDUSAPAY_SECRET_KEY é o nome herdado (agora guarda a mk_live_...).
  return (process.env.MEDUSAPAY_SECRET_KEY || process.env.MEDUSAPAY_API_KEY || "").trim()
}

export function medusaConfigured(): boolean {
  return Boolean(apiKey())
}

function authHeader(): string {
  return `Bearer ${apiKey()}`
}

export function isPaidStatusMedusa(status: unknown): boolean {
  // "aprovado" é o status da v2; os demais ficam por compatibilidade.
  return ["aprovado", "approved", "paid", "pago", "captured", "succeeded", "completed"].includes(
    String(status ?? "").toLowerCase()
  )
}

export function isRefundedStatusMedusa(status: unknown): boolean {
  return ["estornado", "refunded", "chargeback"].includes(String(status ?? "").toLowerCase())
}

// ── Webhook ────────────────────────────────────────────────────────────────
// A Medusa manda `X-Medusa-Signature: sha256=<hex>` = HMAC SHA-256 do corpo com
// o segredo do webhook. Retorna null quando não há segredo configurado (aí a
// rota cai no plano B: confirmar o pagamento consultando a API).
export function verifyMedusaSignature(rawBody: string, headerValue: string | null): boolean | null {
  const secret = (process.env.MEDUSAPAY_WEBHOOK_SECRET || "").trim()
  if (!secret) return null
  const received = String(headerValue || "").trim()
  if (!received) return false

  const hmac = (payload: string) =>
    "sha256=" + crypto.createHmac("sha256", secret).update(payload, "utf8").digest("hex")

  // A doc deles assina JSON.stringify(req.body), que pode diferir do corpo bruto
  // em espaçamento. Aceitamos o bruto e o reserializado.
  const candidates = [hmac(rawBody)]
  try {
    candidates.push(hmac(JSON.stringify(JSON.parse(rawBody))))
  } catch {
    // corpo não-JSON: só o bruto vale
  }

  return candidates.some((expected) => {
    const a = Buffer.from(expected)
    const b = Buffer.from(received)
    return a.length === b.length && crypto.timingSafeEqual(a, b)
  })
}

export interface MedusaPixInput {
  /** Valor em centavos — convertido para reais aqui dentro (a v2 cobra em reais). */
  amountCents: number
  name: string
  email: string
  cpfDigits: string
  phoneDigits: string
  ip: string
  title: string
  /** Opcional: chave estável por pedido. Sem ela, derivamos uma da sacola. */
  idempotencyKey?: string
}

export interface MedusaPixResult {
  ok: boolean
  status?: number
  error?: string
  /** Código de erro da Medusa (NO_ACQUIRER, UNAUTHORIZED...). */
  code?: string
  txid?: string | null
  qrCode?: string
  qrCodeImage?: string | null
  expiresAt?: string | null
  paymentStatus?: string
  /** true = conta em Modo Teste: venda aprovada na hora, sem PIX real. */
  simulated?: boolean
  raw?: unknown
}

function centsToReais(amountCents: number): number {
  return Number((Math.round(amountCents) / 100).toFixed(2))
}

function deriveIdempotencyKey(input: MedusaPixInput): string {
  const bucket = Math.floor(Date.now() / IDEMPOTENCY_WINDOW_MS)
  const seed = [input.cpfDigits, input.email.toLowerCase(), input.amountCents, input.title, bucket].join("|")
  return "gg_" + crypto.createHash("sha256").update(seed).digest("hex").slice(0, 32)
}

type PostResult = { res: Response; raw: string; data: any } | { error: string }

async function postPagamento(payload: Record<string, unknown>): Promise<PostResult> {
  let res: Response
  try {
    res = await fetch(`${BASE_URL}${PAGAMENTOS_PATH}`, {
      method: "POST",
      headers: {
        authorization: authHeader(),
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })
  } catch {
    return { error: "Falha de comunicação com a MedusaPay." }
  }

  const raw = await res.text()
  let data: any = null
  try {
    data = raw ? JSON.parse(raw) : null
  } catch {
    data = null
  }
  return { res, raw, data }
}

// Extrai o copia-e-cola do response (nomes da doc + fallbacks defensivos).
function readPix(data: any) {
  const venda = data?.venda ?? data?.data ?? {}
  const qrCode = String(
    data?.pixCopiaECola ?? data?.pix_copia_e_cola ?? data?.copiaECola ?? venda?.pixCopiaECola ?? ""
  )
  const qrCodeImage = data?.pixQrCode ?? data?.pix_qr_code ?? data?.qrCode ?? venda?.pixQrCode ?? null
  const txid = venda?.id ?? data?.id ?? null
  return {
    qrCode,
    qrCodeImage: qrCodeImage ? String(qrCodeImage) : null,
    txid: txid != null ? String(txid) : null,
    expiresAt: data?.pixExpiresAt ?? data?.pix_expires_at ?? null,
    status: String(venda?.status ?? data?.status ?? "pendente"),
    simulated: Boolean(venda?.simulada ?? data?.simulada ?? false),
  }
}

export async function createPixMedusa(input: MedusaPixInput): Promise<MedusaPixResult> {
  const basePayload = {
    clienteNome: input.name,
    clienteEmail: input.email,
    clienteCpf: input.cpfDigits,
    produto: input.title.slice(0, 200),
    valor: centsToReais(input.amountCents),
    metodo: "PIX",
  }

  const derivedKey = input.idempotencyKey ?? deriveIdempotencyKey(input)
  let attempt = await postPagamento({ ...basePayload, idempotencyKey: derivedKey })
  if ("error" in attempt) return { ok: false, error: attempt.error }

  if (!attempt.res.ok) {
    const { res, raw, data } = attempt
    const msg =
      data?.message ||
      (Array.isArray(data?.errors) ? data.errors.join(" | ") : data?.errors) ||
      data?.error ||
      raw ||
      "Erro desconhecido na MedusaPay"
    return { ok: false, status: res.status, code: data?.code, error: String(msg), raw: data ?? raw }
  }

  let parsed = readPix(attempt.data)

  // 200 = retentativa idempotente devolvendo a venda original. Se a venda antiga
  // já não tem mais o copia-e-cola (expirou/rotacionou), cria uma nova cobrança.
  if (!parsed.qrCode && !parsed.simulated && attempt.res.status === 200) {
    const retry = await postPagamento({
      ...basePayload,
      idempotencyKey: `${derivedKey}_${crypto.randomBytes(4).toString("hex")}`,
    })
    if (!("error" in retry) && retry.res.ok) {
      attempt = retry
      parsed = readPix(retry.data)
    }
  }

  return {
    ok: true,
    txid: parsed.txid,
    qrCode: parsed.qrCode,
    qrCodeImage: parsed.qrCodeImage,
    expiresAt: parsed.expiresAt,
    paymentStatus: parsed.status,
    simulated: parsed.simulated,
    raw: attempt.data,
  }
}

export async function getStatusMedusa(txid: string): Promise<{ ok: boolean; status: string; paid: boolean }> {
  try {
    const res = await fetch(`${BASE_URL}${PAGAMENTOS_PATH}/${encodeURIComponent(txid)}`, {
      method: "GET",
      headers: { authorization: authHeader(), accept: "application/json" },
      cache: "no-store",
    })
    const raw = await res.text()
    let data: any = null
    try {
      data = raw ? JSON.parse(raw) : null
    } catch {
      data = null
    }
    if (!res.ok) return { ok: false, status: "pendente", paid: false }
    const venda = data?.venda ?? data?.data ?? data ?? {}
    const status = String(venda?.status ?? "pendente")
    return { ok: true, status, paid: isPaidStatusMedusa(status) }
  } catch {
    return { ok: false, status: "pendente", paid: false }
  }
}
