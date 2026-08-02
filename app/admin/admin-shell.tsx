"use client"

import { useState } from "react"
import {
  Package,
  ShoppingBag,
  Waypoints,
  KeyRound,
  Mail,
  MessageCircleQuestion,
  DatabaseZap,
  ShoppingBasket,
} from "lucide-react"
import type { AdminOrder } from "@/lib/orders"
import type { Catalog } from "@/lib/catalog"
import { LogoutButton } from "./logout-button"
import { OnlineCount } from "./online-count"
import { OrderBumpPanel } from "./order-bump-panel"
import { VisitorsHistory } from "./visitors-history"
import { OrdersPanel } from "./orders-panel"
import { ProductsPanel } from "./products-panel"
import { RelayPanel } from "./relay-panel"
import { SetupStatus } from "./setup-status"
import { EmailDiagPanel } from "./email-diag-panel"
import { ObjectionsPanel } from "./objections-panel"

type Modules = { orders: boolean; products: boolean; relay?: boolean }
type Tab = "orders" | "products" | "bump" | "objections" | "relay" | "email" | "keys"

export function AdminShell({
  brand,
  modules,
  columns,
  kvOk,
  blobOk,
  orders,
  catalog,
  pending,
  gatewaySwitch,
  banco,
  bancoRelay,
  kvFalhou,
}: {
  brand: string
  modules: Modules
  columns: Record<string, string>
  kvOk: boolean
  blobOk: boolean
  orders: AdminOrder[]
  catalog: Catalog
  pending: number
  gatewaySwitch?: React.ReactNode
  /** Nome do banco Upstash — aparece no card do contador de online. */
  banco?: string | null
  bancoRelay?: string | null
  /** Motivo da falha do banco nesta invocação (null = tudo bem). */
  kvFalhou?: string | null
}) {
  const tabs = [
    modules.orders ? ("orders" as const) : null,
    modules.products ? ("products" as const) : null,
    modules.products ? ("bump" as const) : null,
    "objections" as const,
    modules.relay ? ("relay" as const) : null,
    "email" as const,
    "keys" as const,
  ].filter(Boolean) as Tab[]

  const [tab, setTab] = useState<Tab>(tabs[0] ?? "orders")

  const pagos = orders.filter((o) => o.status === "pago").length
  const abandonados = orders.filter((o) => o.status === "abandonado").length

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-3 py-4 sm:px-4 sm:py-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Painel · {brand}</h1>
            {modules.orders && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {orders.length} pedido(s) · {pagos} pago(s) · {abandonados} abandonado(s)
              </p>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            {modules.orders && <OnlineCount banco={banco} bancoRelay={bancoRelay} />}
            <LogoutButton />
          </div>
        </div>

        {/* Banco fora do ar: antes isso derrubava o painel com tela de erro.
            Agora abre em modo degradado, avisando o que está acontecendo. */}
        {kvFalhou && (
          <div className="mb-5 rounded-xl border-2 border-red-300 bg-red-50 p-4">
            <div className="flex items-start gap-2">
              <DatabaseZap className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <div>
                <h2 className="text-sm font-bold text-red-800">
                  Banco de dados sem resposta — {kvFalhou}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-red-700">
                  O painel está mostrando o que conseguiu ler{banco ? ` do banco "${banco}"` : ""} — números e
                  listas podem estar vazios ou desatualizados, e <strong>o que você salvar agora pode não
                  gravar</strong>. A loja continua no ar, mas pedido novo corre risco de não ser registrado.
                </p>
                <p className="mt-1.5 text-xs text-red-700">
                  {kvFalhou === "limite do plano atingido"
                    ? "O plano do Upstash estourou o limite de comandos. Aumente o plano ou espere a virada do período."
                    : kvFalhou === "credencial recusada"
                      ? "O token do Upstash foi trocado ou revogado. Confira KV_REST_API_TOKEN na Vercel e faça Redeploy."
                      : "Veja o status do Upstash e recarregue em alguns minutos."}
                </p>
              </div>
            </div>
          </div>
        )}

        {modules.orders && <VisitorsHistory />}

        {gatewaySwitch}

        {tabs.length > 1 && (
          <div className="scrollbar-hide mb-5 flex w-full overflow-x-auto rounded-xl border border-border bg-card p-1 sm:inline-flex sm:w-auto">
            {modules.orders && (
              <TabButton active={tab === "orders"} onClick={() => setTab("orders")} icon={<ShoppingBag className="h-4 w-4" />}>
                Pedidos
              </TabButton>
            )}
            {modules.products && (
              <TabButton active={tab === "products"} onClick={() => setTab("products")} icon={<Package className="h-4 w-4" />}>
                Produtos
              </TabButton>
            )}
            {modules.products && (
              <TabButton
                active={tab === "bump"}
                onClick={() => setTab("bump")}
                icon={<ShoppingBasket className="h-4 w-4" />}
              >
                Order Bump
              </TabButton>
            )}
            <TabButton
              active={tab === "objections"}
              onClick={() => setTab("objections")}
              icon={<MessageCircleQuestion className="h-4 w-4" />}
            >
              Objeções
            </TabButton>
            {modules.relay && (
              <TabButton active={tab === "relay"} onClick={() => setTab("relay")} icon={<Waypoints className="h-4 w-4" />}>
                Relay
              </TabButton>
            )}
            <TabButton active={tab === "email"} onClick={() => setTab("email")} icon={<Mail className="h-4 w-4" />}>
              E-mail
            </TabButton>
            <TabButton active={tab === "keys"} onClick={() => setTab("keys")} icon={<KeyRound className="h-4 w-4" />}>
              Chaves
            </TabButton>
          </div>
        )}

        {tab === "orders" && modules.orders && <OrdersPanel orders={orders} kvOk={kvOk} />}
        {tab === "products" && modules.products && (
          <ProductsPanel initialCatalog={catalog} columns={columns} kvOk={kvOk} blobOk={blobOk} initialPending={pending} />
        )}
        {tab === "bump" && modules.products && <OrderBumpPanel />}
        {tab === "objections" && <ObjectionsPanel kvOk={kvOk} />}
        {tab === "relay" && modules.relay && <RelayPanel />}
        {tab === "email" && <EmailDiagPanel />}
        {tab === "keys" && <SetupStatus />}
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
      }`}
    >
      {icon}
      {children}
    </button>
  )
}
