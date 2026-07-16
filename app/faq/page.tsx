import { Header } from "@/components/store/header"
import { Footer } from "@/components/store/footer"

export const metadata = {
  title: "FAQ | Gold Grill",
  description: "Perguntas frequentes sobre compras, entrega e atendimento na Gold Grill.",
}

const questions = [
  {
    question: "Como acompanho meu pedido?",
    answer:
      "Após a confirmação do pagamento, você recebe as atualizações do pedido pelo e-mail cadastrado na compra.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Aceitamos Pix e cartões de crédito conforme as opções exibidas no checkout.",
  },
  {
    question: "Os produtos têm garantia?",
    answer:
      "Sim. Em caso de defeito de fabricação ou problema no recebimento, entre em contato com nosso atendimento para avaliação.",
  },
  {
    question: "Posso trocar um produto?",
    answer:
      "Sim. As solicitações de troca seguem os prazos e condições informados na página de Trocas e Devoluções.",
  },
]

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Header />
      <div className="h-14" />

      <section className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b98a2e]">
          Ajuda
        </p>
        <h1 className="mt-3 text-2xl font-bold leading-tight text-[#1a1a1a] md:text-4xl">
          FAQ
        </h1>

        <div className="mt-7 divide-y divide-[#e5e5e5] border-y border-[#e5e5e5]">
          {questions.map((item) => (
            <div key={item.question} className="py-5">
              <h2 className="text-base font-bold text-[#1a1a1a]">
                {item.question}
              </h2>
              <p className="mt-2 text-sm leading-7 text-[#525252]">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
