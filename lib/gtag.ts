// Google Ads (gtag) — só o mínimo, do lado do cliente.
//
// IDs vêm do gestor de tráfego. Ficam no código porque são públicos por
// natureza (qualquer visitante os vê no HTML) — não são credencial.
export const GOOGLE_ADS_ID = "AW-18273662758"
/** Rótulo da conversão "Compra". */
export const GOOGLE_ADS_COMPRA = "AW-18273662758/CG_GCLiNwtUcEKbux4lE"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Dispara a conversão de COMPRA.
 *
 * Só é chamada quando o pagamento está CONFIRMADO (no PIX, quando o polling
 * recebe paid=true; no cartão, quando a transação é aprovada) — nunca na
 * geração do PIX, senão o Google aprenderia a otimizar pra "gerou cobrança"
 * em vez de "pagou".
 *
 * `transactionId` deduplica: se a pessoa recarregar a tela de confirmação, o
 * Google conta a mesma venda uma única vez.
 *
 * LIMITE CONHECIDO: isto roda no navegador. Se o cliente pagar o PIX e não
 * voltar pra loja, a conversão não dispara. O fechamento dos 100% é
 * server-side (o gclid já viaja dentro do pedido pra isso) — ver
 * docs/briefing-trafego-seo.md.
 */
/** Dados do cliente pro Enhanced Conversions (o Google hasheia no navegador). */
export type PurchaseUserData = {
  email?: string
  /** Telefone com DDD; normalizado pra E.164 (+55...) aqui dentro. */
  phone?: string
}

export function trackPurchase(
  transactionId: string,
  value: number,
  user?: PurchaseUserData,
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  if (!transactionId || !(value > 0)) return
  try {
    // Enhanced Conversions ("Conversões otimizadas", já ligado no painel do Ads):
    // manda e-mail/telefone do cliente junto da conversão. O gtag hasheia no
    // próprio navegador antes de enviar — nenhum dado pessoal sai em texto puro.
    // Recupera venda que o clique sozinho perderia (iOS, cookie limpo).
    const email = user?.email?.trim().toLowerCase()
    const digits = user?.phone?.replace(/\D/g, "")
    if (email || digits) {
      const userData: { email?: string; phone_number?: string } = {}
      if (email) userData.email = email
      // BR: 10-11 dígitos = DDD+número (falta o país); 12+ = já traz o 55.
      if (digits) userData.phone_number = digits.length >= 12 ? `+${digits}` : `+55${digits}`
      window.gtag("set", "user_data", userData)
    }
    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_COMPRA,
      value,
      currency: "BRL",
      transaction_id: transactionId,
    })
  } catch {
    // Rastreamento nunca pode atrapalhar a tela de confirmação do cliente.
  }
}
