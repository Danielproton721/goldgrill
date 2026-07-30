"use client"

import { useEffect } from "react"
import { parseAttributionFromUrl, readAttributionCookie, saveAttributionCookie } from "@/lib/attribution"

// Anota de onde o visitante veio (gclid do Google Ads, utm, fbclid) num cookie
// do próprio domínio, na primeira vez que ele entra pelo anúncio.
//
// Isso existe por causa do PIX: o cliente paga fora do site e quase nunca volta
// pra loja, então a venda não pode depender do navegador dele pra ser contada.
// Guardando a origem aqui, ela viaja junto do pedido e o SERVIDOR consegue
// avisar o Google quando o gateway confirmar o pagamento — com aba fechada,
// celular no bolso, dias depois.
//
// Não envia nada pra fora, não usa banco, não precisa de chave. Só um cookie.
export function AttributionCapture() {
  useEffect(() => {
    try {
      const novo = parseAttributionFromUrl(window.location.href, document.referrer)
      if (!novo) return // visita sem marcador de anúncio: preserva o cookie anterior

      const antigo = readAttributionCookie()
      // Clique novo de anúncio sobrescreve o anterior — o Google credita a venda
      // ao ÚLTIMO clique, então é esse que precisa estar salvo. Mas se o clique
      // novo não trouxe gclid e o antigo tinha, mantém o gclid antigo.
      const temCliqueNovo = Boolean(novo.gclid || novo.gbraid || novo.wbraid || novo.fbclid)
      const mesclado = temCliqueNovo ? novo : { ...antigo, ...novo }

      saveAttributionCookie(mesclado)
    } catch {
      // Atribuição é best-effort: nunca pode atrapalhar a navegação da loja.
    }
  }, [])

  return null
}
