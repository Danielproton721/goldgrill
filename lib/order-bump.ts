// ORDER BUMP — oferta de item complementar na hora de pagar.
//
// Por que existe: com ticket médio baixo, o custo de trazer o cliente pesa mais
// que o produto. Subir o valor do pedido com um item que ele já ia querer é o
// que faz a conta do tráfego pago fechar.
//
// A configuração fica no KV (mesmo overlay que o resto do painel usa), então
// trocar produto, preço ou texto é no /admin — sem deploy.
//
// SEGURANÇA: o preço NUNCA vem do navegador. O cliente só manda "quero" (true
// ou false); quem soma é o servidor, com o valor gravado aqui. Isso mantém a
// mesma garantia do resto do checkout — o total assinado na sessão é o total
// cobrado no gateway. O preço promocional vale SÓ dentro do bump: não altera o
// preço do produto na vitrine.

import type { Product } from "@/lib/products"
import { kvConfigured, kvGetJSON, kvSetJSON } from "./kv-store"

const CONFIG_KEY = "order-bump:config"

export type OrderBumpConfig = {
  /** Liga/desliga sem perder o resto da configuração. */
  ativo: boolean
  /** Slug do produto do catálogo oferecido no bump. */
  slug: string
  /** Preço promocional, em centavos. Só vale dentro do checkout. */
  precoCents: number
  /** Chamada do card (o gancho). */
  titulo: string
  /** Linha de apoio, explicando o benefício. */
  argumento: string
}

export const BUMP_PADRAO: OrderBumpConfig = {
  ativo: false,
  slug: "",
  precoCents: 0,
  titulo: "",
  argumento: "",
}

export type OrderBumpOferta = {
  slug: string
  id: number
  nome: string
  imagem: string
  /** Preço promocional (o que o cliente paga no bump). */
  precoCents: number
  /** Preço normal do produto na loja — vira o "de" riscado. */
  precoNormalCents: number
  descontoPct: number
  titulo: string
  argumento: string
}

/** Limpa o que veio do painel antes de gravar. */
export function sanitizeBumpConfig(entrada: unknown): OrderBumpConfig {
  const raw = (entrada || {}) as Record<string, unknown>
  const precoCents = Math.round(Number(raw.precoCents))
  return {
    ativo: Boolean(raw.ativo),
    slug: String(raw.slug ?? "").trim().slice(0, 200),
    precoCents: Number.isFinite(precoCents) && precoCents > 0 ? precoCents : 0,
    titulo: String(raw.titulo ?? "").trim().slice(0, 120),
    argumento: String(raw.argumento ?? "").trim().slice(0, 200),
  }
}

export async function getOrderBumpConfig(): Promise<OrderBumpConfig> {
  if (!kvConfigured()) return BUMP_PADRAO
  try {
    const salvo = await kvGetJSON<OrderBumpConfig>(CONFIG_KEY)
    return salvo ? sanitizeBumpConfig(salvo) : BUMP_PADRAO
  } catch {
    // Sem config o checkout segue sem card — bump nunca pode travar a venda.
    return BUMP_PADRAO
  }
}

export async function setOrderBumpConfig(entrada: unknown): Promise<OrderBumpConfig> {
  const cfg = sanitizeBumpConfig(entrada)
  await kvSetJSON(CONFIG_KEY, cfg)
  return cfg
}

/**
 * Monta a oferta que o checkout mostra, a partir da config + catálogo real.
 *
 * Devolve null (e o checkout segue sem card) quando: o bump está desligado, o
 * produto não existe mais, ou a promoção não faz sentido (preço do bump maior
 * ou igual ao normal) — melhor não ter oferta do que ter oferta mentirosa.
 *
 * O `catalogo` TEM que ser o mesclado (getMergedProducts): o preço válido é o
 * do KV. Usar o array base foi o que quebrou o checkout inteiro antes.
 */
export function montarOferta(cfg: OrderBumpConfig, catalogo: Product[]): OrderBumpOferta | null {
  if (!cfg.ativo || !cfg.slug || !(cfg.precoCents > 0)) return null

  const p = catalogo.find((entry) => entry.slug === cfg.slug)
  if (!p) return null

  const precoNormalCents = Math.round(Number(p.price) * 100)
  if (!(precoNormalCents > 0)) return null
  if (cfg.precoCents >= precoNormalCents) return null

  return {
    slug: p.slug,
    id: p.id,
    nome: p.name,
    imagem: p.image,
    precoCents: cfg.precoCents,
    precoNormalCents,
    descontoPct: Math.round((1 - cfg.precoCents / precoNormalCents) * 100),
    titulo: cfg.titulo || "Leva junto?",
    argumento: cfg.argumento,
  }
}

/** Atalho: lê a config do KV e monta a oferta. */
export async function getOrderBump(catalogo: Product[]): Promise<OrderBumpOferta | null> {
  return montarOferta(await getOrderBumpConfig(), catalogo)
}
