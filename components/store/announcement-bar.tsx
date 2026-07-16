import { Truck, Gift, CreditCard, RefreshCw, ShieldCheck, Flame } from "lucide-react"

// Faixa de gatilhos rolando no topo — campanha Dia dos Pais (09/08) em 1º lugar.
const ITEMS = [
  { Icon: Gift, text: "🎁 ESPECIAL DIA DOS PAIS — ATÉ 80% OFF" },
  { Icon: Truck, text: "PEÇA HOJE E RECEBA ANTES DO DIA DOS PAIS" },
  { Icon: Flame, text: "FRETE GRÁTIS ACIMA DE R$199" },
  { Icon: CreditCard, text: "PARCELE EM ATÉ 12X" },
  { Icon: RefreshCw, text: "TROCA FÁCIL EM 30 DIAS" },
  { Icon: ShieldCheck, text: "COMPRA 100% SEGURA" },
]

function Sequence() {
  return (
    <>
      {ITEMS.map(({ Icon, text }) => (
        <span key={text} className="mx-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide">
          <Icon size={14} className="shrink-0" />
          {text}
          <span className="ml-6 opacity-50">•</span>
        </span>
      ))}
    </>
  )
}

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden gold-flow py-2 text-[#1a1a1a]">
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {/* Duas cópias em sequência = loop contínuo sem emenda */}
        <Sequence />
        <Sequence />
      </div>
    </div>
  )
}
