"use client"

import { ProductCard } from "./product-card"

interface SimpleProduct {
  id: number
  name: string
  price: number
  compareAtPrice?: number
  image: string
  rating: number
  reviews: number
  slug: string
}

interface CollectionProductsProps {
  products: SimpleProduct[]
}

export function CollectionProducts({ products }: CollectionProductsProps) {
  return (
    <section className="px-4 py-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            image={product.image}
            rating={product.rating}
            reviews={product.reviews}
            slug={product.slug}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-[#737373]">Nenhum produto encontrado nesta coleção.</p>
        </div>
      )}
    </section>
  )
}
