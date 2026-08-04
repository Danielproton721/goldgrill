import { NextResponse } from "next/server"
import { isAuthed } from "@/lib/admin-auth"
import { kvComandoCru, kvConfigured, kvNomeDoBanco } from "@/lib/kv-store"

export const dynamic = "force-dynamic"
export const maxDuration = 60

// BACKUP DO BANCO — baixa tudo que está no Upstash desta loja num arquivo JSON.
//
// Serve pra dois casos: guardar cópia de segurança e migrar de banco (o par
// deste é o /api/admin/kv-import). Quem lê o banco é o servidor da loja, que
// tem a credencial em runtime — por isso funciona mesmo com a variável marcada
// como "sensitive" na Vercel, invisível até no dashboard.
//
// Contém dados pessoais dos clientes (pedidos). É download autenticado; não
// deixe o arquivo em pasta compartilhada.

type Item =
  | { key: string; tipo: "string"; valor: string; ttl: number }
  | { key: string; tipo: "zset"; membros: { membro: string; score: number }[]; ttl: number }
  | { key: string; tipo: "set"; membros: string[]; ttl: number }

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }
  if (!kvConfigured()) {
    return NextResponse.json({ error: "KV não configurado." }, { status: 400 })
  }

  const itens: Item[] = []
  const ignorados: { key: string; motivo: string }[] = []

  try {
    // SCAN em páginas: não trava o banco como o KEYS faria.
    let cursor = "0"
    const chaves: string[] = []
    do {
      const [proximo, lote] = (await kvComandoCru(["SCAN", cursor, "COUNT", 300])) as [string, string[]]
      cursor = proximo
      chaves.push(...(lote || []))
      if (chaves.length > 20000) break // trava de segurança
    } while (cursor !== "0")

    for (const key of chaves) {
      const tipo = String(await kvComandoCru(["TYPE", key]))
      // TTL: -1 sem expiração, -2 inexistente. Preserva o vencimento no destino.
      const ttlBruto = Number(await kvComandoCru(["TTL", key]))
      const ttl = Number.isFinite(ttlBruto) && ttlBruto > 0 ? ttlBruto : 0

      try {
        if (tipo === "string") {
          const valor = await kvComandoCru(["GET", key])
          if (typeof valor === "string") itens.push({ key, tipo: "string", valor, ttl })
          else ignorados.push({ key, motivo: "valor binário (ex.: contador de visitantes únicos)" })
        } else if (tipo === "zset") {
          const plano = (await kvComandoCru(["ZRANGE", key, 0, -1, "WITHSCORES"])) as string[]
          const membros: { membro: string; score: number }[] = []
          for (let i = 0; i < plano.length; i += 2) {
            membros.push({ membro: String(plano[i]), score: Number(plano[i + 1]) })
          }
          itens.push({ key, tipo: "zset", membros, ttl })
        } else if (tipo === "set") {
          const membros = ((await kvComandoCru(["SMEMBERS", key])) as string[]).map(String)
          itens.push({ key, tipo: "set", membros, ttl })
        } else {
          ignorados.push({ key, motivo: `tipo ${tipo} não suportado no backup` })
        }
      } catch (e) {
        ignorados.push({ key, motivo: (e as Error)?.message || "erro ao ler" })
      }
    }
  } catch (e) {
    return NextResponse.json({ error: `Falha ao ler o banco: ${(e as Error)?.message}` }, { status: 502 })
  }

  const dump = {
    versao: 1,
    origem: kvNomeDoBanco(),
    geradoEm: new Date().toISOString(),
    total: itens.length,
    ignorados,
    itens,
  }

  const nome = `backup-${kvNomeDoBanco() || "kv"}-${new Date().toISOString().slice(0, 10)}.json`
  return new NextResponse(JSON.stringify(dump, null, 1), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "content-disposition": `attachment; filename="${nome}"`,
      "cache-control": "no-store",
    },
  })
}
