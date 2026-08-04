"use client"

import { useCallback, useEffect, useState } from "react"
import { AlertTriangle, ArrowRight, Check, Download, GitBranch, Layers, Loader2, RefreshCw } from "lucide-react"

// Consolidação do catálogo numa fonte só.
//
// A loja lê o catálogo de dois lugares (array no git + overlay no KV) porque a
// Vercel roda em disco somente leitura: o painel não pode reescrever o
// lib/products.ts em produção. O efeito colateral é o que incomoda de verdade —
// no localhost a loja mostra preço velho, na nuvem o novo.
//
// Este card mostra as duas fontes lado a lado e fecha o ciclo: exporta o
// products.ts já mesclado, você commita e faz deploy, e então zera o overlay.
// O zerar só passa se o servidor conferir que o código publicado já tem cada
// edição — a API recusa quando falta algo (senão a loja voltaria aos preços
// antigos e venderia errado).

type Relatorio = {
  ok: boolean
  noCodigo: number
  entradas: number
  campos: number
  divergencias: string[]
  deletadosPendentes: string[]
  kvOk: boolean
}

export function CatalogoConsolidar() {
  const [dados, setDados] = useState<Relatorio | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [zerando, setZerando] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; texto: string } | null>(null)

  const carregar = useCallback(async () => {
    setCarregando(true)
    try {
      const r = await fetch("/api/admin/catalog-consolidar", { cache: "no-store" })
      setDados(await r.json())
    } catch {
      setDados(null)
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  async function zerar() {
    if (
      !window.confirm(
        "Zerar o overlay do KV?\n\n" +
          "Só faça isso DEPOIS de commitar o products.ts exportado e o deploy estar no ar.\n" +
          "O servidor confere campo a campo antes de apagar — se faltar algo, ele recusa."
      )
    )
      return
    setZerando(true)
    setMsg(null)
    try {
      const r = await fetch("/api/admin/catalog-consolidar", { method: "POST" })
      const d = await r.json()
      if (!r.ok) throw new Error(d?.error || `erro ${r.status}`)
      setMsg({
        ok: true,
        texto: d.jaConsolidado
          ? "Já estava consolidado: o catálogo vem só do código."
          : `Pronto. ${d.zerado} edições (${d.campos} campos) agora vivem só no código.`,
      })
      await carregar()
    } catch (e) {
      setMsg({ ok: false, texto: (e as Error)?.message || "falhou" })
    } finally {
      setZerando(false)
    }
  }

  const pendentes = dados?.entradas ?? 0
  const unificado = pendentes === 0
  const podeZerar = Boolean(dados?.ok) && pendentes > 0

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-2">
        <Layers className="mt-0.5 h-5 w-5 text-muted-foreground" />
        <div className="flex-1">
          <h3 className="text-sm font-bold text-foreground">Fonte do catálogo</h3>
          <p className="text-xs text-muted-foreground">
            Onde estão os preços e descrições que a loja mostra. O ideal é uma fonte só: o código.
          </p>
        </div>
        <button
          onClick={carregar}
          disabled={carregando}
          className="shrink-0 rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-muted disabled:opacity-50"
          title="Reverificar"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${carregando ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Estado visual das duas fontes */}
      <div className="mt-3 flex items-stretch gap-2">
        <div className="flex-1 rounded-lg border border-border bg-background p-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-foreground">
            <GitBranch className="h-3.5 w-3.5" /> CÓDIGO (git)
          </div>
          <div className="mt-1 text-lg font-black leading-none text-foreground">
            {carregando ? "…" : (dados?.noCodigo ?? "?")}
          </div>
          <div className="text-[10px] text-muted-foreground">produtos no lib/products.ts</div>
        </div>

        <div className="flex items-center">
          <ArrowRight className={`h-4 w-4 ${unificado ? "text-emerald-600" : "text-amber-500"}`} />
        </div>

        <div
          className={`flex-1 rounded-lg border p-2.5 transition-colors ${
            unificado ? "border-emerald-300 bg-emerald-50/60" : "border-amber-300 bg-amber-50/60"
          }`}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-foreground">
            <Layers className="h-3.5 w-3.5" /> KV (overlay)
          </div>
          <div
            className={`mt-1 text-lg font-black leading-none ${unificado ? "text-emerald-700" : "text-amber-700"}`}
          >
            {carregando ? "…" : unificado ? "vazio" : pendentes}
          </div>
          <div className="text-[10px] text-muted-foreground">
            {unificado ? "fonte única — local = nuvem" : "edições que entram por cima"}
          </div>
        </div>
      </div>

      {!carregando && !unificado && (
        <>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="/api/admin/products/export"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-bold text-foreground hover:bg-muted"
            >
              <Download className="h-4 w-4" />
              1. Exportar products.ts
            </a>
            <button
              onClick={zerar}
              disabled={zerando || !podeZerar}
              title={podeZerar ? "" : "O código publicado ainda não tem todas as edições"}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-primary-foreground disabled:opacity-40"
            >
              {zerando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              2. Zerar overlay
            </button>
          </div>

          {dados && (
            <p
              className={`mt-2 flex items-start gap-1.5 text-[11px] font-semibold ${
                dados.ok ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              {dados.ok ? (
                <>
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    Conferido: os {dados.campos} campos editados já estão no código publicado. Pode zerar.
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    Ainda não dá pra zerar — o código publicado não tem{" "}
                    {dados.divergencias.length + dados.deletadosPendentes.length} item(ns):{" "}
                    {dados.divergencias.slice(0, 3).join("; ")}
                    {dados.divergencias.length > 3 ? "…" : ""}. Exporte, commite e faça o deploy primeiro.
                  </span>
                </>
              )}
            </p>
          )}
        </>
      )}

      {msg && (
        <p className={`mt-2 text-xs font-semibold ${msg.ok ? "text-emerald-700" : "text-red-600"}`}>{msg.texto}</p>
      )}

      <div className="mt-3 rounded-lg bg-muted/60 p-2.5">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          <strong>Por que existem duas:</strong> a Vercel roda em disco somente leitura, então o painel não consegue
          reescrever o <code className="font-mono">lib/products.ts</code> em produção — a edição vai pro KV e entra por
          cima. Consolidar traz tudo pro git (que passa a ser backup e histórico) e faz o localhost mostrar exatamente o
          que a loja mostra. Pedido, gateway e bump continuam no KV: nascem em runtime, não têm como morar no código.
        </p>
      </div>
    </div>
  )
}
