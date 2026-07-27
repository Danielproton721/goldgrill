"use client"

import { useState } from "react"
import { Loader2, CreditCard, ChevronUp, ChevronDown, AlertTriangle } from "lucide-react"
import type { GatewayConfig, GatewayId } from "@/lib/gateways/active"

export function GatewaySwitch({
  initial,
  configured,
  labels,
  kvOk,
}: {
  initial: GatewayConfig
  /** Quais gateways têm chave no ambiente (vindo do servidor). */
  configured: Record<GatewayId, boolean>
  labels: Record<GatewayId, string>
  kvOk: boolean
}) {
  const [config, setConfig] = useState<GatewayConfig>(initial)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const principal = config.order.find((id) => config.enabled[id]) ?? null
  const fila = config.order.filter((id) => config.enabled[id] && id !== principal)

  async function save(next: GatewayConfig) {
    const anterior = config
    setConfig(next) // otimista: a UI responde na hora
    setSaving(true)
    setMsg(null)
    try {
      const r = await fetch("/api/admin/gateway", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(next),
      })
      const d = await r.json().catch(() => ({}))
      if (r.ok) {
        if (d?.config) setConfig(d.config)
        setMsg({
          ok: !d?.warning,
          text: d?.warning ? `Salvo. ⚠ ${d.warning}` : "Salvo — vale pra loja inteira agora.",
        })
      } else {
        setConfig(anterior)
        setMsg({ ok: false, text: d?.error || "Erro ao salvar." })
      }
    } catch {
      setConfig(anterior)
      setMsg({ ok: false, text: "Falha de conexão." })
    } finally {
      setSaving(false)
    }
  }

  function toggle(id: GatewayId) {
    const enabled = { ...config.enabled, [id]: !config.enabled[id] }
    if (!config.order.some((g) => enabled[g])) {
      setMsg({ ok: false, text: "Deixe pelo menos um ligado — senão o checkout para." })
      return
    }
    save({ ...config, enabled })
  }

  function move(id: GatewayId, dir: -1 | 1) {
    const order = [...config.order]
    const i = order.indexOf(id)
    const j = i + dir
    if (i < 0 || j < 0 || j >= order.length) return
    ;[order[i], order[j]] = [order[j], order[i]]
    save({ ...config, order })
  }

  return (
    <div className="mb-6 rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-2">
        <CreditCard className="mt-0.5 h-5 w-5 text-muted-foreground" />
        <div className="flex-1">
          <h2 className="font-bold text-foreground">Gateways de pagamento</h2>
          <p className="text-xs text-muted-foreground">
            A loja usa o <strong>primeiro ligado</strong> da fila. Se ele estiver fora do ar, o próximo assume
            sozinho — o cliente não vê erro.
          </p>
        </div>
      </div>

      <ul className="mt-3 space-y-2">
        {config.order.map((id, i) => {
          const on = config.enabled[id]
          const semChave = on && !configured[id]
          const ehPrincipal = id === principal
          return (
            <li
              key={id}
              className={`flex items-center gap-3 rounded-lg border p-2.5 ${
                ehPrincipal ? "border-emerald-300 bg-emerald-50/60" : "border-border"
              }`}
            >
              <div className="flex flex-col">
                <button
                  onClick={() => move(id, -1)}
                  disabled={!kvOk || saving || i === 0}
                  aria-label={`Subir ${labels[id]}`}
                  className="rounded p-0.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => move(id, 1)}
                  disabled={!kvOk || saving || i === config.order.length - 1}
                  aria-label={`Descer ${labels[id]}`}
                  className="rounded p-0.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-sm font-bold ${on ? "text-foreground" : "text-muted-foreground"}`}>
                    {labels[id]}
                  </span>
                  {ehPrincipal && (
                    <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      PROCESSANDO AGORA
                    </span>
                  )}
                  {on && !ehPrincipal && (
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                      RESERVA {fila.indexOf(id) + 1}
                    </span>
                  )}
                  {!configured[id] && (
                    <span className="text-[10px] font-medium text-muted-foreground">sem chave no ambiente</span>
                  )}
                </div>
                {semChave && (
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-amber-700">
                    <AlertTriangle className="h-3 w-3" />
                    Ligado sem chave — vai ser pulado na hora de cobrar.
                  </p>
                )}
              </div>

              {/* Interruptor */}
              <button
                role="switch"
                aria-checked={on}
                aria-label={`${on ? "Desligar" : "Ligar"} ${labels[id]}`}
                onClick={() => toggle(id)}
                disabled={!kvOk || saving}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-50 ${
                  on ? "bg-emerald-600" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    on ? "translate-x-[22px]" : "translate-x-0.5"
                  }`}
                />
              </button>
            </li>
          )
        })}
      </ul>

      {saving && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> salvando…
        </p>
      )}
      {!kvOk && (
        <p className="mt-2 text-xs text-amber-700">KV (Upstash) não configurado — a troca não pode ser salva.</p>
      )}
      {msg && <p className={`mt-2 text-xs ${msg.ok ? "text-emerald-700" : "text-red-600"}`}>{msg.text}</p>}
    </div>
  )
}
