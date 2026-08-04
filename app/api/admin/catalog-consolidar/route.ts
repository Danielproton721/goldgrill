import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { isAuthed } from "@/lib/admin-auth"
import { conferirConsolidacao, resetOverlay } from "@/lib/catalog"
import { CATALOG_TAG } from "@/lib/catalog-keys"
import { kvConfigured } from "@/lib/kv-store"

export const dynamic = "force-dynamic"

// CONSOLIDAR O CATÁLOGO NUMA FONTE SÓ.
//
// A loja tem duas fontes de catálogo por limitação de serverless: o array em
// lib/products.ts (git, somente leitura em produção) e o overlay no KV, onde o
// painel grava. Isso faz o localhost mostrar preço velho e a nuvem preço novo.
//
// Consolidar = trazer as edições do KV pro código e zerar o overlay. Fica uma
// fonte só, versionada no git.
//
//   1. painel → "Exportar products.ts"  (o arquivo já sai mesclado)
//   2. commit + deploy
//   3. POST aqui  → zera o overlay
//
// O passo 3 é o perigoso: se o deploy do passo 2 não estiver no ar, zerar
// devolve os preços antigos à loja. Por isso este POST confere campo a campo
// se o código já tem TUDO e se recusa a apagar quando falta algo.

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }
  const relatorio = await conferirConsolidacao()
  return NextResponse.json({ ...relatorio, kvOk: kvConfigured() })
}

export async function POST() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }
  if (!kvConfigured()) {
    return NextResponse.json({ error: "KV não configurado." }, { status: 400 })
  }

  const relatorio = await conferirConsolidacao()
  if (!relatorio.ok) {
    return NextResponse.json(
      {
        error:
          "Não zerei nada: o código publicado ainda não tem todas as edições. " +
          "Exporte o products.ts, commite e faça o deploy antes de consolidar.",
        ...relatorio,
      },
      { status: 409 },
    )
  }

  if (relatorio.entradas === 0) {
    return NextResponse.json({ ok: true, jaConsolidado: true, ...relatorio })
  }

  await resetOverlay()
  revalidateTag(CATALOG_TAG)
  return NextResponse.json({ ok: true, zerado: relatorio.entradas, campos: relatorio.campos })
}
