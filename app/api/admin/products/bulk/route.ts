import { NextResponse } from "next/server"
import { isAuthed } from "@/lib/admin-auth"
import { CatalogReadonlyError, upsertProduct } from "@/lib/catalog"
import { revalidateCatalog } from "@/lib/catalog-runtime"

export const dynamic = "force-dynamic"

// Atualiza vários produtos de uma vez (usado pela edição em massa de preços).
// O cálculo do preço novo é feito no cliente e mostrado na prévia; aqui só
// gravamos o que foi confirmado — mas validando cada linha, porque um erro de
// preço em massa erra o catálogo inteiro.
export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  const rows = Array.isArray(body?.rows) ? body.rows : null
  if (!rows || !rows.length) {
    return NextResponse.json({ error: "Nenhum produto recebido." }, { status: 400 })
  }
  if (rows.length > 500) {
    return NextResponse.json({ error: "Máximo de 500 produtos por vez." }, { status: 400 })
  }

  // Validação: preço tem que ser número > 0. Preço "de" pode ser vazio, mas se
  // vier preenchido não pode ser menor que o preço (riscado menor que o real
  // mostraria "desconto" negativo na loja).
  const numero = (v: unknown) => {
    const n = Number(String(v ?? "").replace(",", "."))
    return Number.isFinite(n) ? n : NaN
  }

  const problemas: string[] = []
  for (const row of rows) {
    const id = String(row?.id ?? "").trim()
    if (!id) {
      problemas.push("produto sem id")
      continue
    }
    const preco = numero(row?.price)
    if (!(preco > 0)) {
      problemas.push(`${id}: preço inválido`)
      continue
    }
    const de = String(row?.compareAtPrice ?? "").trim()
    if (de) {
      const deNum = numero(de)
      if (!Number.isFinite(deNum)) problemas.push(`${id}: preço "de" inválido`)
      else if (deNum <= preco) problemas.push(`${id}: preço "de" tem que ser maior que o preço`)
    }
  }

  if (problemas.length) {
    return NextResponse.json(
      { error: `Nada foi salvo. ${problemas.slice(0, 5).join(" · ")}${problemas.length > 5 ? " …" : ""}` },
      { status: 400 }
    )
  }

  const salvos: string[] = []
  const falhas: string[] = []
  for (const row of rows) {
    try {
      await upsertProduct(row)
      salvos.push(String(row.id))
    } catch (e: any) {
      if (e instanceof CatalogReadonlyError) {
        return NextResponse.json({ error: e.message || "Catálogo somente leitura." }, { status: 409 })
      }
      falhas.push(`${row?.id}: ${e?.message || "erro"}`)
    }
  }

  revalidateCatalog()

  return NextResponse.json({
    ok: falhas.length === 0,
    salvos: salvos.length,
    falhas,
  })
}
