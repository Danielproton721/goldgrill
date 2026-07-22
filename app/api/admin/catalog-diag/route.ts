import { NextResponse } from "next/server"
import { isAuthed } from "@/lib/admin-auth"
import { OVERRIDES_KEY, DELETED_KEY } from "@/lib/catalog-keys"
import { applyOverlayOne } from "@/lib/catalog-runtime"
import { getProductBySlug } from "@/lib/products"

export const dynamic = "force-dynamic"

// Diagnóstico do overlay: compara o que o site enxerga (leitura direta, sem
// cache) com as env vars disponíveis em runtime. Serve pra descobrir por que
// uma edição do painel não aparece na página pública.
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
  }

  const URL_BASE = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "").replace(/\/$/, "")
  const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || ""

  const out: Record<string, unknown> = {
    hasUrl: Boolean(URL_BASE),
    hasToken: Boolean(TOKEN),
    urlHost: URL_BASE ? new URL(URL_BASE).host : null,
  }

  if (!URL_BASE || !TOKEN) return NextResponse.json(out)

  try {
    const res = await fetch(
      `${URL_BASE}/mget/${encodeURIComponent(OVERRIDES_KEY)}/${encodeURIComponent(DELETED_KEY)}`,
      { headers: { authorization: `Bearer ${TOKEN}` }, cache: "no-store" },
    )
    out.fetchStatus = res.status
    const data = (await res.json()) as { result?: (string | null)[] }
    const [ovRaw] = Array.isArray(data?.result) ? data.result : [null]
    const overrides = ovRaw ? JSON.parse(ovRaw) : {}
    out.overrideIds = Object.keys(overrides)
    out.kvDesc229 = overrides["229"]?.description?.slice(0, 120) ?? null
  } catch (e: any) {
    out.error = e?.message || String(e)
  }

  // Mesmo caminho que a página do produto usa (readOverlay com Data Cache):
  // se divergir do kvDesc229 acima, o cache é o culpado.
  try {
    const viaOverlay = await applyOverlayOne(getProductBySlug("produto-teste-pagamento"))
    out.pageDesc229 = viaOverlay?.description?.slice(0, 120) ?? null
  } catch (e: any) {
    out.overlayError = e?.message || String(e)
  }

  return NextResponse.json(out)
}
