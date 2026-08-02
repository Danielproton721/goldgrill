import { NextResponse } from "next/server"
import { getMergedProducts } from "@/lib/catalog"
import { getOrderBump } from "@/lib/order-bump"

// Oferta do order bump pro checkout desenhar o card.
//
// Devolve só o que a tela precisa mostrar. O preço aqui é informativo: quem
// soma no total é o servidor, na criação da sessão (o cliente manda apenas
// "quero" ou "não quero"). Cache de 5 min — o mesmo do índice de busca — pra
// não bater no KV a cada visita ao checkout.
export const revalidate = 300

export async function GET() {
  try {
    const oferta = getOrderBump(await getMergedProducts())
    if (!oferta) return NextResponse.json({ oferta: null })
    return NextResponse.json({ oferta })
  } catch {
    // Sem oferta o checkout segue normal — bump nunca pode travar a venda.
    return NextResponse.json({ oferta: null })
  }
}
