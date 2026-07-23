// Leitura/escrita das gavetas de quebra de objeção (conteúdo global da loja).
//
// Mesma estratégia do overlay de catálogo (lib/catalog-runtime.ts): o site lê
// via fetch cacheado com tag + TTL, e o painel chama revalidateObjections() ao
// salvar. O TTL é rede de segurança — sem ele, uma falha na invalidação por tag
// deixaria o conteúdo congelado (foi o bug que travava as edições de produto).

import "server-only"
import { revalidateTag } from "next/cache"
import { kvSetJSON } from "./kv-store"
import {
  DEFAULT_OBJECTIONS,
  OBJECTIONS_KEY,
  OBJECTIONS_TAG,
  normalizeObjections,
  type Objection,
} from "./objections-shared"

export { OBJECTIONS_TAG }
export type { Objection }

const URL_BASE = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "").replace(/\/$/, "")
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || ""

// Lida pelo site público. Sem KV (ou sem nada salvo) cai nos defaults, então a
// seção nunca aparece vazia.
export async function getObjections(): Promise<Objection[]> {
  if (!URL_BASE || !TOKEN) return DEFAULT_OBJECTIONS
  try {
    const res = await fetch(`${URL_BASE}/get/${encodeURIComponent(OBJECTIONS_KEY)}`, {
      headers: { authorization: `Bearer ${TOKEN}` },
      next: { revalidate: 60, tags: [OBJECTIONS_TAG] },
    })
    if (!res.ok) return DEFAULT_OBJECTIONS
    const data = (await res.json()) as { result?: string | null }
    if (!data?.result) return DEFAULT_OBJECTIONS
    const parsed = normalizeObjections(JSON.parse(data.result))
    // Lista salva vazia é intencional (o dono removeu tudo) → some a seção.
    return Array.isArray(parsed) ? parsed : DEFAULT_OBJECTIONS
  } catch {
    return DEFAULT_OBJECTIONS
  }
}

// Gravação pelo painel admin.
export async function saveObjections(input: unknown): Promise<Objection[]> {
  const clean = normalizeObjections(input)
  await kvSetJSON(OBJECTIONS_KEY, clean)
  return clean
}

// Invalida o cache do site pra a edição aparecer sem esperar o TTL.
export function revalidateObjections(): void {
  revalidateTag(OBJECTIONS_TAG)
}
