import Link from "next/link"
import { Header } from "@/components/store/header"
import { AnnouncementBar } from "@/components/store/announcement-bar"
import { Hero } from "@/components/store/hero"
import { CollectionBubbleMenu } from "@/components/store/collection-bubble-menu"
import { ProductSection } from "@/components/store/product-section"
import { Footer } from "@/components/store/footer"
import { TrustStrip } from "@/components/store/trust-strip"
import { getProductsByCategory, type Product } from "@/lib/products"
import { applyOverlay } from "@/lib/catalog-runtime"
import { sortKitsBrandLast } from "@/lib/kit-order"

const homeProductLimit = 8

const variantWords = new Set([
  "areia",
  "azul",
  "bambu",
  "bege",
  "beige",
  "blush",
  "branco",
  "branca",
  "brown",
  "caqui",
  "chumbo",
  "cinza",
  "claro",
  "dublin",
  "escuro",
  "fendi",
  "fend",
  "grafite",
  "green",
  "grey",
  "marfim",
  "marinho",
  "marsala",
  "mostarda",
  "neve",
  "nevoa",
  "nude",
  "off",
  "olive",
  "palha",
  "perola",
  "petroleo",
  "prata",
  "rosa",
  "ros",
  "rose",
  "rosas",
  "sage",
  "stone",
  "taupe",
  "tofu",
  "verde",
  "vinho",
  "white",
])

function normalizeProductName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&amp;/g, " e ")
    .replace(/[™®]/g, "")
    .replace(/\b\d+(?:[,.]\d+)?\s*x\s*\d+(?:[,.]\d+)?(?:\s*x\s*\d+(?:[,.]\d+)?)?\s*(?:cm|m)?\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

function getProductFamilyKey(product: Product) {
  const words = normalizeProductName(product.name).split(" ").filter(Boolean)

  while (words.length > 0 && variantWords.has(words[words.length - 1])) {
    words.pop()
  }

  return words.join(" ")
}

function getHomeProducts(products: Product[]) {
  const families = new Set<string>()
  const uniqueProducts: Product[] = []
  const repeatedProducts: Product[] = []

  for (const product of products) {
    const familyKey = getProductFamilyKey(product)

    if (!families.has(familyKey)) {
      families.add(familyKey)
      uniqueProducts.push(product)
    } else {
      repeatedProducts.push(product)
    }

    if (uniqueProducts.length >= homeProductLimit) break
  }

  return [...uniqueProducts, ...repeatedProducts].slice(0, homeProductLimit)
}

export default async function Home() {
  const kitsPresenteProducts = getHomeProducts(sortKitsBrandLast(await applyOverlay(getProductsByCategory("Kits de Presente"))))
  const churrasqueirasProducts = getHomeProducts(await applyOverlay(getProductsByCategory("Churrasqueiras")))
  const facasProducts = getHomeProducts(await applyOverlay(getProductsByCategory("Facas")))
  const espetosProducts = getHomeProducts(await applyOverlay(getProductsByCategory("Espetos e Discos")))

  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Header />

      {/* Spacer for fixed header (altura real do header = 71px) */}
      <div className="h-[72px]" />

      <AnnouncementBar />

      <Hero />

      <TrustStrip />

      <CollectionBubbleMenu />

      <ProductSection
        title="Presentes de Dia dos Pais"
        products={kitsPresenteProducts}
        collectionHref="/colecoes/kits-de-presente"
      />


      {/* Banner sertanejo (statement de marca) — leva pro catálogo completo */}
      <Link href="/produtos" className="block w-full">
        <img
          src="/images/banner-promo.png"
          alt="Tradição do campo — o sabor que vem da brasa"
          className="w-full object-cover"
          style={{ maxHeight: "300px" }}
        />
      </Link>

      <ProductSection
        title="Churrasqueiras"
        products={churrasqueirasProducts}
        collectionHref="/colecoes/churrasqueiras"
      />

      <ProductSection
        title="Facas"
        products={facasProducts}
        bgClass="bg-surface-warm"
        collectionHref="/colecoes/facas"
      />

      {/* Banner linha inox — leva pras churrasqueiras */}
      <Link href="/colecoes/churrasqueiras" className="block w-full">
        <img
          src="/images/banner-promo-2.png"
          alt="Linha inox profissional — feita pra durar gerações"
          className="w-full object-cover"
          style={{ maxHeight: "300px" }}
        />
      </Link>

      <ProductSection
        title="Espetos e Discos"
        products={espetosProducts}
        bgClass="bg-[#ffffff]"
        collectionHref="/colecoes/espetos-e-discos"
      />

      <section className="bg-[#ffffff] px-4 py-10 md:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#f5f0e8] md:aspect-[21/9]">
            <img
              src="/images/fachadaia.png"
              alt="Nossa loja de churrasco"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mx-auto max-w-2xl px-2 pt-7 text-center md:pt-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b98a2e]">
              Sobre nós
            </p>
            <h2 className="mt-3 font-serif text-[28px] font-medium leading-tight tracking-tight text-[#1a1a1a] md:text-[42px]">
              Tudo para o seu churrasco perfeito
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#5f5f5f] md:text-base">
              Reunimos o melhor do churrasco em um só lugar: churrasqueiras,
              facas, espetos, grelhas, tábuas e kits de presente com acabamento
              premium em aço inox. Produtos selecionados para quem leva a brasa a
              sério — e para presentear quem ama um bom churrasco.
            </p>
            <Link
              href="/sobre-nos"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#1a1a1a] px-7 text-xs font-bold uppercase tracking-wide text-[#ffffff] transition-colors hover:bg-[#333333]"
            >
              Conhecer a loja
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
