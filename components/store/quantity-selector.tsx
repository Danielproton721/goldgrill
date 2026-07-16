"use client"

import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export function QuantitySelector({ quantity, onQuantityChange }: QuantitySelectorProps) {
  return (
    <div className="px-4 py-4 bg-[#ffffff]">
      <p className="text-sm font-medium text-[#1a1a1a] mb-2">Quantidade:</p>
      <div className="flex items-center gap-0">
        <button
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="w-10 h-10 flex items-center justify-center border border-[#e5e5e5] rounded-l-lg bg-[#f5f5f5] hover:bg-[#e5e5e5] transition-colors text-[#1a1a1a]"
          aria-label="Diminuir quantidade"
        >
          <Minus size={16} />
        </button>
        <div className="w-14 h-10 flex items-center justify-center border-t border-b border-[#e5e5e5] text-sm font-medium text-[#1a1a1a] bg-[#ffffff]">
          {quantity}
        </div>
        <button
          onClick={() => onQuantityChange(quantity + 1)}
          className="w-10 h-10 flex items-center justify-center border border-[#e5e5e5] rounded-r-lg bg-[#f5f5f5] hover:bg-[#e5e5e5] transition-colors text-[#1a1a1a]"
          aria-label="Aumentar quantidade"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}
