import Link from "next/link"
import { collections, getProductsByCollection } from "@/lib/products"

// Melhores coleções primeiro (vêm pra frente no carrossel de bolinhas).
const preferredCollectionOrder = [
  "kits-de-presente",
  "churrasqueiras",
  "facas",
  "espetos-e-discos",
  "tabuas",
  "kits-gourmet",
  "grelhas",
  "garfos-e-garras",
  "forno-de-pizza-e-pas",
  "suportes-para-espeto",
  "acessorios-de-churrasco",
  "petisqueiras",
  "copos-e-termicos",
  "mesas-e-cadeiras",
  "churrasqueiras-a-gas",
  "churrasqueiras-eletricas",
  "churrasqueiras-portateis",
  "temperos-para-churrasco",
]

// Coleções fracas/residuais (1-2 itens ou duplicadas) escondidas do carrossel.
const hiddenCollectionSlugs = new Set([
  "acessorios",
  "forno-de-pizza",
  "cooktop",
  "depuradores",
  "chopeira",
  "produtos-de-limpeza",
  "souvenirs",
])

// Rótulos curtos pras bolinhas (senão usa o nome completo da coleção).
const collectionLabels: Record<string, string> = {
  "kits-de-presente": "Kits Presente",
  "espetos-e-discos": "Espetos",
  "forno-de-pizza-e-pas": "Forno Pizza",
  "suportes-para-espeto": "Suportes",
  "acessorios-de-churrasco": "Acessórios",
  "mesas-e-cadeiras": "Mesas",
  "churrasqueiras-a-gas": "A Gás",
  "churrasqueiras-eletricas": "Elétricas",
  "churrasqueiras-portateis": "Portáteis",
  "temperos-para-churrasco": "Temperos",
  "garfos-e-garras": "Garfos e Garras",
  "copos-e-termicos": "Copos",
}

function getOrderedCollections() {
  return collections
    .filter((collection) => !hiddenCollectionSlugs.has(collection.slug))
    .sort((a, b) => {
      const aIndex = preferredCollectionOrder.indexOf(a.slug)
      const bIndex = preferredCollectionOrder.indexOf(b.slug)

      if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name)
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })
}

export function CollectionBubbleMenu() {
  const items = getOrderedCollections().map((collection) => {
    const firstProduct = getProductsByCollection(collection.slug)[0]

    return {
      slug: collection.slug,
      label: collectionLabels[collection.slug] ?? collection.name,
      image: firstProduct?.image ?? collection.image,
    }
  })

  return (
    <nav
      aria-label="Coleções em destaque"
      className="border-b border-[#ece7df] bg-[#ffffff]"
    >
      <div className="collection-bubble-scroll flex gap-4 overflow-x-auto px-4 py-4 md:justify-center md:px-6">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/colecoes/${item.slug}`}
            className="group flex w-[76px] shrink-0 flex-col items-center gap-2 text-center outline-none"
          >
            <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#f7f3ed] ring-1 ring-[#eadfce] transition-transform duration-200 group-hover:-translate-y-0.5 group-focus-visible:ring-2 group-focus-visible:ring-[#b98a2e]">
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="line-clamp-2 min-h-[30px] text-[11px] font-semibold leading-[1.15] text-[#2b2b2b] transition-colors group-hover:text-[#1a1a1a]">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
