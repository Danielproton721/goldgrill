"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Heartbeat de presença: manda um sinal pro /api/presence a cada ~30s com um id
// de sessão estável, pra alimentar o "online agora" e o total de visitantes/dia
// do painel /admin. Best-effort: qualquer falha é silenciosa e nunca atrapalha
// a navegação.
export function PresenceBeacon() {
  const pathname = usePathname()
  // O operador olhando o /admin NÃO é um visitante da loja — não conta a si mesmo.
  const isAdmin = pathname?.startsWith("/admin") ?? false

  useEffect(() => {
    if (isAdmin) return
    const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
    let id = ""
    try {
      id = localStorage.getItem("fn_sid") || ""
      if (!id) {
        id = newId()
        localStorage.setItem("fn_sid", id)
      }
    } catch {
      id = newId()
    }

    // Conta a visita única do dia UMA vez por navegador (trava no localStorage).
    // Dia no fuso BR (UTC-3) só como guarda anti-spam; o servidor decide o dia real
    // e o HLL deduplica o id de qualquer forma.
    let countToday = false
    try {
      const today = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString().slice(0, 10)
      if (localStorage.getItem("fn_day") !== today) {
        countToday = true
        localStorage.setItem("fn_day", today)
      }
    } catch {
      countToday = true
    }

    const ping = (count: boolean) => {
      fetch("/api/presence", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, count }),
        keepalive: true,
      }).catch(() => {})
    }

    ping(countToday)
    const interval = setInterval(() => ping(false), 30_000)
    const onVisible = () => {
      if (document.visibilityState === "visible") ping(false)
    }
    document.addEventListener("visibilitychange", onVisible)

    return () => {
      clearInterval(interval)
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [isAdmin])

  return null
}
