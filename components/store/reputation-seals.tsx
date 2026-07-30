// Selo de segurança da loja em caixa ESCURA (o fundo do rodapé é escuro; no
// checkout o mesmo bloco aparece sobre fundo claro).
// Só "Loja Protegida": o RA1000 e o logo do Reclame Aqui saíram em 30/07/2026 —
// o CNPJ da loja foi aberto em 20/05/2026 e não tem reputação no Reclame Aqui,
// então exibir o selo era claim falso (CDC art. 37) + uso de marca de terceiro.
// object-contain + w-auto garantem que a arte não estica/deforma.
const BOX = "flex items-center justify-center rounded-xl border border-white/10 bg-[#232323] px-3 py-4"

export function ReputationSeals({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className={BOX}>
        <img
          src="/selos/loja-protegida.png"
          alt="Loja Protegida — Compra 100% Segura"
          width={276}
          height={60}
          className="h-auto max-h-10 w-auto max-w-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  )
}
