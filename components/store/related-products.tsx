"use client"

import { ProductCard } from "./product-card"
import type { Product } from "@/lib/products"

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="py-6 bg-[#ffffff]">
      <h2 className="text-center text-lg font-bold text-[#1a1a1a] uppercase tracking-wide mb-5 px-4">
        Produtos Relacionados
      </h2>
      <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide pb-2">
        {products.map((product) => (
          <div key={product.id} className="min-w-[160px] max-w-[180px] shrink-0">
            <ProductCard
              name={product.name}
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              image={product.image}
              rating={product.rating}
              reviews={product.reviews}
              slug={product.slug}
              isTest={product.isTest}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
