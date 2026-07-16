"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Cookie } from "lucide-react"

const COOKIE_CONSENT_KEY = "fio-nobre-cookie-consent"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(localStorage.getItem(COOKIE_CONSENT_KEY) !== "accepted")
  }, [])

  const handleAccept = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
    setIsVisible(false)
  }, [])

  if (!isVisible) return null

  return (
    <section
      className="fixed bottom-24 left-3 right-3 z-[70] mx-auto max-w-sm rounded-lg border border-[#e7dfcf] bg-white/95 p-3 shadow-[0_12px_34px_rgba(26,26,26,0.12)] backdrop-blur md:bottom-5 md:left-5 md:right-auto md:mx-0 md:max-w-md"
      aria-label="Aviso de cookies"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff7df] text-[#b98500]">
          <Cookie size={16} aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-xs leading-relaxed text-[#3a3328]">
            Usamos cookies para melhorar sua experiência e manter recursos da loja funcionando.
            <Link
              href="/politica-de-privacidade"
              className="ml-1 font-semibold text-[#1a1a1a] underline underline-offset-2"
            >
              Ver política.
            </Link>
          </p>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={handleAccept}
              className="rounded-full bg-[#1a1a1a] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b98a2e]"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
