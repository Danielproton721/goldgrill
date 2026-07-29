import { NextResponse } from "next/server";
import { consumeRateLimit, getClientIp } from "@/lib/checkout-security";

import { getPaymentStatus, isGatewayPaidStatus, recordPaymentStatus } from "@/lib/payment-status";
import { getTxGateway } from "@/lib/gateways/active";
import { getStatusMedusa } from "@/lib/gateways/medusa";
import { getStatusCenturion } from "@/lib/gateways/centurion";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // O checkout consulta a cada poucos segundos enquanto o PIX está aberto —
  // 60/min por IP é folga pra isso e barra quem quiser usar a rota como
  // amplificador (cada chamada lê o KV e pode consultar o gateway).
  if (!consumeRateLimit(`status:${getClientIp(request)}`, 60, 60_000).ok) {
    return NextResponse.json({ error: "Muitas consultas." }, { status: 429 });
  }

  const url = new URL(request.url);
  const txid = url.searchParams.get("txid")?.trim();

  if (!txid) {
    return NextResponse.json({ error: "txid obrigatorio." }, { status: 400 });
  }

  const payment = await getPaymentStatus(txid);

  // Atalho: se o webhook já gravou "pago" no KV, confirma na hora (vale pros 3).
  if (isGatewayPaidStatus(payment?.status)) {
    return NextResponse.json({
      txid,
      paid: true,
      status: payment?.status ?? "paid",
      updatedAt: payment?.updatedAt ?? null,
    });
  }

  // Gateways novos (Medusa/Centurion) NÃO dependem só do webhook: consultamos o
  // provider direto no polling. Se pago, grava no KV pra refletir no painel.
  // Pagou.ai não é marcado por txid → cai no retorno padrão (status do KV).
  try {
    const gw = await getTxGateway(txid);
    if (gw === "medusa" || gw === "centurion") {
      const r = gw === "medusa" ? await getStatusMedusa(txid) : await getStatusCenturion(txid);
      if (r.ok && r.paid) {
        await recordPaymentStatus({
          event: `${gw}.poll`,
          transactionId: txid,
          status: "paid",
          paymentMethod: "pix",
          updatedAt: new Date().toISOString(),
        }).catch(() => {});
        return NextResponse.json({ txid, paid: true, status: "paid", updatedAt: new Date().toISOString() });
      }
    }
  } catch {
    // segue pro retorno padrão abaixo (não pago)
  }

  return NextResponse.json({
    txid,
    paid: false,
    status: payment?.status ?? "pending",
    updatedAt: payment?.updatedAt ?? null,
  });
}
