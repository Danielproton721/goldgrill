import { adminConfig } from "@/admin.config"
import { adminConfigured, isAuthed } from "@/lib/admin-auth"
import { kvConfigured, listRecentOrders } from "@/lib/orders"
import { getMergedCatalog, pendingChangesCount } from "@/lib/catalog"
import {
  GATEWAYS,
  RELAY_IN_PATH,
  RELAY_VIA_PAINEL,
  WEBHOOK_PATH,
  gatewayConfigured,
  getGatewayConfig,
  type GatewayId,
} from "@/lib/gateways/active"
import { AdminLogin } from "./admin-login"
import { AdminShell } from "./admin-shell"
import { GatewaySwitch } from "./gateway-switch"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-2">
          <h1 className="text-lg font-bold text-foreground">Painel não configurado</h1>
          <p className="text-sm text-muted-foreground">
            Defina a variável <code className="font-mono">ADMIN_PASSWORD</code> no ambiente pra liberar o acesso.
          </p>
        </div>
      </div>
    )
  }

  if (!(await isAuthed())) {
    return <AdminLogin brand={adminConfig.brand} />
  }

  const kvOk = kvConfigured()
  const blobOk = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
  const orders = adminConfig.modules.orders ? await listRecentOrders(100) : []
  const catalog = adminConfig.modules.products ? await getMergedCatalog() : { headers: [], rows: [] }
  const pending = adminConfig.modules.products && kvOk ? await pendingChangesCount() : 0
  const gatewayConfig = await getGatewayConfig()
  const gatewayConfigured_ = Object.fromEntries(
    GATEWAYS.map((g) => [g.id, gatewayConfigured(g.id)])
  ) as Record<GatewayId, boolean>
  const gatewayLabels = Object.fromEntries(GATEWAYS.map((g) => [g.id, g.label])) as Record<GatewayId, string>

  return (
    <AdminShell
      brand={adminConfig.brand}
      modules={adminConfig.modules}
      columns={adminConfig.catalog.columns}
      kvOk={kvOk}
      blobOk={blobOk}
      orders={orders}
      catalog={catalog}
      pending={pending}
      gatewaySwitch={
        <GatewaySwitch
          initial={gatewayConfig}
          configured={gatewayConfigured_}
          labels={gatewayLabels}
          webhookPath={WEBHOOK_PATH}
          relayInPath={RELAY_IN_PATH}
          relayViaPainel={RELAY_VIA_PAINEL}
          appBaseUrl={(process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "")}
          relaySecretOk={Boolean(process.env.RELAY_SECRET)}
          kvOk={kvOk}
        />
      }
    />
  )
}
