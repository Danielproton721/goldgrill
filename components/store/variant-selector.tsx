"use client"

import type { ProductVariant } from "@/lib/products"

interface VariantSelectorProps {
  label: string
  variants: ProductVariant[]
  selectedId: number
  onSelect: (variant: ProductVariant) => void
}

export function VariantSelector({
  label,
  variants,
  selectedId,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="px-4 py-3 bg-[#ffffff]">
      <p className="text-sm font-medium text-[#1a1a1a] mb-2.5">
        {label}:{" "}
        <span className="font-normal text-[#737373]">
          {variants.find((v) => v.id === selectedId)?.label}
        </span>
      </p>

      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedId
          const isAvailable = variant.available
          const discount = variant.compareAtPrice && variant.compareAtPrice > variant.price
            ? Math.round(((variant.compareAtPrice - variant.price) / variant.compareAtPrice) * 100)
            : 0

          return (
            <button
              key={variant.id}
              onClick={() => isAvailable && onSelect(variant)}
              disabled={!isAvailable}
              className={`relative px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-150 ${
                isSelected
                  ? "border-[#1a1a1a] bg-[#1a1a1a] text-[#ffffff] shadow-sm"
                  : isAvailable
                    ? "border-[#e5e5e5] bg-[#ffffff] text-[#1a1a1a] hover:border-[#1a1a1a]"
                    : "border-[#e5e5e5] bg-[#f5f5f5] text-[#d1d5db] cursor-not-allowed"
              }`}
            >
              {variant.label}

              {/* Strikethrough line for unavailable */}
              {!isAvailable && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-full h-px bg-[#d1d5db] rotate-[-12deg]" />
                </span>
              )}

              {/* Discount badge */}
              {isAvailable && discount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#b98a2e] text-[#ffffff] text-[8px] font-bold px-1 py-px rounded-full leading-tight">
                  -{discount}%
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
