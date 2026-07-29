import type { MetadataRoute } from "next"
import { collections } from "@/lib/products"
import { getMergedProducts } from "@/lib/catalog"

// sitemap.xml (rota /sitemap.xml). Sem ele, o Google descobre as páginas só
// seguindo links — produto novo demora a entrar e produto fora do menu pode
// nunca ser indexado. Numa loja de 230 itens isso é venda perdida.
//
// Usa o catálogo MESCLADO (base + edições do painel), então produto editado ou
// criado no /admin entra aqui sem precisar de deploy.

const BASE = (process.env.NEXT_PUBLIC_APP_URL || "https://www.goldgrill.shop").replace(/\/$/, "")

// Páginas fixas. Fora daqui de propósito: /checkout, /obrigado, /pedido e
// /admin — não são vitrine e não devem ser indexadas.
const FIXAS: { rota: string; prioridade: number; frequencia: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
  { rota: "", prioridade: 1, frequencia: "daily" },
  { rota: "/produtos", prioridade: 0.9, frequencia: "daily" },
  { rota: "/sobre-nos", prioridade: 0.4, frequencia: "monthly" },
  { rota: "/nossa-historia", prioridade: 0.3, frequencia: "monthly" },
  { rota: "/contato-e-catalogo", prioridade: 0.5, frequencia: "monthly" },
  { rota: "/faq", prioridade: 0.5, frequencia: "monthly" },
  { rota: "/rastreio-de-pedido", prioridade: 0.4, frequencia: "monthly" },
  { rota: "/trocas-e-devolucoes", prioridade: 0.3, frequencia: "yearly" },
  { rota: "/politica-de-privacidade", prioridade: 0.2, frequencia: "yearly" },
  { rota: "/termos-de-uso", prioridade: 0.2, frequencia: "yearly" },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const agora = new Date()

  const paginas: MetadataRoute.Sitemap = FIXAS.map((f) => ({
    url: `${BASE}${f.rota}`,
    lastModified: agora,
    changeFrequency: f.frequencia,
    priority: f.prioridade,
  }))

  for (const c of collections) {
    paginas.push({
      url: `${BASE}/colecoes/${c.slug}`,
      lastModified: agora,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  }

  // Se o KV estiver fora do ar, o sitemap não pode quebrar: cai pro que der.
  try {
    const produtos = await getMergedProducts()
    for (const p of produtos) {
      // Produto de teste não vai pro Google (a loja já o esconde da vitrine).
      if ((p as { isTest?: boolean }).isTest) continue
      if (!p.slug) continue
      paginas.push({
        url: `${BASE}/product/${p.slug}`,
        lastModified: agora,
        changeFrequency: "weekly",
        priority: 0.8,
      })
    }
  } catch (err) {
    console.error("[sitemap] falha ao ler o catálogo, publicando só as páginas fixas:", err)
  }

  return paginas
}
