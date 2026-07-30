// Persistência do pedido associada ao txid da transação.
//
// O webhook da Pagou só recebe txid + status — não tem os itens nem o endereço.
// Por isso o pedido completo é persistido no momento em que o PIX é criado,
// para que o webhook consiga montar e disparar o e-mail de confirmação mesmo
// que o cliente já tenha fechado a aba.

import { kvGet, kvSet } from "./kv-store";
import type { Attribution } from "./attribution";
import type { OrderEmailInput } from "./order-email";

const ORDER_TTL_SECONDS = 60 * 60 * 48; // 48h — janela folgada para o PIX confirmar

export type StoredOrder = OrderEmailInput & {
  txid: string;
  createdAt: string;
  /**
   * De onde o cliente veio (gclid do Google Ads, utm, fbclid). Fica DENTRO do
   * mesmo registro de pedido — nenhum banco novo, nenhum comando extra no KV.
   * É o que permite creditar a venda ao anúncio quando o webhook do gateway
   * confirma o pagamento, sem depender do cliente voltar pra loja.
   */
  attribution?: Attribution;
};

export async function saveOrder(txid: string, order: StoredOrder): Promise<void> {
  await kvSet(`order:${txid}`, JSON.stringify(order), ORDER_TTL_SECONDS);
}

export async function getOrder(txid: string): Promise<StoredOrder | null> {
  const raw = await kvGet(`order:${txid}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredOrder;
  } catch {
    return null;
  }
}
