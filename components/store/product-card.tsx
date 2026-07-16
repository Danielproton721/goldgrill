"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Heart, Star, Check, ShoppingCart, Zap } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
  name: string
  price: number
  compareAtPrice?: number
  image: string
  rating: number
  reviews: number
  slug?: string
  isTest?: boolean
}

const brl = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`

export function ProductCard({ name, price, compareAtPrice, image, rating, reviews, slug, isTest }: ProductCardProps) {
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const productHref = slug ? `/product/${slug}` : "#"

  const hasDiscount = !!compareAtPrice && compareAtPrice > price
  const discountPct = hasDiscount ? Math.round((1 - price / (compareAtPrice as number)) * 100) : 0
  const economia = hasDiscount ? (compareAtPrice as number) - price : 0
  // Parcelamento padrão do varejo BR: até 12x. O cliente decide pela parcela.
  const parcela = price / 12

  const handleAddToCart = useCallback(() => {
    const itemId = slug
      ? slug.split("").reduce((acc, ch) => ((acc << 5) - acc + ch.charCodeAt(0)) | 0, 0)
      : Math.floor(Math.random() * 100000)
    addItem({
      id: Math.abs(itemId),
      slug: slug || "",
      name,
      price,
      compareAtPrice,
      image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }, [addItem, slug, name, price, compareAtPrice, image])

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
      {/* Image area */}
      <div className="relative aspect-square bg-[#f7f4ef] p-3">
        {/* Selo de desconto — gatilho de urgência */}
        {hasDiscount && (
          <span className="gold-flow absolute left-2 top-2 z-10 flex items-center gap-0.5 rounded-full px-2 py-1 text-[11px] font-black text-[#1a1a1a] shadow-md shadow-[#c8871a]/40">
            <Zap size={11} className="fill-[#1a1a1a]" />
            {discountPct}% OFF
          </span>
        )}
        {isTest && (
          <span className="absolute left-2 top-11 z-10 rounded bg-[#1a1a1a] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
            Teste
          </span>
        )}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1.5 backdrop-blur transition-colors hover:bg-white"
          aria-label={liked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            size={18}
            className={liked ? "fill-red-500 text-red-500" : "text-[#737373] hover:text-[#1a1a1a]"}
          />
        </button>
        <Link href={productHref} prefetch={true} className="relative block h-full w-full">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
      </div>

      {/* Info area */}
      <div className="flex flex-grow flex-col p-3">
        <Link href={productHref} prefetch={true}>
          <h3 className="line-clamp-2 min-h-[2rem] text-xs font-semibold leading-tight text-[#1a1a1a] transition-colors hover:text-[#b98a2e]">
            {name}
          </h3>
        </Link>

        {/* Star rating + prova social */}
        <div className="mb-auto mt-1.5 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.round(rating) ? "fill-[#f5b400] text-[#f5b400]" : "fill-[#e5e5e5] text-[#e5e5e5]"}
            />
          ))}
          <span className="ml-1 text-[10px] font-medium text-[#737373]">
            {rating.toFixed(1)} ({reviews})
          </span>
        </div>

        {/* Price block — gatilhos: de/por, parcela, economia */}
        <div className="mt-2">
          {hasDiscount ? (
            <p className="mb-0.5 text-[11px] font-medium leading-none text-[#a3a3a3] line-through">
              de {brl(compareAtPrice as number)}
            </p>
          ) : (
            <div className="mb-0.5 h-[11px]" />
          )}
          <div className="flex items-end gap-1.5">
            <p className="text-xl font-black leading-none text-emerald-600">{brl(price)}</p>
            <span className="pb-0.5 text-[10px] font-bold text-emerald-700">à vista</span>
          </div>
          <p className="mt-1 text-[11px] font-medium text-[#5f5f5f]">
            ou <span className="font-bold text-[#1a1a1a]">12x</span> de {brl(parcela)}
          </p>
          {economia > 0 && (
            <span className="mt-1.5 inline-block rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
              Economize {brl(economia)}
            </span>
          )}
        </div>

        {/* CTA chamativo */}
        <button
          onClick={handleAddToCart}
          className={`mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-extrabold uppercase tracking-wide transition-all duration-200 active:scale-95 ${
            added
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
              : "bg-gradient-to-r from-[#f8cc46] to-[#eaa50c] text-[#1a1a1a] shadow-lg shadow-[#eaa50c]/40 hover:brightness-105 hover:shadow-[#eaa50c]/60"
          }`}
        >
          {added ? (
            <>
              <Check size={15} />
              Adicionado!
            </>
          ) : (
            <>
              <ShoppingCart size={15} />
              Comprar
            </>
          )}
        </button>
      </div>
    </div>
  )
}
