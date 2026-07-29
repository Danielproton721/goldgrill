import type { MetadataRoute } from "next"

// robots.txt gerado pelo Next (rota /robots.txt).
//
// A loja VIVE de busca orgânica e Ads: buscador de verdade entra em tudo que é
// vitrine. O que fica de fora é o que não interessa a ninguém indexar — painel,
// APIs, checkout e páginas de pedido (que têm dado de cliente na URL).
//
// Sobre raspagem: robots.txt é placa, não porta. Só é obedecido por quem quer
// obedecer — Google e Bing respeitam, scraper não. Por isso os agressivos de
// catálogo/IA levam bloqueio explícito aqui, e o freio de verdade fica no
// rate limit das rotas.

const BASE = (process.env.NEXT_PUBLIC_APP_URL || "https://www.goldgrill.shop").replace(/\/$/, "")

// Coletores de conteúdo em massa (treino de IA e vigilância de preço). Não
// trazem cliente; consomem banda e copiam catálogo.
const RASPADORES = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "PerplexityBot",
  "Amazonbot",
  "Omgilibot",
  "DataForSeoBot",
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
  "PetalBot",
  "SeekportBot",
  "Scrapy",
]

const PRIVADO = ["/admin", "/admin/", "/api/", "/checkout", "/obrigado", "/pedido"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Buscadores e previews de rede social: entram na vitrine.
      { userAgent: "*", allow: "/", disallow: PRIVADO },
      // Coletores de catálogo/IA: barrados no site inteiro.
      { userAgent: RASPADORES, disallow: "/" },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
