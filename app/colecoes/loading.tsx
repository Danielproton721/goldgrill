import { Header } from "@/components/store/header"

export default function CollecoesLoading() {
  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Header />
      <div className="h-14" />

      <div className="animate-pulse px-4 py-8">
        <div className="h-6 w-48 bg-[#e5e5e5] rounded mx-auto" />
        <div className="h-4 w-64 bg-[#f0f0f0] rounded mx-auto mt-2" />

        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="col-span-2 h-44 bg-[#f0f0f0] rounded-2xl" />
          <div className="h-36 bg-[#f0f0f0] rounded-2xl" />
          <div className="h-36 bg-[#f0f0f0] rounded-2xl" />
          <div className="h-36 bg-[#f0f0f0] rounded-2xl" />
          <div className="h-36 bg-[#f0f0f0] rounded-2xl" />
        </div>
      </div>
    </main>
  )
}
