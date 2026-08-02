"use client"

import { useEffect, useMemo, useState } from "react"
import { AlertTriangle, Check, Loader2, Search, ShoppingBasket, TrendingUp } from "lucide-react"

// Aba "Order Bump": configura a oferta que aparece na hora de pagar, sem deploy.
// A prévia ao lado mostra exatamente o card que o cliente vai ver — inclusive
// quando a configuração invalida a oferta (aí o card some, como no checkout).

type Produto = { slug: string; nome: string; precoCents: number; imagem: string }
type Config = { ativo: boolean; slug: string; precoCents: number; titulo: string; argumento: string }
type Oferta = {
  slug: string; nome: string; imagem: string
  precoCents: number; precoNormalCents: number; descontoPct: number
  titulo: string; argumento: string
}
type Desempenho = { pedidos: number; comBump: number; receitaBumpCents: number }

const brl = (cents: number) => `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`

export function OrderBumpPanel() {
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; texto: string } | null>(null)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [desempenho, setDesempenho] = useState<Desempenho | null>(null)
  const [kvOk, setKvOk] = useState(true)
  const [cfg, setCfg] = useState<Config>({ ativo: false, slug: "", precoCents: 0, titulo: "", argumento: "" })
  const [busca, setBusca] = useState("")
  // Campo de preço em texto pra aceitar "19,90" enquanto digita.
  const [precoTexto, setPrecoTexto] = useState("")

  useEffect(() => {
    fetch("/api/admin/order-bump")
      .then((r) => r.json())
      .then((d) => {
        if (d?.config) {
          setCfg(d.config)
          setPrecoTexto(d.config.precoCents ? (d.config.precoCents / 100).toFixed(2).replace(".", ",") : "")
        }
        setProdutos(d?.produtos ?? [])
        setDesempenho(d?.desempenho ?? null)
        setKvOk(d?.kvOk !== false)
      })
      .catch(() => setMsg({ ok: false, texto: "Não consegui carregar a configuração." }))
      .finally(() => setCarregando(false))
  }, [])

  const escolhido = useMemo(() => produtos.find((p) => p.slug === cfg.slug) ?? null, [produtos, cfg.slug])

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    const base = q ? produtos.filter((p) => p.nome.toLowerCase().includes(q)) : produtos
    return base.slice(0, 40)
  }, [produtos, busca])

  // Mesma regra do servidor: sem isso a oferta não aparece pro cliente.
  const precoCents = Math.round((Number(precoTexto.replace(",", ".")) || 0) * 100)
  const problema =
    !cfg.slug
      ? "Escolha o produto do bump."
      : !(precoCents > 0)
        ? "Informe o preço promocional."
        : escolhido && precoCents >= escolhido.precoCents
          ? `O preço tem que ser MENOR que ${brl(escolhido.precoCents)} — senão não é oferta.`
          : null

  async function salvar(ativo: boolean) {
    setSalvando(true)
    setMsg(null)
    try {
      const r = await fetch("/api/admin/order-bump", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...cfg, ativo, precoCents }),
      })
      const d = await r.json().catch(() => ({}))
      if (r.ok) {
        setCfg(d.config)
        setMsg({ ok: true, texto: d.config.ativo ? "Bump ativo — já aparece no checkout." : "Salvo (bump desligado)." })
      } else {
        setMsg({ ok: false, texto: d?.error || "Não deu pra salvar." })
      }
    } catch {
      setMsg({ ok: false, texto: "Falha de conexão." })
    } finally {
      setSalvando(false)
    }
  }

  if (carregando) {
    return (
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> carregando…
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-start gap-2">
          <ShoppingBasket className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <h2 className="font-bold text-foreground">Order Bump</h2>
            <p className="text-xs text-muted-foreground">
              Oferta de um item barato na hora de pagar. Sobe o valor do pedido sem trazer cliente novo — é o que
              faz a conta do tráfego pago fechar.
            </p>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              cfg.ativo ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"
            }`}
          >
            {cfg.ativo ? "ATIVO" : "desligado"}
          </span>
        </div>

        {!kvOk && (
          <p className="mt-3 rounded-lg bg-amber-50 p-2 text-xs text-amber-800">
            KV (Upstash) não configurado — dá pra ver, mas não dá pra salvar.
          </p>
        )}

        {/* Desempenho: sai dos pedidos que já existem, sem contador extra. */}
        {desempenho && desempenho.pedidos > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-4 rounded-lg bg-muted/60 p-3">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-lg font-bold text-foreground">
                {desempenho.comBump}
                <span className="text-sm font-normal text-muted-foreground"> de {desempenho.pedidos} pedidos</span>
              </div>
              <div className="text-[11px] text-muted-foreground">levaram o bump</div>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-700">{brl(desempenho.receitaBumpCents)}</div>
              <div className="text-[11px] text-muted-foreground">a mais no caixa</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">
                {desempenho.pedidos ? Math.round((desempenho.comBump / desempenho.pedidos) * 100) : 0}%
              </div>
              <div className="text-[11px] text-muted-foreground">de aceite</div>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        {/* ── Configuração ── */}
        <div className="space-y-3 rounded-xl border border-border bg-card p-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Produto do bump
            </label>
            {escolhido ? (
              <div className="flex items-center gap-2 rounded-lg border border-border p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={escolhido.imagem} alt="" className="h-10 w-10 rounded object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-foreground">{escolhido.nome}</div>
                  <div className="text-xs text-muted-foreground">preço na loja: {brl(escolhido.precoCents)}</div>
                </div>
                <button
                  onClick={() => setCfg((c) => ({ ...c, slug: "" }))}
                  className="text-xs font-bold text-muted-foreground hover:text-foreground"
                >
                  trocar
                </button>
              </div>
            ) : (
              <>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Buscar produto pelo nome…"
                    className="w-full rounded-lg border border-border bg-background py-2 pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div className="mt-1 max-h-52 overflow-y-auto rounded-lg border border-border">
                  {filtrados.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => setCfg((c) => ({ ...c, slug: p.slug }))}
                      className="flex w-full items-center gap-2 border-b border-border/60 p-2 text-left last:border-0 hover:bg-muted"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.imagem} alt="" className="h-8 w-8 rounded object-cover" />
                      <span className="min-w-0 flex-1 truncate text-xs text-foreground">{p.nome}</span>
                      <span className="text-xs font-bold text-muted-foreground">{brl(p.precoCents)}</span>
                    </button>
                  ))}
                  {!filtrados.length && (
                    <p className="p-3 text-center text-xs text-muted-foreground">Nenhum produto com esse nome.</p>
                  )}
                </div>
              </>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Preço no bump
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">R$</span>
              <input
                value={precoTexto}
                onChange={(e) => setPrecoTexto(e.target.value)}
                inputMode="decimal"
                placeholder="19,90"
                className="w-28 rounded-lg border border-border bg-background px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              {escolhido && (
                <span className="text-xs text-muted-foreground">
                  na loja custa {brl(escolhido.precoCents)}
                  {precoCents > 0 && precoCents < escolhido.precoCents && (
                    <strong className="ml-1 text-emerald-700">
                      ({Math.round((1 - precoCents / escolhido.precoCents) * 100)}% off)
                    </strong>
                  )}
                </span>
              )}
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Vale só dentro do bump — o preço do produto na vitrine não muda.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Chamada (headline)
            </label>
            <input
              value={cfg.titulo}
              onChange={(e) => setCfg((c) => ({ ...c, titulo: e.target.value }))}
              placeholder="Leva o kit de garfos junto?"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Linha de apoio
            </label>
            <input
              value={cfg.argumento}
              onChange={(e) => setCfg((c) => ({ ...c, argumento: e.target.value }))}
              placeholder="Pra servir e desfiar sem queimar a mão."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {problema && (
            <p className="flex items-start gap-1.5 rounded-lg bg-amber-50 p-2 text-xs text-amber-800">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {problema}
            </p>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => salvar(true)}
              disabled={salvando || !kvOk || Boolean(problema)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-primary-foreground disabled:opacity-50"
            >
              {salvando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Salvar e ativar
            </button>
            <button
              onClick={() => salvar(false)}
              disabled={salvando || !kvOk}
              className="rounded-lg border border-border px-3 py-2 text-sm font-bold text-foreground hover:bg-muted disabled:opacity-50"
            >
              {cfg.ativo ? "Desligar o bump" : "Salvar desligado"}
            </button>
          </div>

          {msg && (
            <p className={`text-xs font-semibold ${msg.ok ? "text-emerald-700" : "text-red-600"}`}>{msg.texto}</p>
          )}
        </div>

        {/* ── Prévia do card ── */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Como o cliente vê
          </div>
          {problema || !escolhido ? (
            <p className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
              Sem oferta válida o card <strong>não aparece</strong> no checkout — e a compra segue normal.
            </p>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-[#eaa50c] bg-[#fdf6e3] p-3">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-[#eaa50c] bg-[#eaa50c] text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={escolhido.imagem} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black uppercase tracking-wide text-[#b98a2e]">
                    {cfg.titulo || "Leva junto?"}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[13px] font-semibold leading-snug text-gray-800">
                    {escolhido.nome}
                  </p>
                  {cfg.argumento && (
                    <p className="mt-0.5 text-[11px] leading-snug text-gray-500">{cfg.argumento}</p>
                  )}
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-sm font-black text-emerald-600">+ {brl(precoCents)}</span>
                    <span className="text-[11px] text-gray-400 line-through">{brl(escolhido.precoCents)}</span>
                    <span className="rounded bg-emerald-100 px-1 text-[10px] font-black text-emerald-700">
                      -{Math.round((1 - precoCents / escolhido.precoCents) * 100)}%
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            O card fica colado no <strong>Total</strong>, logo acima do botão de pagar. Se o cliente já tiver esse
            produto no carrinho, ele não aparece.
          </p>
        </div>
      </div>
    </div>
  )
}
