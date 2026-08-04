import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { isAuthed } from "@/lib/admin-auth"
import {
  analisarImportacao,
  extrairProdutosDeArquivo,
  importarProdutos,
  type ModoImportacao,
} from "@/lib/catalog"
import { CATALOG_TAG } from "@/lib/catalog-keys"
import { kvConfigured } from "@/lib/kv-store"

export const dynamic = "force-dynamic"
export const maxDuration = 60

// IMPORTAR CATÁLOGO — o par do /api/admin/products/export.
//
// Serve pra restaurar um backup, desfazer uma edição em massa que deu errado ou
// trazer o catálogo de outra loja. Aceita o .ts que o painel baixa e também um
// .json com a lista.
//
// Sempre em DOIS passos: `aplicar: false` devolve só a prévia (quantos entram,
// quantos mudam, quantos saem) e não toca em nada; `aplicar: true` grava. Em
// catálogo de 230 produtos, ver antes é a diferença entre restaurar e destruir.

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  let body: { conteudo?: unknown; modo?: unknown; aplicar?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 })
  }

  const conteudo = typeof body?.conteudo === "string" ? body.conteudo : ""
  if (!conteudo.trim()) {
    return NextResponse.json({ error: "Arquivo vazio." }, { status: 400 })
  }
  const modo: ModoImportacao = body?.modo === "substituir" ? "substituir" : "mesclar"
  const aplicar = body?.aplicar === true

  let lista
  try {
    lista = extrairProdutosDeArquivo(conteudo)
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message || "Não consegui ler o arquivo." }, { status: 400 })
  }

  const analise = await analisarImportacao(lista, modo)

  if (!aplicar) {
    return NextResponse.json({ ok: analise.erros.length === 0, previa: true, modo, ...analise })
  }

  if (analise.erros.length) {
    return NextResponse.json({ error: `Arquivo com problema: ${analise.erros.join("; ")}`, ...analise }, { status: 400 })
  }
  if (!kvConfigured()) {
    return NextResponse.json({ error: "KV (Upstash) não configurado — não dá pra importar." }, { status: 400 })
  }

  try {
    const r = await importarProdutos(lista, modo)
    revalidateTag(CATALOG_TAG)
    return NextResponse.json({ ok: true, aplicado: true, modo, ...r, resumo: analise })
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message || "Falha ao importar." }, { status: 500 })
  }
}
