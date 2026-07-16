import Link from "next/link"
import { Header } from "@/components/store/header"
import { Footer } from "@/components/store/footer"
import { PackageX } from "lucide-react"

export default function ProductNotFound() {
  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Header />
      <div className="h-14" />

      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#f5f5f5] flex items-center justify-center mb-4">
          <PackageX size={28} className="text-[#737373]" />
        </div>
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-2">
          Produto não encontrado
        </h1>
        <p className="text-sm text-[#737373] mb-6 max-w-xs">
          O produto que você está procurando não existe ou foi removido.
        </p>
        <Link
          href="/"
          className="bg-[#1a1a1a] text-[#ffffff] text-sm font-semibold px-8 py-3 rounded-full hover:bg-[#1a1a1a]/85 transition-all"
        >
          Voltar para a loja
        </Link>
      </div>

      <Footer />
    </main>
  )
}
