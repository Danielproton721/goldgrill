import { Header } from "@/components/store/header"

export default function CollectionLoading() {
  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Header />
      <div className="h-14" />

      <div className="animate-pulse">
        {/* Hero skeleton */}
        <div className="h-48 bg-[#f0f0f0]" />

        {/* Products grid skeleton */}
        <div className="grid grid-cols-2 gap-3 px-4 py-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#f0f0f0] rounded-xl overflow-hidden">
              <div className="aspect-square bg-[#e5e5e5]" />
              <div className="p-3">
                <div className="h-3 w-3/4 bg-[#e5e5e5] rounded" />
                <div className="h-3 w-1/2 bg-[#e5e5e5] rounded mt-2" />
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="w-3 h-3 bg-[#e5e5e5] rounded" />
                  ))}
                </div>
                <div className="h-4 w-20 bg-[#e5e5e5] rounded mt-2" />
                <div className="h-9 w-full bg-[#e5e5e5] rounded-full mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
