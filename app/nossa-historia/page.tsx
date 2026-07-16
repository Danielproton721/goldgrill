import { Header } from "@/components/store/header"
import { Footer } from "@/components/store/footer"

export const metadata = {
  title: "Nossa História | Gold Grill",
  description: "Conheça a história da Gold Grill.",
}

export default function NossaHistoriaPage() {
  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Header />
      <div className="h-14" />

      <section className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b98a2e]">
          A Loja
        </p>
        <h1 className="mt-3 text-2xl font-bold leading-tight text-[#1a1a1a] md:text-4xl">
          Nossa História
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-7 text-[#525252] md:text-base">
          <p>
            A Gold Grill foi criada com uma ideia simples: transformar a escolha de
            a compra de artigos de churrasco em uma experiência mais clara, inspiradora e confiável.
          </p>
          <p>
            Começamos reunindo produtos essenciais para quartos, banheiros e áreas
            de descanso, sempre buscando peças que entreguem conforto, beleza e boa
            apresentação.
          </p>
          <p>
            Hoje seguimos ampliando nossas coleções com foco em praticidade,
            atendimento cuidadoso e produtos que deixam a casa mais agradável em
            todos os detalhes.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
