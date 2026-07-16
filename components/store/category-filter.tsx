"use client"

interface CategoryFilterProps {
  categories: string[]
  active: string
  onChange: (category: string) => void
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`
            shrink-0 px-4 py-2 rounded-full text-xs font-medium border transition-all duration-150
            ${
              active === category
                ? "bg-[#1a1a1a] text-[#ffffff] border-[#1a1a1a]"
                : "bg-[#ffffff] text-[#1a1a1a] border-[#e5e5e5] hover:border-[#1a1a1a]/30"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
