import { NextResponse } from "next/server";
import { getMergedProducts } from "@/lib/catalog";

// Índice magro pra busca do header. O catálogo completo (~345KB) morava no
// bundle client de TODAS as páginas só por causa da busca; agora o header
// baixa este JSON (fração do tamanho) sob demanda, quando a busca abre.
// Antes era force-static: o índice congelava no build e a busca do site
// mostrava PREÇO VELHO (o mesmo produto aparecia por R$ 1.936 na busca e
// R$ 266 na página). Agora lê o catálogo mesclado — o KV manda — e fica em
// cache por 5 min, então o custo é ~2 comandos a cada 5 min, não por visita.
export const revalidate = 300;

export async function GET() {
  const produtos = await getMergedProducts();
  const index = produtos.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    image: p.image,
    price: p.price,
    ...(p.tags && p.tags.length > 0 ? { tags: p.tags } : {}),
  }));

  return NextResponse.json(index, {
    headers: {
      "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    },
  });
}
