"use client"

import { ArrowDown, CheckCircle2, QrCode, ShieldAlert, Store, User, Waypoints, Zap } from "lucide-react"

// Diagrama do caminho do pagamento, montado a partir da configuração real.
// Duas trilhas, porque são dois momentos diferentes e é aí que a confusão mora:
//   IDA   — a loja pede a cobrança e recebe o QR Code de volta.
//   VOLTA — o cliente paga e o gateway avisa (direto ou pelo relay).
// O ponto que corre na seta existe pra mostrar a DIREÇÃO, não pra enfeitar.

type Cor = "ambar" | "verde" | "roxo"

const CORES: Record<Cor, { no: string; linha: string; luz: string; texto: string }> = {
  ambar: {
    no: "border-amber-300 bg-amber-50 text-amber-900",
    linha: "bg-amber-200",
    luz: "#b45309",
    texto: "text-amber-700",
  },
  verde: {
    no: "border-emerald-300 bg-emerald-50 text-emerald-900",
    linha: "bg-emerald-200",
    luz: "#047857",
    texto: "text-emerald-700",
  },
  roxo: {
    no: "border-violet-300 bg-violet-50 text-violet-900",
    linha: "bg-violet-200",
    luz: "#6d28d9",
    texto: "text-violet-700",
  },
}

type No = { label: string; icone: React.ReactNode; cor: Cor; nota?: string }

function Seta({ cor, atraso }: { cor: Cor; atraso: number }) {
  const c = CORES[cor]
  return (
    <div className="flex min-w-[28px] flex-1 items-center" aria-hidden="true">
      {/* A luz corre pela própria linha (background-position), sem animar layout. */}
      <div
        className={`gg-flow-line h-[3px] w-full rounded-full ${c.linha}`}
        style={{ ["--gg-flow-color" as string]: c.luz, animationDelay: `${atraso}ms` }}
      />
      <div
        className={`h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent ${c.texto}`}
        style={{ borderLeftColor: "currentColor" }}
      />
    </div>
  )
}

function NoCaixa({ no }: { no: No }) {
  const c = CORES[no.cor]
  return (
    <div className={`flex shrink-0 flex-col items-center gap-0.5 rounded-lg border px-2.5 py-1.5 ${c.no}`}>
      <div className="flex items-center gap-1.5">
        <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{no.icone}</span>
        <span className="whitespace-nowrap text-[11px] font-bold">{no.label}</span>
      </div>
      {no.nota && <span className="whitespace-nowrap text-[9px] opacity-70">{no.nota}</span>}
    </div>
  )
}

function Trilha({ titulo, nos, cor }: { titulo: string; nos: No[]; cor: Cor }) {
  return (
    <div>
      <div className={`mb-1.5 text-[10px] font-bold uppercase tracking-wide ${CORES[cor].texto}`}>{titulo}</div>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {nos.map((no, i) => (
          <div key={no.label + i} className="flex min-w-0 flex-1 items-center gap-1.5">
            <NoCaixa no={no} />
            {i < nos.length - 1 && <Seta cor={cor} atraso={i * 400} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export function FlowDiagram({
  principal,
  reservas,
  relayLigado,
  relayViaPainel,
  temChave,
}: {
  /** Rótulo do gateway que processa agora. */
  principal: string
  /** Rótulos dos gateways de reserva, na ordem. */
  reservas: string[]
  relayLigado: boolean
  /** Gateway cuja URL de webhook é cadastrada no painel dele (Medusa v2). */
  relayViaPainel: boolean
  temChave: boolean
}) {
  const ida: No[] = [
    { label: "Cliente", icone: <User />, cor: "ambar", nota: "clica em pagar" },
    { label: "Sua loja", icone: <Store />, cor: "ambar", nota: "pede a cobrança" },
    { label: principal, icone: <Zap />, cor: "ambar", nota: "gera o PIX" },
    { label: "QR na tela", icone: <QrCode />, cor: "ambar", nota: "cliente paga" },
  ]

  const volta: No[] = [
    { label: principal, icone: <Zap />, cor: "verde", nota: "recebeu o dinheiro" },
    ...(relayLigado
      ? [{ label: "Relay", icone: <Waypoints />, cor: "roxo" as Cor, nota: "esconde seu domínio" }]
      : []),
    { label: "Sua loja", icone: <Store />, cor: "verde", nota: "confere no gateway" },
    { label: "Pedido pago", icone: <CheckCircle2 />, cor: "verde", nota: "e-mail + rastreio" },
  ]

  return (
    <div className="mt-3 rounded-lg border border-border bg-background p-3">
      <div className="mb-2.5 text-xs font-bold text-foreground">Por onde o pagamento passa hoje</div>

      <div className="space-y-3">
        <Trilha titulo="1. Gerar o PIX" nos={ida} cor="ambar" />
        <Trilha titulo="2. Aviso de que pagou" nos={volta} cor={relayLigado ? "roxo" : "verde"} />
      </div>

      {/* Fallback: só aparece quando existe reserva de verdade. */}
      {reservas.length > 0 && (
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-muted/60 p-2">
          <ArrowDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Se a <strong className="text-foreground">{principal}</strong> não responder, a{" "}
            <strong className="text-foreground">{reservas[0]}</strong> assume no mesmo clique
            {reservas[1] ? ` (e a ${reservas[1]} depois dela)` : ""} — o cliente continua na mesma tela, sem ver
            erro.
          </p>
        </div>
      )}

      {!temChave && (
        <p className="mt-2 flex items-start gap-1.5 text-[11px] text-amber-700">
          <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          A {principal} está no topo mas <strong>sem chave no ambiente</strong> — na prática ela é pulada.
        </p>
      )}

      {relayLigado && relayViaPainel && (
        <p className="mt-2 flex items-start gap-1.5 text-[11px] text-amber-700">
          <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          A {principal} só avisa o relay se você tiver cadastrado a URL no painel dela — ela não aceita a URL no
          pedido de cobrança.
        </p>
      )}
    </div>
  )
}
