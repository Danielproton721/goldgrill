// ============================================================================
//  CATÁLOGO DE PRODUTOS (módulo Produtos do painel /admin)
//
//  Esta loja NÃO usa CSV — o catálogo é o array `products` em lib/products.ts.
//  O kit original era CSV-cêntrico; aqui ele foi adaptado pra esse array TS:
//
//   • BASE: o array `products` importado de @/lib/products (objetos Product
//     completos, com variants/images[]/reviews — campos ricos que NÃO se editam
//     na web mas são PRESERVADOS no export).
//   • OVERLAY (KV): edições e produtos novos ficam num overlay; remoções num
//     conjunto de ids deletados. A leitura mescla base + overlay por id.
//   • EXPORT: regenera o lib/products.ts substituindo SÓ o bloco do array
//     `products` (interfaces, collections e helpers ficam intactos) — você baixa,
//     commita e dá deploy; depois zera o overlay.
//
//  O painel edita só o subconjunto escalar de Product (EDITABLE_HEADERS). Tudo
//  degrada gracioso sem KV (vira somente-leitura).
// ============================================================================

import { promises as fs } from "fs"
import path from "path"
import { products, type Product } from "@/lib/products"
import { kvConfigured, kvGetJSON, kvSetJSON } from "./kv-store"
import { OVERRIDES_KEY, DELETED_KEY } from "./catalog-keys"

export type ProductRow = Record<string, string>
export type Catalog = { headers: string[]; rows: ProductRow[] }

// Campos escalares editáveis no painel (a ordem vira a ordem das colunas).
const EDITABLE_HEADERS = [
  "id",
  "name",
  "price",
  "compareAtPrice",
  "image",
  "category",
  "slug",
  "rating",
  "reviews",
  "description",
] as const

const PRODUCTS_PATH = "lib/products.ts"
const PRODUCTS_MARKER = "export const products: Product[] ="

// --- Conversões Product <-> ProductRow (strings pro painel) -----------------
// `images` viaja como JSON dentro do row (ProductRow é Record<string,string>).
// Não faz parte de EDITABLE_HEADERS (não vira coluna/input genérico) — o
// editor renderiza a galeria com um widget próprio (ver ProductsPanel).
function productToRow(p: Product): ProductRow {
  return {
    id: String(p.id),
    name: p.name ?? "",
    price: p.price != null ? String(p.price) : "",
    compareAtPrice: p.compareAtPrice != null ? String(p.compareAtPrice) : "",
    image: p.image ?? "",
    category: p.category ?? "",
    slug: p.slug ?? "",
    rating: p.rating != null ? String(p.rating) : "",
    reviews: p.reviews != null ? String(p.reviews) : "",
    description: p.description ?? "",
    images: JSON.stringify(p.images && p.images.length ? p.images : p.image ? [p.image] : []),
  }
}

// Converte um número digitado no painel, tolerando formato brasileiro:
//  "99,90" → 99.9 ; "1.299,90" → 1299.9 ; "199.90" → 199.9 ; "1299" → 1299.
// Retorna undefined se vazio ou inválido — NUNCA NaN (que viraria null no JSON
// e quebraria o site no price.toFixed()).
function parseNum(raw: string | undefined): number | undefined {
  if (raw === undefined) return undefined
  let s = String(raw).trim()
  if (s === "") return undefined
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".") // ponto = milhar, vírgula = decimal
  const n = Number(s)
  return Number.isFinite(n) ? n : undefined
}

// Lê a galeria enviada pelo editor (JSON em row.images). Retorna undefined se
// o campo não veio (edição feita por outro caminho que não a UI do painel).
function parseImages(raw: string | undefined): string[] | undefined {
  if (raw === undefined) return undefined
  try {
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return undefined
    return arr.map((u) => String(u).trim()).filter(Boolean)
  } catch {
    return undefined
  }
}

function rowToPartial(row: ProductRow): Partial<Product> {
  const out: Partial<Product> = {}
  if (row.name !== undefined) out.name = row.name
  if (row.image !== undefined) out.image = row.image
  if (row.category !== undefined) out.category = row.category
  if (row.slug !== undefined) out.slug = row.slug
  if (row.description !== undefined) out.description = row.description

  // A galeria manda no campo "image" (capa) — a 1ª foto da galeria sempre
  // vira a capa, pra cards/carrinho/header (que usam só product.image)
  // nunca ficarem dessincronizados do que aparece na PDP.
  const images = parseImages(row.images)
  if (images !== undefined) {
    out.images = images
    if (images.length) out.image = images[0]
  }

  const price = parseNum(row.price)
  if (price !== undefined) out.price = price
  const rating = parseNum(row.rating)
  if (rating !== undefined) out.rating = rating
  const reviews = parseNum(row.reviews)
  if (reviews !== undefined) out.reviews = reviews

  if (row.compareAtPrice !== undefined) {
    const t = row.compareAtPrice.trim()
    if (t === "") {
      // Intenção de LIMPAR o riscado. Não pode ser `undefined`: o overlay é
      // gravado com JSON.stringify, que APAGA chaves com undefined — a intenção
      // se perdia na gravação e o riscado da base voltava. `null` sobrevive ao
      // JSON e é traduzido de volta em getMergedProducts().
      out.compareAtPrice = null as unknown as undefined
    } else {
      const cap = parseNum(t)
      if (cap !== undefined) out.compareAtPrice = cap // só grava se for número válido
    }
  }
  return out
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// --- Overlay (KV) -----------------------------------------------------------
async function readOverrides(): Promise<Record<string, Partial<Product>>> {
  if (!kvConfigured()) return {}
  return (await kvGetJSON<Record<string, Partial<Product>>>(OVERRIDES_KEY)) ?? {}
}

async function readDeleted(): Promise<string[]> {
  if (!kvConfigured()) return []
  return (await kvGetJSON<string[]>(DELETED_KEY)) ?? []
}

const baseById = (): Map<string, Product> =>
  new Map(products.map((p) => [String(p.id), p]))

// --- Catálogo mesclado (objetos Product completos) --------------------------
export async function getMergedProducts(): Promise<Product[]> {
  const overrides = await readOverrides()
  const deleted = new Set(await readDeleted())

  const byId = baseById()
  for (const [id, ov] of Object.entries(overrides)) {
    const base = byId.get(id)
    if (base) {
      // edição: aplica por cima da base, mantendo o id numérico original e os
      // campos ricos (variants, images[], customerReviews…) que não se editam.
      const mesclado = { ...base, ...ov, id: base.id }
      // null no overlay = "limpar este campo" (ver rowToPartial). Traduz pro
      // formato do Product, onde ausência é undefined.
      if (ov.compareAtPrice === null) mesclado.compareAtPrice = undefined
      byId.set(id, mesclado)
    } else {
      // produto novo: o override já é um Product completo (montado no upsert).
      byId.set(id, ov as Product)
    }
  }
  for (const id of deleted) byId.delete(id)

  return Array.from(byId.values())
}

// --- Catálogo pro painel (linhas de strings) --------------------------------
export async function getMergedCatalog(): Promise<Catalog> {
  const merged = await getMergedProducts()
  return { headers: [...EDITABLE_HEADERS], rows: merged.map(productToRow) }
}

// --- Mutações (gravam no overlay KV) ----------------------------------------
export class CatalogReadonlyError extends Error {
  constructor() {
    super("KV (Upstash) não configurado — o catálogo está em modo somente leitura.")
    this.name = "CatalogReadonlyError"
  }
}

// Aplica UM produto no objeto de overrides em memória — sem tocar no KV.
// Separado do upsert pra que a edição em massa faça uma leitura e uma gravação
// só: antes eram 4 comandos por produto (ler/gravar overrides + ler/gravar
// deletados), o que em 227 produtos virava ~900 idas e voltas no Upstash.
function aplicarNoOverlay(
  row: ProductRow,
  overrides: Record<string, Partial<Product>>,
  base: Map<string, Product>
): string {
  const id = (row.id ?? "").trim()
  if (!id) throw new Error('Produto sem "id".')

  const isExisting = base.has(id)
  const partial = rowToPartial(row)

  if (isExisting) {
    overrides[id] = { ...overrides[id], ...partial }
  } else {
    const numericId = Number(id)
    if (!Number.isFinite(numericId)) {
      throw new Error("O id de um produto novo precisa ser numérico.")
    }
    const prev = (overrides[id] ?? {}) as Partial<Product>
    const name = (partial.name ?? prev.name ?? "").toString().trim()
    if (!name) throw new Error("Produto novo precisa de um nome.")
    const image = partial.image ?? prev.image ?? ""
    const newProduct: Product = {
      id: numericId,
      name,
      price: Number(partial.price ?? prev.price ?? 0),
      compareAtPrice: partial.compareAtPrice ?? prev.compareAtPrice,
      image,
      images: partial.images ?? prev.images ?? (image ? [image] : []),
      rating: partial.rating ?? prev.rating ?? 5,
      reviews: partial.reviews ?? prev.reviews ?? 0,
      category: partial.category ?? prev.category ?? "Diversos",
      slug: (partial.slug && partial.slug.trim()) || prev.slug || slugify(name) || id,
      description: partial.description ?? prev.description ?? "",
    }
    overrides[id] = newProduct
  }
  return id
}

/**
 * Grava vários produtos de uma vez: 2 leituras + 1~2 gravações no total,
 * independente da quantidade. Se QUALQUER linha for inválida, nada é gravado —
 * o catálogo nunca fica meio salvo.
 */
export async function upsertManyProducts(rows: ProductRow[]): Promise<number> {
  if (!kvConfigured()) throw new CatalogReadonlyError()
  if (!rows.length) return 0

  const overrides = await readOverrides() // 1 leitura
  const base = baseById() // montado uma vez, não por produto
  const ids: string[] = []
  for (const row of rows) ids.push(aplicarNoOverlay(row, overrides, base))

  await kvSetJSON(OVERRIDES_KEY, overrides) // 1 gravação

  // "Ressuscita" o que estava marcado como deletado — grava só se mudou algo.
  const deleted = await readDeleted() // 1 leitura
  const restantes = deleted.filter((d) => !ids.includes(d))
  if (restantes.length !== deleted.length) {
    await kvSetJSON(DELETED_KEY, restantes)
  }

  return ids.length
}

export async function upsertProduct(row: ProductRow): Promise<void> {
  await upsertManyProducts([row])
}

export async function deleteProduct(id: string): Promise<void> {
  if (!kvConfigured()) throw new CatalogReadonlyError()
  const key = (id ?? "").trim()
  if (!key) return

  const overrides = await readOverrides()
  if (overrides[key]) {
    delete overrides[key]
    await kvSetJSON(OVERRIDES_KEY, overrides)
  }
  const deleted = await readDeleted()
  if (!deleted.includes(key)) {
    deleted.push(key)
    await kvSetJSON(DELETED_KEY, deleted)
  }
}

// Zera o overlay — use DEPOIS de exportar o products.ts e commitar.
export async function resetOverlay(): Promise<void> {
  if (!kvConfigured()) throw new CatalogReadonlyError()
  await kvSetJSON(OVERRIDES_KEY, {})
  await kvSetJSON(DELETED_KEY, [])
}

export async function pendingChangesCount(): Promise<number> {
  const overrides = await readOverrides()
  const deleted = await readDeleted()
  return Object.keys(overrides).length + deleted.length
}

// --- Consolidação: conferir o overlay contra o código ------------------------
// Antes de zerar o overlay (o passo final da migração pra fonte única), prova
// campo a campo que o lib/products.ts JÁ contém cada edição. Sem isto, zerar
// significa devolver a loja aos preços antigos — venda com preço errado.
//
// Trava proposital: se UM campo divergir, `ok` volta falso e a rota se recusa a
// apagar. Preferimos duas fontes por mais um deploy do que perder edição.
export type ConfereConsolidacao = {
  ok: boolean
  noCodigo: number // produtos no lib/products.ts
  entradas: number // produtos com edição no overlay
  campos: number // campos conferidos
  divergencias: string[] // o que o código ainda não tem
  deletadosPendentes: string[] // ids marcados como removidos que seguem no código
}

export async function conferirConsolidacao(): Promise<ConfereConsolidacao> {
  const overrides = await readOverrides()
  const deleted = await readDeleted()
  const noCodigo = baseById()

  const divergencias: string[] = []
  let campos = 0

  for (const [id, ov] of Object.entries(overrides)) {
    const base = noCodigo.get(id) as Record<string, unknown> | undefined
    if (!base) {
      divergencias.push(`produto ${id} (${(ov as Product)?.name || "sem nome"}) não existe no lib/products.ts`)
      continue
    }
    for (const [campo, valor] of Object.entries(ov)) {
      if (campo === "id") continue
      campos++
      // null no overlay = "campo apagado" (ex.: tirar o preço riscado).
      if (valor === null) {
        if (base[campo] !== undefined && base[campo] !== null) {
          divergencias.push(`produto ${id}: ${campo} devia estar apagado no código`)
        }
        continue
      }
      if (JSON.stringify(base[campo]) !== JSON.stringify(valor)) {
        divergencias.push(`produto ${id}: ${campo} diferente do código`)
      }
    }
  }

  const deletadosPendentes = deleted.filter((id) => noCodigo.has(id))

  return {
    ok: divergencias.length === 0 && deletadosPendentes.length === 0,
    noCodigo: noCodigo.size,
    entradas: Object.keys(overrides).length,
    campos,
    divergencias: divergencias.slice(0, 20),
    deletadosPendentes,
  }
}

// --- Importação: restaurar um catálogo vindo de arquivo ----------------------
// O par do export. Aceita tanto o `products.ts` que o painel gera quanto um
// JSON com o array de produtos — o arquivo exportado tem o array serializado
// com JSON.stringify, então os dois caminhos terminam no mesmo JSON.parse.
//
// Duas decisões que evitam estrago:
//  • grava no overlay SÓ o que difere do código (não o produto inteiro). Um
//    arquivo idêntico ao publicado resulta em zero mudanças e overlay vazio,
//    em vez de inchar o KV com 230 cópias.
//  • valida tudo antes de gravar qualquer coisa — catálogo meio importado é
//    pior que importação recusada.

const CAMPOS_IMPORTAVEIS = [
  "name",
  "price",
  "compareAtPrice",
  "image",
  "images",
  "rating",
  "reviews",
  "category",
  "slug",
  "description",
  "tags",
] as const

export type ModoImportacao = "mesclar" | "substituir"

export type AnaliseImportacao = {
  total: number
  novos: { id: string; name: string }[]
  alterados: { id: string; name: string; campos: string[] }[]
  iguais: number
  removidos: { id: string; name: string }[] // só faz sentido no modo substituir
  erros: string[]
}

/** Lê o conteúdo do arquivo (.ts exportado ou .json) e devolve os produtos. */
export function extrairProdutosDeArquivo(texto: string): Product[] {
  const cru = (texto || "").trim()
  if (!cru) throw new Error("Arquivo vazio.")

  let bruto: unknown
  if (cru.startsWith("[")) {
    bruto = JSON.parse(cru)
  } else if (cru.startsWith("{")) {
    // aceita { produtos: [...] } / { products: [...] }
    const obj = JSON.parse(cru) as Record<string, unknown>
    bruto = obj.produtos ?? obj.products ?? obj.itens
  } else {
    // products.ts: recorta o array e faz o parse
    const marker = cru.indexOf(PRODUCTS_MARKER)
    if (marker === -1) {
      throw new Error(
        "Não achei o array de produtos no arquivo. Use o .ts baixado no botão Backup, ou um .json com a lista.",
      )
    }
    const inicio = cru.indexOf("[", marker + PRODUCTS_MARKER.length)
    const fim = findMatchingBracket(cru, inicio) + 1
    try {
      bruto = JSON.parse(cru.slice(inicio, fim))
    } catch {
      throw new Error(
        "O array do arquivo não está em formato JSON — provavelmente é um products.ts escrito à mão. " +
          "Baixe pelo botão Backup e importe esse.",
      )
    }
  }

  if (!Array.isArray(bruto)) throw new Error("O arquivo não contém uma lista de produtos.")
  if (bruto.length === 0) throw new Error("A lista de produtos está vazia.")
  if (bruto.length > 3000) throw new Error(`Lista grande demais (${bruto.length} produtos).`)
  return bruto as Product[]
}

function validar(lista: Product[]): string[] {
  const erros: string[] = []
  const vistos = new Set<string>()
  lista.forEach((p, i) => {
    const onde = `item ${i + 1}`
    const id = String((p as { id?: unknown })?.id ?? "").trim()
    if (!id || !Number.isFinite(Number(id))) erros.push(`${onde}: id ausente ou não numérico`)
    else if (vistos.has(id)) erros.push(`${onde}: id ${id} repetido no arquivo`)
    else vistos.add(id)
    if (!String(p?.name || "").trim()) erros.push(`${onde}: sem nome`)
    if (!Number.isFinite(Number(p?.price)) || Number(p?.price) < 0) erros.push(`${onde}: preço inválido`)
    if (!String(p?.slug || "").trim()) erros.push(`${onde}: sem slug`)
  })
  return erros.slice(0, 15)
}

// Campos do arquivo que diferem de `refer` (o produto de referência).
function camposQueMudam(novo: Product, refer: Product | undefined): string[] {
  const mudam: string[] = []
  for (const campo of CAMPOS_IMPORTAVEIS) {
    const a = (novo as Record<string, unknown>)[campo]
    const b = refer ? (refer as Record<string, unknown>)[campo] : undefined
    const ausenteNosDois = (a === undefined || a === null) && (b === undefined || b === null)
    if (ausenteNosDois) continue
    if (JSON.stringify(a ?? null) !== JSON.stringify(b ?? null)) mudam.push(campo)
  }
  return mudam
}

/** Prévia: o que este arquivo faria com a loja, sem gravar nada. */
export async function analisarImportacao(lista: Product[], modo: ModoImportacao): Promise<AnaliseImportacao> {
  const erros = validar(lista)
  const atual = new Map((await getMergedProducts()).map((p) => [String(p.id), p]))

  const novos: AnaliseImportacao["novos"] = []
  const alterados: AnaliseImportacao["alterados"] = []
  let iguais = 0

  for (const p of lista) {
    const id = String(p.id)
    const antes = atual.get(id)
    if (!antes) {
      novos.push({ id, name: String(p.name || "") })
      continue
    }
    const campos = camposQueMudam(p, antes)
    if (campos.length) alterados.push({ id, name: String(p.name || antes.name), campos })
    else iguais++
  }

  const noArquivo = new Set(lista.map((p) => String(p.id)))
  const removidos =
    modo === "substituir"
      ? [...atual.values()]
          .filter((p) => !noArquivo.has(String(p.id)))
          .map((p) => ({ id: String(p.id), name: p.name }))
      : []

  return { total: lista.length, novos, alterados, iguais, removidos, erros }
}

/** Aplica de verdade. Grava no overlay só a diferença contra o código. */
export async function importarProdutos(
  lista: Product[],
  modo: ModoImportacao,
): Promise<{ gravados: number; removidos: number }> {
  if (!kvConfigured()) throw new CatalogReadonlyError()
  const erros = validar(lista)
  if (erros.length) throw new Error(`Arquivo inválido: ${erros.join("; ")}`)

  const base = baseById()
  const overrides = await readOverrides()
  let gravados = 0

  for (const p of lista) {
    const id = String(p.id)
    const noCodigo = base.get(id)

    if (!noCodigo) {
      // produto que não existe no código: entra inteiro no overlay
      overrides[id] = { ...p, id: Number(id) } as Product
      gravados++
      continue
    }

    const campos = camposQueMudam(p, noCodigo)
    if (!campos.length) {
      // o código já tem esse produto exatamente assim — some do overlay
      if (overrides[id]) {
        delete overrides[id]
        gravados++
      }
      continue
    }

    const partial: Record<string, unknown> = {}
    for (const campo of campos) {
      const valor = (p as Record<string, unknown>)[campo]
      // ausente no arquivo mas presente no código = apagar. O overlay só sabe
      // apagar compareAtPrice (ver getMergedProducts); nos outros campos o
      // valor do código prevalece e a diferença é ignorada de propósito.
      if (valor === undefined || valor === null) {
        if (campo === "compareAtPrice") partial.compareAtPrice = null
        continue
      }
      partial[campo] = valor
    }
    if (Object.keys(partial).length === 0) continue
    overrides[id] = { ...overrides[id], ...(partial as Partial<Product>) }
    gravados++
  }

  await kvSetJSON(OVERRIDES_KEY, overrides)

  // Modo substituir: o que não veio no arquivo sai da loja.
  let removidos = 0
  const noArquivo = new Set(lista.map((p) => String(p.id)))
  if (modo === "substituir") {
    const atual = await getMergedProducts()
    const paraRemover = atual.map((p) => String(p.id)).filter((id) => !noArquivo.has(id))
    if (paraRemover.length) {
      const deleted = await readDeleted()
      const uniao = [...new Set([...deleted, ...paraRemover])]
      await kvSetJSON(DELETED_KEY, uniao)
      removidos = paraRemover.length
    }
  } else {
    // Mesclar: quem veio no arquivo volta pra loja se estava removido.
    const deleted = await readDeleted()
    const restantes = deleted.filter((id) => !noArquivo.has(id))
    if (restantes.length !== deleted.length) await kvSetJSON(DELETED_KEY, restantes)
  }

  return { gravados, removidos }
}

// --- Export: regenera lib/products.ts (só o bloco do array) ------------------
// Acha o fechamento balanceado do array, respeitando strings e escapes — mesma
// técnica do scripts/products-editor.ts da loja.
function findMatchingBracket(source: string, openIndex: number): number {
  const open = source[openIndex]
  const close = open === "[" ? "]" : "}"
  let depth = 0
  let inString = false
  let escaped = false
  let quote = ""

  for (let i = openIndex; i < source.length; i++) {
    const ch = source[i]
    if (inString) {
      if (escaped) escaped = false
      else if (ch === "\\") escaped = true
      else if (ch === quote) inString = false
      continue
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true
      quote = ch
    } else if (ch === open) {
      depth++
    } else if (ch === close) {
      depth--
      if (depth === 0) return i
    }
  }
  throw new Error("Não foi possível encontrar o fechamento do array products.")
}

export async function exportMergedProductsTs(): Promise<string> {
  const merged = await getMergedProducts()

  const abs = path.join(process.cwd(), PRODUCTS_PATH)
  let source: string
  try {
    source = await fs.readFile(abs, "utf8")
  } catch {
    throw new Error(
      "Não consegui ler lib/products.ts no servidor para regenerar o arquivo. " +
        "Rode o export em ambiente com o código-fonte presente (dev local) ou confira " +
        "outputFileTracingIncludes no next.config.",
    )
  }

  const markerIndex = source.indexOf(PRODUCTS_MARKER)
  if (markerIndex === -1) throw new Error("Marcador do array products não encontrado em lib/products.ts.")
  const start = source.indexOf("[", markerIndex + PRODUCTS_MARKER.length)
  if (start === -1) throw new Error("Início do array products não encontrado.")
  const end = findMatchingBracket(source, start) + 1

  const serialized = JSON.stringify(merged, null, 2)
  return source.slice(0, start) + serialized + source.slice(end)
}
