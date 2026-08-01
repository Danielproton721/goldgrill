// ORDER BUMP — oferta de um item barato e complementar na hora de pagar.
//
// Por que existe: com ticket médio baixo, o custo de trazer o cliente pesa mais
// que o produto. Subir o valor do pedido com um item que o cliente já ia querer
// é o que faz a conta do tráfego pago fechar.
//
// SEGURANÇA: o preço NUNCA vem do navegador. O cliente só manda "quero" (true
// ou false); quem soma é o servidor, com o valor definido aqui. Isso mantém a
// mesma garantia do resto do checkout — o total assinado na sessão é o total
// cobrado no gateway.
//
// PRA TROCAR O BUMP: mexa só neste arquivo (slug e preço). O resto se ajusta.

import { products, type Product } from "@/lib/products"

export const ORDER_BUMP = {
  /** Produto do catálogo oferecido no bump. */
  slug: "kit-garfo-tridente-garra-de-urso-10-garfos-petisco-churrasco",
  /** Preço promocional do bump, em centavos. Só vale dentro do checkout. */
  precoCents: 1990,
  titulo: "Leva o kit de garfos junto?",
  argumento: "Garfo tridente + garra de urso — pra servir e desfiar sem queimar a mão.",
} as const

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

/**
 * Monta a oferta a partir do catálogo real. Devolve null quando o produto não
 * existe mais, saiu do ar, ou quando a promoção não faz sentido (preço do bump
 * maior ou igual ao normal) — nesses casos o checkout simplesmente não mostra
 * o bump, em vez de exibir uma oferta mentirosa.
 */
export function getOrderBump(catalogo: Product[] = products): OrderBumpOferta | null {
  const p = catalogo.find((entry) => entry.slug === ORDER_BUMP.slug)
  if (!p) return null

  const precoNormalCents = Math.round(Number(p.price) * 100)
  if (!(precoNormalCents > 0)) return null
  if (ORDER_BUMP.precoCents >= precoNormalCents) return null

  return {
    slug: p.slug,
    id: p.id,
    nome: p.name,
    imagem: p.image,
    precoCents: ORDER_BUMP.precoCents,
    precoNormalCents,
    descontoPct: Math.round((1 - ORDER_BUMP.precoCents / precoNormalCents) * 100),
    titulo: ORDER_BUMP.titulo,
    argumento: ORDER_BUMP.argumento,
  }
}
