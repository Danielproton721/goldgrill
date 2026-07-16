"use client"

import { useState, useCallback, useRef, useEffect, useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Menu, Search, ShoppingBag, Home, X, Grid3X3, Tag, ChevronDown, Truck } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useMenu } from "@/lib/menu-context"
import { collections } from "@/lib/collections"

// Item do \u00edndice magro servido por /api/search-index. O header N\u00c3O importa
// mais o cat\u00e1logo inteiro (lib/products) \u2014 isso colocava ~345KB no bundle
// client de todas as p\u00e1ginas; o \u00edndice \u00e9 baixado quando a busca abre.
interface SearchIndexItem {
  id: number
  slug: string
  name: string
  category: string
  image: string
  price: number
  tags?: string[]
}

let searchIndexCache: SearchIndexItem[] | null = null

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

function productSearchText(product: SearchIndexItem) {
  return normalizeSearchValue(
    [product.name, product.category, ...(product.tags ?? [])].join(" ")
  )
}

const preferredCollectionOrder = [
  "novidades",
  "mais-vendidos",
  "jogos-de-lencol",
  "colchas-e-cobre-leito",
  "toalhas",
  "edredons",
  "kit-cama-posta-queen",
  "kit-cama-posta-king",
  "roupas-de-cama-365",
  "cortinas",
  "decoracoes",
  "diversos",
]

const hiddenMenuCollectionSlugs = new Set(["kit-cama-posta"])

const menuCollections = collections
  .filter((collection) => !hiddenMenuCollectionSlugs.has(collection.slug))
  .sort((a, b) => {
    const aIndex = preferredCollectionOrder.indexOf(a.slug)
    const bIndex = preferredCollectionOrder.indexOf(b.slug)

    if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name)
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })

export function Header() {
  const { isOpen: menuOpen, open: openMenu, close: closeMenuCtx } = useMenu()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchIndex, setSearchIndex] = useState<SearchIndexItem[] | null>(searchIndexCache)
  const [collectionsOpen, setCollectionsOpen] = useState(true)
  const [headerVisible, setHeaderVisible] = useState(true)
  const { totalItems, toggleCart } = useCart()
  const pathname = usePathname()
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const lastScrollY = useRef(0)

  // Oculta header ao scrollar para baixo, mostra ao scrollar para cima
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current && currentY > 80) {
        setHeaderVisible(false)
      } else {
        setHeaderVisible(true)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMenu = useCallback(() => {
    closeMenuCtx()
  }, [closeMenuCtx])

  const closeSearch = useCallback(() => {
    setSearchOpen(false)
    setSearchQuery("")
  }, [])

  // Baixa o índice na primeira abertura da busca (e guarda em módulo pra não
  // rebaixar em navegações seguintes).
  useEffect(() => {
    if (!searchOpen || searchIndex) return
    let cancelled = false
    fetch("/api/search-index")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: SearchIndexItem[]) => {
        if (cancelled) return
        searchIndexCache = Array.isArray(data) ? data : []
        setSearchIndex(searchIndexCache)
      })
      .catch(() => {
        if (!cancelled) setSearchIndex([])
      })
    return () => {
      cancelled = true
    }
  }, [searchOpen, searchIndex])

  const normalizedSearchQuery = normalizeSearchValue(searchQuery)

  const searchResults = useMemo(() => {
    if (normalizedSearchQuery.length < 2 || !searchIndex) return []

    const searchTerms = normalizedSearchQuery.split(/\s+/).filter(Boolean)

    return searchIndex
      .filter((product) => {
        const indexedText = productSearchText(product)
        return searchTerms.every((term) => indexedText.includes(term))
      })
      .slice(0, 8)
  }, [normalizedSearchQuery, searchIndex])

  const handleSelectProduct = (slug: string) => {
    closeSearch()
    router.push(`/product/${slug}`)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchResults.length > 0) {
      handleSelectProduct(searchResults[0].slug)
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-transform duration-300 ${headerVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="relative flex h-[70px] items-center justify-between px-4 py-3">
          <button
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
            className="p-2 text-[#1a1a1a] hover:opacity-70 transition-opacity"
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="absolute left-1/2 top-1/2 text-center -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="inline-block">
              <img src="/images/logo-gold-grill-h.png" alt="Gold Grill" className="h-9 mx-auto object-contain" />
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <Link
              href="/rastreio-de-pedido"
              className="hidden min-[420px]:inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#f8cc46] to-[#eaa50c] px-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#1a1a1a] shadow-md shadow-[#eaa50c]/30 transition-all hover:brightness-105"
              aria-label="Rastrear pedido"
            >
              <Truck size={15} />
              <span className="hidden sm:inline">Rastreio</span>
            </Link>
            <button
              onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
              className="p-2 text-[#1a1a1a] hover:opacity-70 transition-opacity"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>
            <button
              onClick={toggleCart}
              className="p-2 text-[#1a1a1a] hover:opacity-70 transition-opacity relative"
              aria-label="Carrinho"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#b98a2e] text-white text-[10px] font-bold min-w-[16px] h-4 px-0.5 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="px-4 pb-3 relative">
            <form onSubmit={handleSearchSubmit}>
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5">
                <Search size={16} className="text-gray-400 mr-2 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="bg-transparent w-full text-sm text-gray-800 placeholder:text-gray-400 outline-none"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </form>

            {/* Resultados da busca */}
            {searchQuery.trim().length >= 2 && (
              <div className="absolute left-4 right-4 top-full mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[60] max-h-[60vh] overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-b-0"
                    >
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg shrink-0 bg-gray-100"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">{product.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#b98a2e] font-bold">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </span>
                          <span className="text-[10px] text-gray-400">{product.category}</span>
                        </div>
                      </div>
                    </button>
                  ))
                ) : searchIndex === null ? (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-gray-400 font-medium">Carregando produtos…</p>
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-gray-400 font-medium">Nenhum produto encontrado</p>
                    <p className="text-xs text-gray-300 mt-1">Tente buscar por outro termo</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Overlay para fechar busca ao clicar fora */}
      {searchOpen && searchQuery.trim().length >= 2 && (
        <div className="fixed inset-0 z-40 bg-black/20" onClick={closeSearch} />
      )}

      {/* Mobile slide menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-[#1a1a1a]/40" onClick={closeMenu} />
          <nav className="absolute top-0 left-0 bottom-0 w-72 bg-[#ffffff] shadow-2xl pt-20 px-5 animate-in slide-in-from-left duration-200 overflow-y-auto">
            <div className="flex flex-col gap-0.5">
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors text-sm font-medium"
              >
                <Home size={18} className="text-[#b98a2e]" />
                Inicio
              </Link>

              <Link
                href="/rastreio-de-pedido"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors text-sm font-medium"
              >
                <Truck size={18} className="text-[#b98a2e]" />
                Rastreio de Pedido
              </Link>

              <div>
                <button
                  onClick={() => setCollectionsOpen(!collectionsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors text-sm font-medium"
                >
                  <span className="flex items-center gap-3">
                    <Grid3X3 size={18} className="text-[#b98a2e]" />
                    Coleções
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#737373] transition-transform duration-200 ${collectionsOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-250 ease-in-out ${collectionsOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="ml-4 pl-4 border-l-2 border-[#b98a2e]/20 flex flex-col gap-0.5 py-1 overflow-y-auto">
                    <Link
                      href="/colecoes"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors text-[13px] font-medium"
                    >
                      <Grid3X3 size={15} className="text-[#b98a2e]" />
                      Ver Todas
                    </Link>
                    {menuCollections.map((collection) => (
                      <Link
                        key={collection.slug}
                        href={`/colecoes/${collection.slug}`}
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors text-[13px] font-medium"
                      >
                        <Tag size={15} className="text-[#b98a2e]" />
                        {collection.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
