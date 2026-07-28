import { NextResponse } from "next/server"

import { recordPaymentStatus } from "@/lib/payment-status"
import { getOrder } from "@/lib/order-store"
import { dispatchOrderEmailOnce } from "@/lib/send-order-email"
import { markOrderPaid, isOrderPaid } from "@/lib/orders"
import { scheduleShippedNotify } from "@/lib/qstash"
import { getStatusMedusa, verifyMedusaSignature } from "@/lib/gateways/medusa"
import { relayEnabledFor } from "@/lib/gateways/active"

export const dynamic = "force-dynamic"

// SEM relay: a MedusaPay bate direto aqui (o relay é exclusivo da Pagou.ai).
// A URL deste endpoint tem que ser cadastrada NO PAINEL da Medusa
// (Configurações → API e Integrações → Webhook) — a API v2 não aceita mais
// postbackUrl no corpo da cobrança.
//
// Eventos da v2: payment.approved | payment.refunded | transfer.updated.
// Assinatura: X-Medusa-Signature: sha256=<hmac do corpo com o segredo>.

function extractId(body: any): string | null {
  const d = body?.data ?? body?.venda ?? body?.payment ?? body?.transaction ?? body ?? {}
  const id =
    d?.vendaId ??
    d?.id ??
    d?.transactionId ??
    body?.vendaId ??
    body?.transactionId ??
    body?.objectId ??
    body?.id ??
    null
  return id != null ? String(id) : null
}

function extractEvent(body: any): string {
  return String(body?.event ?? body?.evento ?? body?.type ?? "").toLowerCase()
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "medusa-webhook" })
}

export async function POST(request: Request) {
  // Relay ligado pra Medusa (no /admin): só aceita o que passou pelo relay —
  // ele injeta x-relay-secret e repassa os headers originais, então a assinatura
  // da Medusa continua valendo logo abaixo. Sem RELAY_SECRET no ambiente não dá
  // pra validar, então aceita (não derruba o fluxo antes do relay estar de pé).
  const relaySecret = process.env.RELAY_SECRET?.trim()
  if (relaySecret && (await relayEnabledFor("medusa"))) {
    if (request.headers.get("x-relay-secret") !== relaySecret) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
    }
  }

  const rawBody = await request.text()

  // Assinatura HMAC (v2). null = MEDUSAPAY_WEBHOOK_SECRET não configurado →
  // seguimos sem ela, já que abaixo confirmamos o pagamento na própria API.
  const signatureOk = verifyMedusaSignature(rawBody, request.headers.get("x-medusa-signature"))
  if (signatureOk === false) {
    console.warn("[MEDUSA WEBHOOK] assinatura invalida — request descartado")
    return NextResponse.json({ ok: false, error: "assinatura-invalida" }, { status: 401 })
  }

  let body: any
  try {
    body = rawBody ? JSON.parse(rawBody) : null
  } catch {
    return NextResponse.json({ ok: true }) // ack mesmo sem corpo válido
  }

  const event = extractEvent(body)
  const eventId = body?.eventId ? String(body.eventId) : null
  const txid = extractId(body)

  // Saque atualizado não tem nada a ver com pedido — só ack.
  if (event.startsWith("transfer.")) {
    return NextResponse.json({ ok: true, handled: false, reason: "evento-de-saque" })
  }

  if (!txid) {
    return NextResponse.json({ ok: true, handled: false, reason: "sem-id" })
  }

  // NÃO confiamos no corpo pra liberar o pedido: confirmamos consultando a
  // própria API da Medusa (vale mesmo com assinatura válida).
  const st = await getStatusMedusa(txid)

  if (event === "payment.refunded") {
    await recordPaymentStatus({
      event: "medusa.refunded",
      transactionId: txid,
      status: st.ok ? st.status : "estornado",
      paymentMethod: "pix",
      updatedAt: new Date().toISOString(),
    }).catch(() => {})
    console.warn("[MEDUSA WEBHOOK] estorno recebido:", { txid, eventId })
    return NextResponse.json({ ok: true, handled: true, refunded: true })
  }

  if (!st.ok || !st.paid) {
    return NextResponse.json({ ok: true, handled: false, reason: "nao-pago", status: st.status })
  }

  // Dedupe das retentativas da Medusa (30s / 2min / 3ª): se o pedido já está
  // pago, não reagenda e-mail nem notificação de postagem.
  const alreadyPaid = await isOrderPaid(txid).catch(() => false)
  if (alreadyPaid) {
    return NextResponse.json({ ok: true, handled: true, deduped: true })
  }

  // Grava o status pro polling do front refletir (mesma via do webhook Pagou).
  await recordPaymentStatus({
    event: "medusa.webhook",
    transactionId: txid,
    status: "paid",
    paymentMethod: "pix",
    updatedAt: new Date().toISOString(),
  }).catch(() => {})

  try {
    await markOrderPaid(txid)
  } catch (err) {
    console.error("[MEDUSA WEBHOOK] erro ao marcar pago no painel:", err)
  }

  try {
    const order = await getOrder(txid)
    if (order) {
      const result = await dispatchOrderEmailOnce(txid, order)
      console.log("[MEDUSA WEBHOOK] e-mail:", {
        txid,
        eventId,
        outcome: result.ok ? (result.deduped ? "ja-enviado" : `enviado:${result.id ?? ""}`) : `falha:${result.error}`,
      })
    } else {
      console.warn("[MEDUSA WEBHOOK] pedido nao encontrado no KV para txid", txid)
    }
  } catch (err) {
    console.error("[MEDUSA WEBHOOK] erro ao despachar e-mail:", err)
  }

  // Agenda o e-mail de "pedido postado" pra ~1h depois.
  await scheduleShippedNotify(txid)

  return NextResponse.json({ ok: true, handled: true })
}
