// Atribuição de origem do visitante (de qual anúncio/campanha ele veio).
//
// POR QUE ISSO EXISTE: no PIX o cliente paga fora do site e quase nunca volta
// pra página. Se a conversão dependesse do navegador dele, a venda nunca seria
// contada. A solução é o servidor avisar o Google quando o webhook do gateway
// confirmar o pagamento — mas pra isso o pedido precisa carregar de onde o
// cliente veio. É esse dado que este arquivo captura e carrega.
//
// Sem chave nova, sem banco novo: o dado vive num cookie do próprio domínio e
// depois entra no MESMO registro de pedido que já é gravado hoje.

/** Cookie de 1ª parte, legível pelo JS da loja (é dado de marketing, não segredo). */
export const ATTR_COOKIE = "gg_attr"
const DIAS = 90

export type Attribution = {
  /** Identificador do clique no Google Ads (o que permite creditar a venda). */
  gclid?: string
  /** Variantes do gclid quando o clique vem de app/iOS sem cookie. */
  gbraid?: string
  wbraid?: string
  /** Clique do Meta (se um dia rodar Facebook/Instagram). */
  fbclid?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  /** Primeira página em que o visitante entrou. */
  landing?: string
  /** De onde ele veio (quando o navegador informa). */
  referrer?: string
  /** Quando o clique foi registrado (ISO). O Google exige a hora da conversão. */
  clickedAt?: string
}

const CAMPOS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const

/** Lê os parâmetros de anúncio de uma URL. Devolve null se não houver nenhum. */
export function parseAttributionFromUrl(url: string, referrer?: string): Attribution | null {
  let params: URLSearchParams
  try {
    params = new URL(url).searchParams
  } catch {
    return null
  }

  const attr: Attribution = {}
  for (const campo of CAMPOS) {
    const v = params.get(campo)
    if (v) attr[campo] = v.slice(0, 300)
  }

  // Sem nenhum marcador de anúncio não vale gravar nada — visita orgânica não
  // precisa de atribuição e o cookie existente (de um clique anterior) tem que
  // ser preservado.
  if (Object.keys(attr).length === 0) return null

  try {
    attr.landing = new URL(url).pathname.slice(0, 200)
  } catch {}
  if (referrer) attr.referrer = referrer.slice(0, 200)
  attr.clickedAt = new Date().toISOString()

  return attr
}

/** Serializa pro cookie (base64 pra não sofrer com acento/; no valor). */
export function encodeAttribution(attr: Attribution): string {
  const json = JSON.stringify(attr)
  return typeof btoa === "function" ? btoa(unescape(encodeURIComponent(json))) : Buffer.from(json).toString("base64")
}

export function decodeAttribution(raw: string | undefined | null): Attribution | null {
  if (!raw) return null
  try {
    const json =
      typeof atob === "function" ? decodeURIComponent(escape(atob(raw))) : Buffer.from(raw, "base64").toString("utf8")
    const obj = JSON.parse(json)
    return obj && typeof obj === "object" ? (obj as Attribution) : null
  } catch {
    return null
  }
}

/** Grava o cookie no navegador (chamado só no client). */
export function saveAttributionCookie(attr: Attribution): void {
  if (typeof document === "undefined") return
  const valor = encodeAttribution(attr)
  const maxAge = DIAS * 24 * 60 * 60
  document.cookie = `${ATTR_COOKIE}=${valor}; path=/; max-age=${maxAge}; SameSite=Lax`
}

/** Lê o cookie no navegador. */
export function readAttributionCookie(): Attribution | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${ATTR_COOKIE}=([^;]*)`))
  return decodeAttribution(match?.[1])
}

/**
 * Limpa o que veio do navegador antes de gravar no pedido: só campos conhecidos,
 * texto curto, nada de objeto aninhado. O corpo do request é do cliente, então
 * não se confia nele.
 */
export function sanitizeAttribution(entrada: unknown): Attribution | undefined {
  if (!entrada || typeof entrada !== "object") return undefined
  const bruto = entrada as Record<string, unknown>
  const out: Attribution = {}
  const permitidos = [...CAMPOS, "landing", "referrer", "clickedAt"] as const
  for (const campo of permitidos) {
    const v = bruto[campo]
    if (typeof v === "string" && v.trim()) out[campo] = v.trim().slice(0, 300)
  }
  return Object.keys(out).length ? out : undefined
}

/** Resumo curto pro painel: "Google Ads · campanha X" ou "orgânico". */
export function describeAttribution(attr?: Attribution | null): string {
  if (!attr) return "direto/orgânico"
  const canal = attr.gclid || attr.gbraid || attr.wbraid ? "Google Ads" : attr.fbclid ? "Meta Ads" : attr.utm_source
  const partes = [canal || "origem desconhecida"]
  if (attr.utm_campaign) partes.push(attr.utm_campaign)
  if (attr.utm_content) partes.push(attr.utm_content)
  return partes.join(" · ")
}
