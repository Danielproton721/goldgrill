import { Header } from "@/components/store/header"
import { Footer } from "@/components/store/footer"

export const metadata = {
  title: "Sobre Nós | Gold Grill",
  description: "Conheça a Gold Grill e o cuidado por trás de cada produto de churrasco.",
}

export default function SobreNosPage() {
  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Header />
      <div className="h-14" />

      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b98a2e]">
            A Loja
          </p>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#1a1a1a] md:text-4xl">
            Sobre Nós
          </h1>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[#525252] md:text-base">
            <p>
              A Gold Grill nasceu para reunir tudo que o seu churrasco precisa em
              um só lugar — churrasqueiras, facas, tábuas, espetos, grelhas e kits
              de presente com acabamento premium.
            </p>
            <p>
              Selecionamos cada peça pensando em durabilidade e acabamento, pra
              quem leva a brasa a sério. Nossas coleções são organizadas pra
              facilitar a escolha do que combina com o seu estilo de churrasco.
            </p>
            <p>
              Nosso compromisso é oferecer uma experiência de compra simples,
              segura e transparente, desde a escolha do produto até a entrega.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
