import { Header } from "@/components/store/header"

export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Header />
      <div className="h-14" />

      <div className="animate-pulse">
        {/* Gallery skeleton */}
        <div className="aspect-square bg-[#f0f0f0]" />
        <div className="flex justify-center gap-2 py-3">
          <div className="w-8 h-3 bg-[#e5e5e5] rounded" />
        </div>

        {/* Divider */}
        <div className="h-2 bg-[#f5f5f5]" />

        {/* Product info skeleton */}
        <div className="px-4 py-4">
          <div className="h-5 w-3/4 bg-[#e5e5e5] rounded" />
          <div className="h-5 w-1/2 bg-[#e5e5e5] rounded mt-2" />

          <div className="flex items-center gap-1.5 mt-3">
            <div className="w-4 h-4 bg-[#e5e5e5] rounded-full" />
            <div className="h-3 w-44 bg-[#e5e5e5] rounded" />
          </div>

          <div className="flex gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-[#e5e5e5] rounded" />
            ))}
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <div className="h-7 w-28 bg-[#e5e5e5] rounded" />
            <div className="h-4 w-8 bg-[#f0f0f0] rounded" />
          </div>

          <div className="flex items-center gap-1.5 mt-4">
            <div className="w-4 h-4 bg-[#e5e5e5] rounded-full" />
            <div className="h-3 w-56 bg-[#e5e5e5] rounded" />
          </div>
        </div>

        {/* Quantity skeleton */}
        <div className="px-4 py-4">
          <div className="h-4 w-24 bg-[#e5e5e5] rounded" />
          <div className="flex items-center gap-0 mt-2">
            <div className="w-10 h-10 bg-[#e5e5e5] rounded-l-lg" />
            <div className="w-12 h-10 bg-[#f0f0f0]" />
            <div className="w-10 h-10 bg-[#e5e5e5] rounded-r-lg" />
          </div>
        </div>

        {/* Shipping skeleton */}
        <div className="px-4 py-4">
          <div className="h-4 w-28 bg-[#e5e5e5] rounded mb-2" />
          <div className="flex gap-2">
            <div className="h-11 flex-1 bg-[#f0f0f0] rounded-lg" />
            <div className="h-11 w-28 bg-[#e5e5e5] rounded-lg" />
          </div>
        </div>

        {/* Accordion skeleton */}
        <div className="h-2 bg-[#f5f5f5]" />
        <div className="px-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="py-4 border-b border-[#f0f0f0]">
              <div className="h-4 w-40 bg-[#e5e5e5] rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Sticky CTA skeleton */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#ffffff] border-t border-[#f0f0f0] px-4 py-3">
        <div className="h-12 bg-[#e5e5e5] rounded-full animate-pulse" />
      </div>
    </main>
  )
}
