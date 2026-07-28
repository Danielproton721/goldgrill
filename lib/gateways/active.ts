// Quais gateways de pagamento estão ligados e em que ordem de prioridade
// (configurado no /admin). Guardado no KV (Upstash) pra valer pra todos na hora,
// sem novo deploy. Sem KV configurado, cai no padrão (Pagou.ai) — o fluxo atual
// nunca quebra.
//
// A loja tenta o 1º gateway ligado da fila; se ele estiver fora (chave inválida,
// adquirente caído, timeout), passa pro próximo automaticamente.

import { kvConfigured, kvGetJSON, kvSetJSON } from "@/lib/kv-store"

export type GatewayId = "pagou" | "medusa" | "centurion"

export const GATEWAYS: { id: GatewayId; label: string }[] = [
  { id: "pagou", label: "Pagou.ai" },
  { id: "medusa", label: "MedusaPay" },
  { id: "centurion", label: "CenturionPay" },
]

export type GatewayConfig = {
  /** Ordem de prioridade: o primeiro LIGADO é quem processa. */
  order: GatewayId[]
  enabled: Record<GatewayId, boolean>
  /**
   * Relay: quando ligado pra um gateway, o aviso de pagamento vai pro relay (que
   * repassa pra cá) em vez de expor o domínio da loja ao gateway.
   * `url` é UMA só pros três — no hub basta um cadastro apontando pra
   * /api/webhooks/relay-in, que descobre o gateway e despacha internamente.
   */
  relay: { enabled: Record<GatewayId, boolean>; url: string }
}

/** Endpoint desta loja que recebe o webhook de cada gateway (sem relay). */
export const WEBHOOK_PATH: Record<GatewayId, string> = {
  pagou: "/api/webhooks/pagouai",
  medusa: "/api/webhooks/medusa",
  centurion: "/api/webhooks/centurion",
}

/** Porta única do relay: é este o destino que se cadastra no hub. */
export const RELAY_IN_PATH = "/api/webhooks/relay-in"

// A Medusa v2 não aceita URL de webhook no request — ela é cadastrada no painel
// deles. Por isso o relay dela não é "enviado", é só a URL que o dono cola lá.
export const RELAY_VIA_PAINEL: Record<GatewayId, boolean> = {
  pagou: false,
  medusa: true,
  centurion: false,
}

const CONFIG_KEY = "gateway-config"
const LEGACY_KEY = "active-gateway"
const DEFAULT: GatewayId = "pagou"
// ~1 ano: na prática permanente; só muda quando o admin mexe.
const TTL = 60 * 60 * 24 * 365

export function isGatewayId(v: unknown): v is GatewayId {
  return v === "pagou" || v === "medusa" || v === "centurion"
}

// Chave presente no ambiente. Lê process.env direto (em vez de importar os
// providers) porque este módulo é referenciado por componente de client — só
// como tipo, mas assim não há chance de puxar `node:crypto` pro bundle.
export function gatewayConfigured(id: GatewayId): boolean {
  if (id === "pagou") return Boolean(process.env.PAGOUAI_SECRET_KEY)
  if (id === "medusa") return Boolean(process.env.MEDUSAPAY_SECRET_KEY || process.env.MEDUSAPAY_API_KEY)
  return Boolean(process.env.CENTURION_API_KEY)
}

function envNotifyUrl(): string {
  return (process.env.NOTIFY_URL_OVERRIDE || "").trim()
}

function defaultRelay(): GatewayConfig["relay"] {
  // Migração: quem já usava o relay via NOTIFY_URL_OVERRIDE (hoje só a Pagou.ai)
  // continua usando, com a mesma URL. Os outros nascem desligados.
  const url = envNotifyUrl()
  return { enabled: { pagou: Boolean(url), medusa: false, centurion: false }, url }
}

function defaultConfig(active: GatewayId = DEFAULT): GatewayConfig {
  const order = [active, ...GATEWAYS.map((g) => g.id).filter((id) => id !== active)]
  // Só o ativo nasce ligado: ligar os outros sozinho mandaria tráfego pra
  // gateway que o dono nunca revisou. Quem liga é o admin, no painel.
  return {
    order,
    enabled: { pagou: false, medusa: false, centurion: false, [active]: true } as Record<GatewayId, boolean>,
    relay: defaultRelay(),
  }
}

function sanitize(raw: any, fallbackActive: GatewayId = DEFAULT): GatewayConfig {
  const base = defaultConfig(fallbackActive)
  if (!raw || typeof raw !== "object") return base

  // Ordem: só ids válidos, sem repetição, completada com os que faltarem.
  const seen = new Set<GatewayId>()
  const order: GatewayId[] = []
  for (const id of Array.isArray(raw.order) ? raw.order : []) {
    if (isGatewayId(id) && !seen.has(id)) {
      seen.add(id)
      order.push(id)
    }
  }
  for (const g of GATEWAYS) if (!seen.has(g.id)) order.push(g.id)

  const enabled = { pagou: false, medusa: false, centurion: false } as Record<GatewayId, boolean>
  for (const g of GATEWAYS) enabled[g.id] = Boolean(raw?.enabled?.[g.id])
  // Nunca deixa a loja sem nenhum gateway: sem ninguém ligado, volta o padrão.
  if (!GATEWAYS.some((g) => enabled[g.id])) return base

  // URL do relay: uma só. Aceita o formato antigo (uma por gateway) pegando a
  // primeira preenchida, pra não perder a configuração de quem já salvou.
  const rawUrl = raw?.relay?.url
  const candidata = String(
    (typeof rawUrl === "string" ? rawUrl : GATEWAYS.map((g) => rawUrl?.[g.id]).find(Boolean)) ?? ""
  ).trim()
  // Só https: uma URL de relay em http vazaria o webhook em texto puro.
  const url = /^https:\/\//i.test(candidata) ? candidata.replace(/\/$/, "") : ""

  const relay: GatewayConfig["relay"] = {
    url,
    enabled: { pagou: false, medusa: false, centurion: false },
  }
  // Relay ligado sem URL não faz nada — trata como desligado.
  for (const g of GATEWAYS) relay.enabled[g.id] = Boolean(raw?.relay?.enabled?.[g.id]) && Boolean(url)

  return { order, enabled, relay }
}

export async function getGatewayConfig(): Promise<GatewayConfig> {
  if (!kvConfigured()) return defaultConfig()
  try {
    const raw = await kvGetJSON<GatewayConfig>(CONFIG_KEY)
    if (raw) return sanitize(raw)
    // Migração da chave antiga (só o gateway ativo, sem fila de fallback).
    const legacy = await kvGetJSON<GatewayId>(LEGACY_KEY)
    return defaultConfig(isGatewayId(legacy) ? legacy : DEFAULT)
  } catch {
    return defaultConfig()
  }
}

export async function setGatewayConfig(raw: unknown): Promise<GatewayConfig> {
  // Merge com o que já está salvo: um POST que manda só {order, enabled} não
  // pode apagar a configuração de relay (e vice-versa).
  const atual = await getGatewayConfig()
  const cfg = sanitize({ ...atual, ...(raw as Record<string, unknown>) })
  await kvSetJSON(CONFIG_KEY, cfg, TTL)
  // Mantém a chave antiga em dia (nada mais lê, mas evita surpresa num rollback).
  await kvSetJSON(LEGACY_KEY, cfg.order.find((id) => cfg.enabled[id]) ?? DEFAULT, TTL).catch(() => {})
  return cfg
}

/** Fila de tentativa: ligados, na ordem de prioridade. */
export async function getGatewayChain(): Promise<GatewayId[]> {
  const cfg = await getGatewayConfig()
  const chain = cfg.order.filter((id) => cfg.enabled[id])
  return chain.length ? chain : [DEFAULT]
}

/** Quem processa agora — o 1º da fila. Mantido pro resto do código não mudar. */
export async function getActiveGateway(): Promise<GatewayId> {
  const chain = await getGatewayChain()
  return chain[0] ?? DEFAULT
}

/**
 * URL pra onde o gateway deve avisar o pagamento:
 *  • relay ligado  → a URL do relay daquele gateway (o gateway nunca vê a loja);
 *  • relay off     → o endpoint desta loja, no domínio próprio.
 * Devolve null quando não há domínio público (localhost) e o relay está off.
 */
export async function getNotifyUrl(id: GatewayId, appBaseUrl: string): Promise<string | null> {
  const cfg = await getGatewayConfig()
  if (cfg.relay.enabled[id] && cfg.relay.url) return cfg.relay.url
  const base = (appBaseUrl || "").replace(/\/$/, "")
  return base ? `${base}${WEBHOOK_PATH[id]}` : null
}

/** O webhook deste gateway deve exigir o header x-relay-secret? */
export async function relayEnabledFor(id: GatewayId): Promise<boolean> {
  const cfg = await getGatewayConfig()
  return Boolean(cfg.relay.enabled[id])
}

/** Promove um gateway a principal (liga e joga pro topo da fila). */
export async function setActiveGateway(id: GatewayId): Promise<void> {
  const cfg = await getGatewayConfig()
  const order = [id, ...cfg.order.filter((g) => g !== id)]
  await setGatewayConfig({ order, enabled: { ...cfg.enabled, [id]: true } })
}

// Qual gateway criou uma transação específica (txid) — pra consultar status /
// processar webhook no provider certo mesmo se o admin trocar de gateway depois.
const txKey = (txid: string) => `gw:${txid}`
const TX_TTL = 60 * 60 * 24 * 3 // 3 dias

export async function markTxGateway(txid: string, id: GatewayId): Promise<void> {
  if (!kvConfigured()) return
  try {
    await kvSetJSON(txKey(txid), id, TX_TTL)
  } catch {
    // best effort
  }
}

export async function getTxGateway(txid: string): Promise<GatewayId | null> {
  if (!kvConfigured()) return null
  try {
    const v = await kvGetJSON<GatewayId>(txKey(txid))
    return isGatewayId(v) ? v : null
  } catch {
    return null
  }
}
