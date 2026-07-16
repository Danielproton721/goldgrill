"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Collection } from "@/lib/products"

interface CollectionGridProps {
  collections: Collection[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  },
}

export function CollectionGrid({ collections }: CollectionGridProps) {
  return (
    <section className="px-4 py-6 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 gap-3"
      >
        {collections.map((collection, index) => {
          // First item spans full width
          const isFirst = index === 0
          return (
            <motion.div key={collection.slug} variants={itemVariants} className={isFirst ? "col-span-2" : ""}>
              <Link
                href={`/colecoes/${collection.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-[#f5f5f5] shadow-sm hover:shadow-md transition-all duration-200 block h-full"
              >
                {/* Image */}
                <div
                  className={`relative w-full overflow-hidden bg-[#e5e5e5] ${
                    isFirst ? "h-44" : "h-36"
                  }`}
                >
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent" />

                  {/* Product count badge */}
                  <span className="absolute top-2.5 right-2.5 bg-[#b98a2e] text-[#ffffff] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {collection.productCount} {collection.productCount === 1 ? "produto" : "produtos"}
                  </span>

                  {/* Name over the image */}
                  <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                    <h3
                      className={`font-bold text-[#ffffff] group-hover:text-[#b98a2e] transition-colors text-balance leading-tight ${
                        isFirst ? "text-base" : "text-sm"
                      }`}
                    >
                      {collection.name}
                    </h3>
                    {isFirst && (
                      <p className="text-[11px] text-[#ffffff]/80 leading-relaxed mt-1 line-clamp-2">
                        {collection.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

