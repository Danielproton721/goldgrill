"use client"

import { useEffect, useState } from "react"
import { Database } from "lucide-react"

// Contador "ao vivo" de visitantes + total de visitantes únicos de hoje.
// Atualiza sozinho a cada 30s (econômico no KV). Depende de a loja mandar
// heartbeats pro /api/presence (PresenceBeacon no layout).
//
// O card no hover mostra QUAL banco Upstash está por trás — esse contador é o
// que mais escreve no KV, então é o lugar natural pra essa informação aparecer
// (com várias contas no Upstash, é fácil perder de vista qual loja usa qual).
export function OnlineCount({
  banco,
  bancoRelay,
}: {
  /** Nome do banco Upstash principal (host, sem o .upstash.io). */
  banco?: string | null
  /** Banco separado do relay, quando configurado. */
  bancoRelay?: string | null
}) {
  const [online, setOnline] = useState<number | null>(null)
  const [today, setToday] = useState<number | null>(null)
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    let stopped = false
    const load = async () => {
      try {
        const r = await fetch("/api/presence", { cache: "no-store" })
        const d = await r.json()
        if (stopped) return
        setOnline(typeof d?.online === "number" ? d.online : 0)
        setToday(typeof d?.today === "number" ? d.today : 0)
      } catch {
        if (!stopped) setOnline(null)
      }
    }
    load()
    const interval = setInterval(load, 30_000)
    return () => {
      stopped = true
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      {/* Contador de online + card do banco no hover/toque */}
      <div
        className="relative"
        onMouseEnter={() => setAberto(true)}
        onMouseLeave={() => setAberto(false)}
      >
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          className="inline-flex cursor-help items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-bold text-emerald-700">{online ?? "—"} online</span>
        </button>

        {aberto && (
          <div className="gg-pop absolute right-0 top-full z-40 mt-1.5 w-64 rounded-xl border border-border bg-card p-3 text-left shadow-xl">
            <div className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                Banco de dados
              </span>
            </div>

            {banco ? (
              <>
                <p className="mt-1 break-all font-mono text-[12px] font-bold text-foreground">{banco}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  no Upstash · guarda pedidos, visitantes, catálogo e o gateway ativo
                </p>
              </>
            ) : (
              <p className="mt-1 text-[11px] text-amber-700">
                Nenhum banco configurado — nada é salvo (painel em somente leitura).
              </p>
            )}

            {bancoRelay && bancoRelay !== banco && (
              <div className="mt-2 border-t border-border pt-2">
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  Relay (banco separado)
                </p>
                <p className="break-all font-mono text-[11px] font-bold text-foreground">{bancoRelay}</p>
              </div>
            )}

            <p className="mt-2 border-t border-border pt-2 text-[10px] text-muted-foreground">
              Este contador escreve no banco a cada visita — é ele que mais consome comandos.
            </p>
          </div>
        )}
      </div>

      <div className="inline-flex items-center rounded-xl border border-border bg-card px-3 py-1.5">
        <span className="text-sm font-bold text-foreground">{today ?? "—"}</span>
        <span className="ml-1 text-xs text-muted-foreground">hoje</span>
      </div>
    </div>
  )
}
