"use client"

import { useState } from "react"
import {
  Loader2,
  CreditCard,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  Waypoints,
  Copy,
  Check,
  CheckCircle2,
} from "lucide-react"
import type { GatewayConfig, GatewayId } from "@/lib/gateways/active"
import { FlowDiagram } from "./flow-diagram"

export function GatewaySwitch({
  initial,
  configured,
  labels,
  webhookPath,
  relayInPath,
  relayViaPainel,
  appBaseUrl,
  relaySecretOk,
  kvOk,
}: {
  initial: GatewayConfig
  /** Quais gateways têm chave no ambiente (vindo do servidor). */
  configured: Record<GatewayId, boolean>
  labels: Record<GatewayId, string>
  /** Endpoint desta loja que recebe o webhook de cada gateway (sem relay). */
  webhookPath: Record<GatewayId, string>
  /** Porta única do relay — o destino que se cadastra no hub. */
  relayInPath: string
  /** Gateways cuja URL de webhook é cadastrada no painel deles (Medusa v2). */
  relayViaPainel: Record<GatewayId, boolean>
  appBaseUrl: string
  relaySecretOk: boolean
  kvOk: boolean
}) {
  const [config, setConfig] = useState<GatewayConfig>(initial)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [copiadoDestino, setCopiadoDestino] = useState(false)
  // Qual item acabou de mudar de posição/estado — ganha um halo que apaga sozinho.
  const [destacado, setDestacado] = useState<GatewayId | null>(null)

  function destacar(id: GatewayId) {
    setDestacado(id)
    setTimeout(() => setDestacado((atual) => (atual === id ? null : atual)), 900)
  }

  const principal = config.order.find((id) => config.enabled[id]) ?? null
  const fila = config.order.filter((id) => config.enabled[id] && id !== principal)
  // Porta única: é este o destino que se cadastra no hub.
  const destinoRelay = `${appBaseUrl || "https://seu-dominio"}${relayInPath}`

  function copiarTexto(texto: string) {
    navigator.clipboard?.writeText(texto)
    setCopiadoDestino(true)
    setTimeout(() => setCopiadoDestino(false), 1500)
  }

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
    destacar(id)
    save({ ...config, enabled })
  }

  function toggleRelay(id: GatewayId) {
    const ligando = !config.relay.enabled[id]
    const url = (config.relay.url || "").trim()
    if (ligando && !/^https:\/\/.+/i.test(url)) {
      setMsg({ ok: false, text: "Cole a URL https do relay lá em cima antes de ligar." })
      return
    }
    destacar(id)
    save({ ...config, relay: { url, enabled: { ...config.relay.enabled, [id]: ligando } } })
  }

  function move(id: GatewayId, dir: -1 | 1) {
    const order = [...config.order]
    const i = order.indexOf(id)
    const j = i + dir
    if (i < 0 || j < 0 || j >= order.length) return
    ;[order[i], order[j]] = [order[j], order[i]]
    destacar(id)
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

      {principal && (
        <FlowDiagram
          principal={labels[principal]}
          reservas={fila.map((id) => labels[id])}
          relayLigado={config.relay.enabled[principal]}
          relayViaPainel={relayViaPainel[principal]}
          temChave={configured[principal]}
        />
      )}

      {/* Relay: UMA URL pros três. No hub basta um cadastro apontando pra
          /api/webhooks/relay-in, que descobre o gateway e despacha. */}
      <div className="mt-3 rounded-lg border border-border bg-muted/40 p-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <Waypoints className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-bold text-foreground">Relay (opcional)</span>
          <input
            value={config.relay.url}
            onChange={(e) => setConfig((c) => ({ ...c, relay: { ...c.relay, url: e.target.value } }))}
            onBlur={() => {
              const url = (config.relay.url || "").trim()
              if (url !== initial.relay.url) save({ ...config, relay: { ...config.relay, url } })
            }}
            disabled={!kvOk || saving}
            placeholder="https://dominio-do-hub/api/webhooks/payment/<chave>"
            className="min-w-[240px] flex-1 rounded border border-border bg-background px-2 py-1 font-mono text-[11px] disabled:opacity-50"
          />
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
          Cole aqui a URL que o hub te deu (<strong>um cadastro só</strong>, serve pros três). No hub, o destino
          dessa chave tem que ser{" "}
          <button
            onClick={() => copiarTexto(destinoRelay)}
            className="inline-flex items-center gap-1 rounded bg-background px-1 py-0.5 font-mono text-[10px] hover:bg-muted"
          >
            {copiadoDestino ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {destinoRelay}
          </button>{" "}
          — ele descobre sozinho de qual gateway veio o aviso.
        </p>
      </div>

      <ul className="mt-3 space-y-2">
        {config.order.map((id, i) => {
          const on = config.enabled[id]
          const semChave = on && !configured[id]
          const ehPrincipal = id === principal
          return (
            <li
              key={id}
              className={`flex items-start gap-3 rounded-lg border p-2.5 transition-colors duration-200 ${
                ehPrincipal ? "border-emerald-300 bg-emerald-50/60" : "border-border"
              } ${destacado === id ? "gg-destaque" : ""}`}
            >
              <div className="flex flex-col pt-0.5">
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

                <RelayRow
                  label={labels[id]}
                  on={config.relay.enabled[id]}
                  temUrl={Boolean(config.relay.url)}
                  viaPainel={relayViaPainel[id]}
                  urlPraCadastrar={
                    config.relay.enabled[id] && config.relay.url
                      ? config.relay.url
                      : `${appBaseUrl || "https://seu-dominio"}${webhookPath[id]}`
                  }
                  disabled={!kvOk || saving}
                  onToggle={() => toggleRelay(id)}
                  onCopiar={copiarTexto}
                />
              </div>

              {/* Interruptor */}
              <button
                role="switch"
                aria-checked={on}
                aria-label={`${on ? "Desligar" : "Ligar"} ${labels[id]}`}
                onClick={() => toggle(id)}
                disabled={!kvOk || saving}
                className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-50 ${
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

      {config.order.some((id) => config.relay.enabled[id]) && !relaySecretOk && (
        <p className="mt-2 flex items-center gap-1 text-xs text-amber-700">
          <AlertTriangle className="h-3.5 w-3.5" />
          Relay ligado, mas sem <code className="font-mono">RELAY_SECRET</code> no ambiente — o webhook aceita
          qualquer um que descobrir a URL.
        </p>
      )}
      {/* Um lugar só pro estado da ação: salvando → resultado. Sem empilhar avisos. */}
      <div className="mt-2 min-h-[20px]" aria-live="polite">
        {saving ? (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            salvando…
          </p>
        ) : (
          msg && (
            <p
              className={`gg-pop flex items-center gap-1.5 text-xs ${
                msg.ok ? "text-emerald-700" : "text-red-600"
              }`}
            >
              {msg.ok ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
              {msg.text}
            </p>
          )
        )}
      </div>
      {!kvOk && (
        <p className="mt-1 text-xs text-amber-700">KV (Upstash) não configurado — a troca não pode ser salva.</p>
      )}
    </div>
  )
}

// Botão de relay de UM gateway. A URL é a mesma pros três (fica no topo do
// card) — aqui só se decide se ESTE gateway avisa pelo relay ou direto.
function RelayRow({
  label,
  on,
  temUrl,
  viaPainel,
  urlPraCadastrar,
  disabled,
  onToggle,
  onCopiar,
}: {
  label: string
  on: boolean
  temUrl: boolean
  viaPainel: boolean
  urlPraCadastrar: string
  disabled: boolean
  onToggle: () => void
  onCopiar: (texto: string) => void
}) {
  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-2">
      <button
        onClick={onToggle}
        disabled={disabled || (!on && !temUrl)}
        title={!temUrl ? "Cole a URL do relay lá em cima primeiro" : undefined}
        className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold transition-colors disabled:opacity-40 ${
          on ? "bg-violet-600 text-white" : "border border-border text-muted-foreground hover:bg-muted"
        }`}
      >
        <Waypoints className="h-3 w-3" />
        {on ? "relay ligado — desativar" : "relay desligado — ativar"}
      </button>

      {viaPainel && (
        <button
          onClick={() => onCopiar(urlPraCadastrar)}
          className="inline-flex items-center gap-1 rounded border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 hover:bg-amber-100"
        >
          <Copy className="h-3 w-3" />
          copiar URL pro painel da {label}
        </button>
      )}
      {viaPainel && (
        <span className="text-[10px] text-muted-foreground">
          (a {label} não aceita URL no request — tem que cadastrar lá)
        </span>
      )}
    </div>
  )
}
