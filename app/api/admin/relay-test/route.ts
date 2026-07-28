import { NextResponse } from "next/server"
import { isAuthed } from "@/lib/admin-auth"
import { RELAY_IN_PATH, getGatewayConfig } from "@/lib/gateways/active"

export const dynamic = "force-dynamic"

// Testa o caminho do relay de ponta a ponta, sem pagamento:
//   loja → URL do relay (hub) → hub repassa → esta loja responde.
// Como o aviso volta pra cá, uma resposta nossa prova o circuito inteiro.
// O id enviado não existe em gateway nenhum, então nada é marcado como pago.

export async function POST() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const cfg = await getGatewayConfig()
  const url = cfg.relay.url
  if (!url) {
    return NextResponse.json({ ok: false, titulo: "Sem URL do relay", detalhe: "Cole a URL que o hub te deu." })
  }

  const corpo = JSON.stringify({
    type: "relay-test",
    event: "relay.test",
    data: { id: `relay-test-${Date.now()}`, status: "test" },
  })

  let res: Response
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: corpo,
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    })
  } catch {
    return NextResponse.json({
      ok: false,
      titulo: "O hub não respondeu",
      detalhe: "A URL está errada, fora do ar, ou demorou demais. Confira o endereço com o painel do hub.",
    })
  }

  const texto = (await res.text().catch(() => "")).slice(0, 500)

  // O hub responde isso quando a chave da URL não existe mais no cadastro dele
  // — foi o caso do "código antigo" depois de apagar e recriar a loja.
  if (texto.includes("no target")) {
    return NextResponse.json({
      ok: false,
      titulo: "O hub não conhece essa chave",
      detalhe:
        "A URL aponta pra um cadastro que não existe mais no hub. Pegue a URL atual no painel do hub — ou restaure lá a chave antiga.",
      resposta: texto,
    })
  }

  if (texto.includes("no destination")) {
    return NextResponse.json({
      ok: false,
      titulo: "Falta o endereço desta loja no hub",
      detalhe: `No cadastro do hub, o campo de webhook de destino tem que ser o endereço desta loja terminando em ${RELAY_IN_PATH}.`,
      resposta: texto,
    })
  }

  if (!res.ok) {
    return NextResponse.json({
      ok: false,
      titulo: `O hub respondeu com erro ${res.status}`,
      detalhe: "O aviso chegou no hub mas não foi repassado. Veja o Tráfego recente no painel dele.",
      resposta: texto,
    })
  }

  // Resposta desta loja voltando pelo hub: o circuito fechou.
  const voltou = /"received"|"handled"|"reason"/.test(texto)
  if (voltou) {
    return NextResponse.json({
      ok: true,
      titulo: "Circuito completo",
      detalhe: "O aviso saiu daqui, passou pelo hub e voltou pra esta loja. Nenhum pedido foi alterado.",
      resposta: texto,
    })
  }

  return NextResponse.json({
    ok: false,
    titulo: "O hub aceitou, mas não repassou pra cá",
    detalhe: "Confira no cadastro do hub se o webhook de destino aponta pra esta loja.",
    resposta: texto,
  })
}
