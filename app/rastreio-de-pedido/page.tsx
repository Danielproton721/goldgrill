import { Footer } from "@/components/store/footer"
import { Header } from "@/components/store/header"
import { TrackingSimulator } from "@/components/store/tracking-simulator"

export const metadata = {
  title: "Rastreio de Pedido | Gold Grill",
  description: "Acompanhe as informações de envio do seu pedido Gold Grill.",
}

export default function RastreioDePedidoPage() {
  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Header />
      <div className="h-14" />

      <TrackingSimulator />

      <Footer />
    </main>
  )
}
