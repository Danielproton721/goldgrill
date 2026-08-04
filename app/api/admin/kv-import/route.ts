import { NextResponse } from "next/server"
import { isAuthed } from "@/lib/admin-auth"
import { kvComandoCru, kvConfigured, kvNomeDoBanco } from "@/lib/kv-store"

export const dynamic = "force-dynamic"
export const maxDuration = 60

// RESTAURAR BACKUP — grava no banco ATUAL o conteúdo de um arquivo gerado pelo
// /api/admin/kv-export. É o segundo passo da migração de banco:
//   1. exporta no banco antigo
//   2. troca a variável do Upstash na Vercel + redeploy
//   3. importa aqui (já apontando pro banco novo)
//
// Por segurança, NÃO apaga nada: só grava o que veio no arquivo. Se a chave já
// existir no destino, o padrão é PULAR — pra um import acidental não passar por
// cima de dado novo. Com { sobrescrever: true } ele substitui.

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }
  if (!kvConfigured()) {
    return NextResponse.json({ error: "KV não configurado." }, { status: 400 })
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Arquivo inválido (não é JSON)." }, { status: 400 })
  }

  const itens = Array.isArray(body?.itens) ? body.itens : null
  if (!itens) {
    return NextResponse.json({ error: "Arquivo não parece um backup (falta 'itens')." }, { status: 400 })
  }
  const sobrescrever = body?.sobrescrever === true

  let gravados = 0
  let pulados = 0
  const falhas: string[] = []

  for (const item of itens) {
    const key = String(item?.key || "")
    if (!key) continue
    try {
      if (!sobrescrever) {
        const existe = Number(await kvComandoCru(["EXISTS", key]))
        if (existe === 1) {
          pulados++
          continue
        }
      }

      if (item.tipo === "string") {
        const args: (string | number)[] = ["SET", key, String(item.valor ?? "")]
        if (item.ttl > 0) args.push("EX", Number(item.ttl))
        await kvComandoCru(args)
      } else if (item.tipo === "zset" && Array.isArray(item.membros)) {
        if (sobrescrever) await kvComandoCru(["DEL", key])
        for (const m of item.membros) {
          await kvComandoCru(["ZADD", key, Number(m.score) || 0, String(m.membro)])
        }
        if (item.ttl > 0) await kvComandoCru(["EXPIRE", key, Number(item.ttl)])
      } else if (item.tipo === "set" && Array.isArray(item.membros)) {
        if (sobrescrever) await kvComandoCru(["DEL", key])
        for (const m of item.membros) await kvComandoCru(["SADD", key, String(m)])
        if (item.ttl > 0) await kvComandoCru(["EXPIRE", key, Number(item.ttl)])
      } else {
        falhas.push(`${key}: tipo desconhecido`)
        continue
      }
      gravados++
    } catch (e) {
      falhas.push(`${key}: ${(e as Error)?.message || "erro"}`)
    }
  }

  return NextResponse.json({
    ok: falhas.length === 0,
    destino: kvNomeDoBanco(),
    gravados,
    pulados,
    falhas: falhas.slice(0, 20),
    totalFalhas: falhas.length,
  })
}
