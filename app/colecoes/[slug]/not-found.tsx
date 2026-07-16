import Link from "next/link"
import { Header } from "@/components/store/header"

export default function CollectionNotFound() {
  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Header />
      <div className="h-14" />

      <div className="flex flex-col items-center justify-center px-4 py-20">
        <p className="text-5xl font-bold text-[#e5e5e5]">404</p>
        <h1 className="text-lg font-bold text-[#1a1a1a] mt-4">
          Coleção não encontrada
        </h1>
        <p className="text-sm text-[#737373] mt-2 text-center">
          A coleção que você procura não existe ou foi removida.
        </p>
        <Link
          href="/colecoes"
          className="mt-6 bg-[#1a1a1a] text-[#ffffff] text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-[#1a1a1a]/85 transition-colors uppercase tracking-wider"
        >
          Ver Coleções
        </Link>
      </div>
    </main>
  )
}
