import { NextResponse } from "next/server"
import { isAuthed } from "@/lib/admin-auth"
import { kvConfigured } from "@/lib/kv-store"
import { getMergedProducts } from "@/lib/catalog"
import { getOrderBumpConfig, montarOferta, sanitizeBumpConfig, setOrderBumpConfig } from "@/lib/order-bump"
import { listRecentOrders } from "@/lib/orders"

export const dynamic = "force-dynamic"

/**
 * Config do order bump + a lista de produtos pro seletor + o desempenho.
 *
 * O desempenho sai dos PEDIDOS que já estão no KV (conta quantos levaram o item
 * do bump) — sem contador próprio, sem gravação extra, sem custo novo.
 */
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const [config, catalogo] = await Promise.all([getOrderBumpConfig(), getMergedProducts()])
  const oferta = montarOferta(config, catalogo)

  // Só o necessário pro seletor (o catálogo inteiro seria pesado à toa).
  const produtos = catalogo
    .filter((p) => !(p as { isTest?: boolean }).isTest && p.slug)
    .map((p) => ({ slug: p.slug, nome: p.name, precoCents: Math.round(Number(p.price) * 100), imagem: p.image }))
    .sort((a, b) => a.precoCents - b.precoCents)

  let desempenho = { pedidos: 0, comBump: 0, receitaBumpCents: 0 }
  try {
    if (config.slug) {
      const pedidos = await listRecentOrders(100)
      const nomeDoBump = catalogo.find((p) => p.slug === config.slug)?.name
      // Um item conta como bump quando bate o nome do produto E o preço
      // promocional exato — assim não confunde com quem comprou o mesmo item
      // pelo preço normal, no carrinho.
      // Limite conhecido: se o preço do bump mudar, pedidos antigos (feitos com
      // o preço anterior) deixam de ser contados.
      const comBump = pedidos.filter((o) =>
        o.items?.some(
          (i) =>
            nomeDoBump &&
            i.name === nomeDoBump &&
            Math.round(Number(i.price) * 100) === config.precoCents
        )
      )
      desempenho = {
        pedidos: pedidos.length,
        comBump: comBump.length,
        receitaBumpCents: comBump.length * config.precoCents,
      }
    }
  } catch {
    // Métrica é enfeite: se falhar, a tela de configuração continua servindo.
  }

  return NextResponse.json({ config, oferta, produtos, desempenho, kvOk: kvConfigured() })
}

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }
  if (!kvConfigured()) {
    return NextResponse.json({ error: "KV (Upstash) não configurado — não dá pra salvar." }, { status: 400 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  const pedido = sanitizeBumpConfig(body)

  // Ligar exige oferta válida: sem produto, sem preço, ou com preço promocional
  // que não é desconto, o card não apareceria e o painel mentiria dizendo
  // "ativo". Melhor recusar e explicar.
  if (pedido.ativo) {
    if (!pedido.slug) {
      return NextResponse.json({ error: "Escolha o produto do bump antes de ativar." }, { status: 400 })
    }
    const catalogo = await getMergedProducts()
    const p = catalogo.find((entry) => entry.slug === pedido.slug)
    if (!p) {
      return NextResponse.json({ error: "Produto não encontrado no catálogo." }, { status: 400 })
    }
    const normalCents = Math.round(Number(p.price) * 100)
    if (!(pedido.precoCents > 0)) {
      return NextResponse.json({ error: "Informe o preço promocional do bump." }, { status: 400 })
    }
    if (pedido.precoCents >= normalCents) {
      return NextResponse.json(
        {
          error: `O preço do bump precisa ser MENOR que o preço normal (R$ ${(normalCents / 100)
            .toFixed(2)
            .replace(".", ",")}) — senão não é oferta.`,
        },
        { status: 400 }
      )
    }
  }

  const config = await setOrderBumpConfig(pedido)
  const oferta = montarOferta(config, await getMergedProducts())
  return NextResponse.json({ ok: true, config, oferta })
}
