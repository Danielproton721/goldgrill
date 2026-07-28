import { NextResponse } from "next/server"
import { isAuthed } from "@/lib/admin-auth"
import { kvConfigured } from "@/lib/kv-store"
import {
  GATEWAYS,
  gatewayConfigured,
  getActiveGateway,
  getGatewayConfig,
  isGatewayId,
  setActiveGateway,
  setGatewayConfig,
} from "@/lib/gateways/active"

export const dynamic = "force-dynamic"

function configuredMap() {
  return Object.fromEntries(GATEWAYS.map((g) => [g.id, gatewayConfigured(g.id)]))
}

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }
  return NextResponse.json({
    active: await getActiveGateway(),
    config: await getGatewayConfig(),
    configured: configuredMap(),
    kv: kvConfigured(),
  })
}

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }
  if (!kvConfigured()) {
    return NextResponse.json(
      { error: "KV (Upstash) não configurado — não dá pra salvar a escolha." },
      { status: 400 }
    )
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  // Formato novo: { order, enabled, relay } — liga/desliga, prioridade e relay.
  if (body?.order || body?.enabled || body?.relay) {
    const atual = await getGatewayConfig()
    const enabledFinal = body?.enabled ?? atual.enabled
    const ligados = GATEWAYS.filter((g) => enabledFinal?.[g.id])
    if (!ligados.length) {
      return NextResponse.json(
        { error: "Deixe pelo menos um gateway ligado — senão o checkout para." },
        { status: 400 }
      )
    }

    // Relay pedido com URL que não é https (ou vazia) seria salvo como desligado
    // sem explicação — melhor recusar e dizer o motivo.
    const relayInvalido = GATEWAYS.filter(
      (g) => body?.relay?.enabled?.[g.id] && !/^https:\/\/.+/i.test(String(body?.relay?.url?.[g.id] ?? "").trim())
    )
    if (relayInvalido.length) {
      return NextResponse.json(
        {
          error: `Informe a URL https do relay de: ${relayInvalido.map((g) => g.label).join(", ")}.`,
        },
        { status: 400 }
      )
    }

    const semChave = ligados.filter((g) => !gatewayConfigured(g.id))
    const config = await setGatewayConfig(body)
    const relaySemSegredo = GATEWAYS.some((g) => config.relay.enabled[g.id]) && !process.env.RELAY_SECRET?.trim()
    return NextResponse.json({
      ok: true,
      active: config.order.find((id) => config.enabled[id]),
      config,
      configured: configuredMap(),
      // Avisa, mas não bloqueia: a chave pode entrar depois, na Vercel.
      warning:
        [
          semChave.length ? `Ligado(s) sem chave no ambiente: ${semChave.map((g) => g.label).join(", ")}.` : "",
          relaySemSegredo
            ? "Relay ligado sem RELAY_SECRET no ambiente — o webhook não consegue barrar quem chegar por fora."
            : "",
        ]
          .filter(Boolean)
          .join(" ") || undefined,
    })
  }

  // Formato antigo: { gateway: "medusa" } — promove a principal.
  const id = body?.gateway
  if (!isGatewayId(id)) {
    return NextResponse.json({ error: "Gateway inválido." }, { status: 400 })
  }

  await setActiveGateway(id)
  return NextResponse.json({
    ok: true,
    active: id,
    config: await getGatewayConfig(),
    configured: configuredMap(),
  })
}
