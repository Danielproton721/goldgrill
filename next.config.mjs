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
}

export default nextConfig
