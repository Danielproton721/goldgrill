"use client"

import { useEffect, useState } from "react"
import { Timer, Truck } from "lucide-react"

const FREE_SHIPPING_TIMER_KEY = "free-shipping-countdown-ends-at"
const FREE_SHIPPING_DURATION = 7 * 24 * 60 * 60 * 1000

function getNextDeadline() {
  return Date.now() + FREE_SHIPPING_DURATION
}

function formatTimeLeft(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000))
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-[54px] rounded-lg bg-white px-2 py-2 text-center shadow-sm ring-1 ring-[#e5e5e5]">
      <span className="block text-lg font-black leading-none text-[#1a1a1a]">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 block text-[9px] font-bold uppercase tracking-wide text-[#737373]">
        {label}
      </span>
    </div>
  )
}

export function ShippingCalculator() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    const syncDeadline = () => {
      const storedDeadline = Number(localStorage.getItem(FREE_SHIPPING_TIMER_KEY))
      let deadline = Number.isFinite(storedDeadline) && storedDeadline > Date.now()
        ? storedDeadline
        : getNextDeadline()

      let remaining = deadline - Date.now()

      if (remaining <= 0) {
        deadline = getNextDeadline()
        remaining = deadline - Date.now()
      }

      localStorage.setItem(FREE_SHIPPING_TIMER_KEY, String(deadline))
      setTimeLeft(remaining)
    }

    syncDeadline()
    const intervalId = window.setInterval(syncDeadline, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  const remaining = formatTimeLeft(timeLeft ?? FREE_SHIPPING_DURATION)

  return (
    <div className="px-4 py-4 bg-[#ffffff] border-t border-[#f5f5f5]">
      <div className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-[#fffaf0] shadow-sm">
        <div className="flex items-start gap-3 px-4 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-white">
            <Truck size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black uppercase tracking-wide text-[#1a1a1a]">
              Frete grátis liberado
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#737373]">
              Aproveite envio grátis em todo o Brasil antes da oferta encerrar.
            </p>
          </div>
        </div>

        <div className="border-y border-[#e5e5e5] bg-white/70 px-4 py-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#b98a2e]">
            <Timer size={14} />
            <span>Oferta termina em</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <TimeBlock value={remaining.days} label="dias" />
            <TimeBlock value={remaining.hours} label="hrs" />
            <TimeBlock value={remaining.minutes} label="min" />
            <TimeBlock value={remaining.seconds} label="seg" />
          </div>
        </div>

        <a
          href="#comprar-agora"
          className="block bg-[#00c9a7] px-4 py-3.5 text-center text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-[#00b396] active:scale-[0.99]"
        >
          Garantir frete grátis
        </a>
      </div>
    </div>
  )
}
