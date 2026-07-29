import { NextResponse } from "next/server"
import { ADMIN_COOKIE, checkPassword, sessionToken } from "@/lib/admin-auth"
import { consumeRateLimit, getClientIp } from "@/lib/checkout-security"
import { kvConfigured, kvGetJSON, kvSetJSON } from "@/lib/kv-store"

export const dynamic = "force-dynamic"

// A senha do admin é chave única: destranca pedidos (com dados do cliente),
// catálogo e configuração de pagamento. Sem freio, dá pra adivinhar em loop na
// velocidade do servidor — testado em produção: 60 tentativas em paralelo,
// nenhuma barrada.
//
// Duas travas, porque uma só não segura na Vercel:
//  • memória da instância — imediata e de graça, mas cada lambda tem a sua;
//  • contador no KV — atravessa as instâncias. Gasta 2 comandos por tentativa
//    ERRADA (acerto não gasta nada), então o custo no Upstash é irrisório.
const JANELA_MS = 10 * 60 * 1000
const MAX_ERROS = 8

async function errosNoKv(ip: string): Promise<number> {
  if (!kvConfigured()) return 0
  const reg = await kvGetJSON<{ n: number; ate: number }>(`login:fail:${ip}`)
  if (!reg || reg.ate < Date.now()) return 0
  return reg.n
}

async function marcarErro(ip: string): Promise<void> {
  if (!kvConfigured()) return
  const atual = await kvGetJSON<{ n: number; ate: number }>(`login:fail:${ip}`)
  const valido = atual && atual.ate >= Date.now()
  await kvSetJSON(
    `login:fail:${ip}`,
    { n: (valido ? atual!.n : 0) + 1, ate: valido ? atual!.ate : Date.now() + JANELA_MS },
    Math.ceil(JANELA_MS / 1000)
  ).catch(() => {})
}

export async function POST(request: Request) {
  const ip = getClientIp(request)

  const naMemoria = consumeRateLimit(`admin:login:${ip}`, MAX_ERROS, JANELA_MS)
  const bloqueado = !naMemoria.ok || (await errosNoKv(ip).catch(() => 0)) >= MAX_ERROS
  if (bloqueado) {
    return NextResponse.json(
      { ok: false, error: "Muitas tentativas. Aguarde alguns minutos." },
      { status: 429, headers: { "Retry-After": String(naMemoria.retryAfterSeconds || 600) } }
    )
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    body = {}
  }
  const password = String(body?.password || "")
  if (!checkPassword(password)) {
    await marcarErro(ip)
    console.warn("[ADMIN] senha incorreta vinda de", ip)
    return NextResponse.json({ ok: false, error: "Senha incorreta." }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  })
  return res
}
