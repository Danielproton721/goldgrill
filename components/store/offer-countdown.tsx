"use client"

import { useEffect, useState } from "react"
import { Zap } from "lucide-react"

// Contador regressivo de "oferta relâmpago". Persiste o prazo no localStorage
// (não zera ao trocar de página) e reinicia sozinho ao acabar — urgência sempre
// ativa. Reutilizável: home e página de produto.
function useCountdown(durationMinutes: number) {
  const [ms, setMs] = useState<number | null>(null)

  useEffect(() => {
    const KEY = "fn_offer_deadline"
    const DUR = durationMinutes * 60 * 1000
    const read = () => {
      const now = Date.now()
      let dl = Number(localStorage.getItem(KEY) || 0)
      if (!dl || dl <= now) {
        dl = now + DUR
        localStorage.setItem(KEY, String(dl))
      }
      return dl - now
    }
    setMs(read())
    const id = setInterval(() => setMs(read()), 1000)
    return () => clearInterval(id)
  }, [durationMinutes])

  return ms
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function Box({ value }: { value: string }) {
  return (
    <span className="min-w-[38px] rounded-lg bg-white px-2 py-1.5 text-center text-lg font-black tabular-nums text-[#5b4126] shadow-sm">
      {value}
    </span>
  )
}

export function OfferCountdown({
  durationMinutes = 20,
  className = "",
}: {
  durationMinutes?: number
  className?: string
}) {
  const ms = useCountdown(durationMinutes)
  const total = Math.max(0, Math.floor((ms ?? 0) / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2.5 gold-flow px-4 py-3.5 text-[#1a1a1a] sm:flex-row sm:gap-4 ${className}`}
    >
      <div className="flex items-center gap-2">
        <Zap size={18} className="fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-black uppercase tracking-wide">Oferta relâmpago</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden text-xs font-medium text-[#1a1a1a]/60 sm:inline">acaba em</span>
        <div className="flex items-center gap-1 font-black">
          <Box value={pad(h)} />
          <span className="text-[#1a1a1a]/70">:</span>
          <Box value={pad(m)} />
          <span className="text-[#1a1a1a]/70">:</span>
          <Box value={pad(s)} />
        </div>
      </div>
    </div>
  )
}
