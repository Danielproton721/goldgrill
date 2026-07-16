"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { BadgePercent, Check, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"

// Popup de cupom de boas-vindas. Ao aplicar, o desconto entra no cart-context
// e se propaga sozinho: carrinho, checkout e valor cobrado no gateway.
// Aparece 1x por sessão (dismiss) e nunca mais depois de aplicado.
const DISMISS_KEY = "fn_coupon_popup_dismissed"
const SHOW_DELAY_MS = 6000

// Páginas onde interromper atrapalha mais do que converte.
const BLOCKED_PATHS = ["/checkout", "/admin", "/rastreio-de-pedido"]

export function CouponPopup() {
  const pathname = usePathname()
  const { couponApplied, couponCode, couponPct, applyCoupon } = useCart()
  const [visible, setVisible] = useState(false)
  const [justApplied, setJustApplied] = useState(false)

  useEffect(() => {
    if (couponApplied) return
    if (BLOCKED_PATHS.some((p) => pathname?.startsWith(p))) return
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") return
    } catch {
      // silent fail
    }
    const id = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [couponApplied, pathname])

  const handleDismiss = () => {
    setVisible(false)
    try {
      sessionStorage.setItem(DISMISS_KEY, "1")
    } catch {
      // silent fail
    }
  }

  const handleApply = () => {
    applyCoupon()
    setJustApplied(true)
    window.setTimeout(() => setVisible(false), 2200)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9500] flex items-center justify-center bg-[#1a1a1a]/60 p-4 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Cupom de desconto"
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/20 p-1.5 text-white transition-colors hover:bg-white/35"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>

        {/* Topo gradiente — assinatura da marca */}
        <div className="gold-flow px-6 pb-7 pt-8 text-center text-[#1a1a1a]">
          <BadgePercent size={40} className="mx-auto mb-2 drop-shadow" />
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/85">
            Cupom de primeira compra
          </p>
          <p className="mt-1 font-serif text-5xl font-black leading-none drop-shadow-sm">
            {couponPct}% OFF
          </p>
          <p className="mt-2 text-[13px] font-semibold text-white/90">
            na sua primeira compra
          </p>
        </div>

        <div className="px-6 pb-6 pt-5 text-center">
          {justApplied ? (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <Check size={26} className="text-emerald-600" />
              </span>
              <p className="mt-3 text-base font-black text-[#1a1a1a]">Cupom ativado!</p>
              <p className="mt-1 text-xs font-medium text-[#737373]">
                Os {couponPct}% já estão descontados no carrinho e no pagamento.
              </p>
            </div>
          ) : (
            <>
              <div className="mx-auto flex w-fit items-center gap-2 rounded-xl border-2 border-dashed border-[#5b4126]/50 bg-[#f0d9a8]/40 px-4 py-2">
                <span className="text-lg font-black tracking-[0.15em] text-[#5b4126]">
                  {couponCode}
                </span>
              </div>
              <button
                onClick={handleApply}
                className="mt-4 w-full rounded-full bg-gradient-to-r from-[#f8cc46] to-[#eaa50c] py-3.5 text-sm font-black uppercase tracking-wide text-[#1a1a1a] shadow-lg shadow-[#5b4126]/30 transition-all hover:brightness-110 active:scale-95"
              >
                Aplicar meu desconto
              </button>
              <p className="mt-2.5 text-[11px] font-medium text-[#737373]">
                Aplicado automaticamente no carrinho e no checkout.
              </p>
              <button
                onClick={handleDismiss}
                className="mt-1 text-[11px] font-semibold text-[#a3a3a3] underline underline-offset-2 transition-colors hover:text-[#737373]"
              >
                Agora não, prefiro pagar o preço cheio
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
