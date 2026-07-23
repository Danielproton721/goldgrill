import { NextResponse } from "next/server"
import { isAuthed } from "@/lib/admin-auth"
import { kvConfigured, kvGetJSON } from "@/lib/kv-store"
import { saveObjections, revalidateObjections } from "@/lib/objections"
import { DEFAULT_OBJECTIONS, OBJECTIONS_KEY, normalizeObjections } from "@/lib/objections-shared"

export const dynamic = "force-dynamic"

// Lê o que está salvo AGORA (sem cache) — o painel não pode mostrar dado velho.
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
  }
  const raw = await kvGetJSON<unknown>(OBJECTIONS_KEY)
  const items = raw === null ? DEFAULT_OBJECTIONS : normalizeObjections(raw)
  return NextResponse.json({ items, kvOk: kvConfigured(), usingDefaults: raw === null })
}

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
  }
  if (!kvConfigured()) {
    return NextResponse.json(
      { error: "KV (Upstash) não configurado — não dá pra salvar." },
      { status: 409 },
    )
  }
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 })
  }
  try {
    const items = await saveObjections(body?.items)
    revalidateObjections()
    return NextResponse.json({ ok: true, items })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao salvar." }, { status: 400 })
  }
}
