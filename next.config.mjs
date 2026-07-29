/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  // O export do painel /admin (Exportar products.ts) lê o lib/products.ts do
  // disco em runtime pra regenerar o arquivo. Garante que o source seja incluído
  // no bundle dessa rota também em produção serverless (Vercel).
  outputFileTracingIncludes: {
    '/api/admin/products/export': ['./lib/products.ts'],
  },
  // Otimizações de performance para dev
  swcMinify: true,
  // Turbopack: otimizações de watch e cache
  experimental: {
    // Aumenta o cache do SWC para reduzir recompilações
    swcTraceProfiling: false,
  },
  // Desativa verificações desnecessárias em dev para acelerar
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Deixa de anunciar "X-Powered-By: Next.js" em toda resposta. Não impede
  // ninguém de descobrir a stack, mas é a primeira coisa que um levantamento
  // automatizado coleta — e sai de graça.
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Não deixa a loja ser embutida em iframe de terceiro (usado pra
          // clonar visual e enganar cliente em cima do site real).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Ao sair da loja, o outro site recebe só o domínio — não a URL
          // completa (que em página de pedido carrega identificador).
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      {
        // Área interna e APIs nunca devem ser indexadas, mesmo se alguém achar
        // o link. O robots.txt pede; este header obriga.
        source: "/:path(admin|api)/:rest*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ]
  },
}

export default nextConfig
