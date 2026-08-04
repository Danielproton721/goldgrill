"use client"

import { useRef, useState } from "react"
import { AlertTriangle, ArrowRight, Check, Loader2, Trash2, Upload, X } from "lucide-react"

// Importar catálogo — o par do botão Backup.
//
// Restaurar 230 produtos de um arquivo é a ação mais destrutiva que existe aqui:
// um arquivo errado apaga horas de edição. Por isso o fluxo é sempre em dois
// passos — o servidor devolve a PRÉVIA (quantos entram, quantos mudam, quantos
// saem) e nada é gravado até o segundo clique.

type Analise = {
  ok: boolean
  total: number
  novos: { id: string; name: string }[]
  alterados: { id: string; name: string; campos: string[] }[]
  iguais: number
  removidos: { id: string; name: string }[]
  erros: string[]
}

type Modo = "mesclar" | "substituir"

export function ProductsImport({
  disabled,
  onDone,
}: {
  disabled?: boolean
  onDone: (msg: { ok: boolean; text: string }) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [conteudo, setConteudo] = useState<string | null>(null)
  const [nomeArquivo, setNomeArquivo] = useState("")
  const [modo, setModo] = useState<Modo>("mesclar")
  const [analise, setAnalise] = useState<Analise | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [lendo, setLendo] = useState(false)
  const [aplicando, setAplicando] = useState(false)

  async function analisar(texto: string, m: Modo) {
    setLendo(true)
    setErro(null)
    try {
      const r = await fetch("/api/admin/products/import", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ conteudo: texto, modo: m, aplicar: false }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d?.error || `erro ${r.status}`)
      setAnalise(d)
    } catch (e) {
      setErro((e as Error)?.message || "Não consegui ler o arquivo.")
      setAnalise(null)
    } finally {
      setLendo(false)
    }
  }

  async function escolher(f: File) {
    const texto = await f.text()
    setConteudo(texto)
    setNomeArquivo(f.name)
    await analisar(texto, modo)
  }

  async function trocarModo(m: Modo) {
    setModo(m)
    if (conteudo) await analisar(conteudo, m)
  }

  async function aplicar() {
    if (!conteudo || !analise) return
    const muda = analise.novos.length + analise.alterados.length + analise.removidos.length
    if (
      !window.confirm(
        `Aplicar ${muda} mudança(s) no catálogo?\n\n` +
          (analise.removidos.length
            ? `ATENÇÃO: ${analise.removidos.length} produto(s) vão SAIR da loja.\n\n`
            : "") +
          "Dá pra desfazer restaurando um backup anterior — se você tiver um."
      )
    )
      return
    setAplicando(true)
    setErro(null)
    try {
      const r = await fetch("/api/admin/products/import", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ conteudo, modo, aplicar: true }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d?.error || `erro ${r.status}`)
      fechar()
      onDone({
        ok: true,
        text: `Importado: ${d.gravados} produto(s) gravado(s)${d.removidos ? `, ${d.removidos} removido(s)` : ""}.`,
      })
    } catch (e) {
      setErro((e as Error)?.message || "Falha ao importar.")
    } finally {
      setAplicando(false)
    }
  }

  function fechar() {
    setConteudo(null)
    setAnalise(null)
    setErro(null)
    setNomeArquivo("")
    setModo("mesclar")
    if (inputRef.current) inputRef.current.value = ""
  }

  const mudancas = analise ? analise.novos.length + analise.alterados.length + analise.removidos.length : 0

  return (
    <>
      <button
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
        title="Restaurar o catálogo a partir de um arquivo .ts ou .json"
        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:bg-muted disabled:opacity-50"
      >
        <Upload className="h-4 w-4" /> <span className="hidden sm:inline">Restaurar</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".ts,.json,text/plain,application/json"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) escolher(f)
        }}
      />

      {(conteudo || lendo) && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <div className="mt-8 w-full max-w-2xl rounded-2xl border border-border bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-foreground">Restaurar catálogo</h3>
                <p className="truncate text-xs text-muted-foreground">{nomeArquivo}</p>
              </div>
              <button onClick={fechar} className="rounded-lg p-1 text-muted-foreground hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>

            {lendo && (
              <p className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Conferindo o arquivo…
              </p>
            )}

            {erro && (
              <p className="mb-3 flex items-start gap-1.5 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs font-semibold text-red-700">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {erro}
              </p>
            )}

            {analise && !lendo && (
              <>
                {/* Modo */}
                <div className="mb-3 grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      {
                        v: "mesclar" as Modo,
                        t: "Mesclar (seguro)",
                        d: "Só mexe nos produtos que estão no arquivo. O resto da loja fica como está.",
                      },
                      {
                        v: "substituir" as Modo,
                        t: "Substituir tudo",
                        d: "A loja passa a ser exatamente o arquivo. O que não estiver nele SAI da loja.",
                      },
                    ] as const
                  ).map((o) => (
                    <button
                      key={o.v}
                      onClick={() => trocarModo(o.v)}
                      className={`rounded-lg border p-2.5 text-left transition-colors ${
                        modo === o.v
                          ? o.v === "substituir"
                            ? "border-red-400 bg-red-50"
                            : "border-primary bg-primary/5"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <div className="text-xs font-bold text-foreground">{o.t}</div>
                      <div className="text-[11px] leading-snug text-muted-foreground">{o.d}</div>
                    </button>
                  ))}
                </div>

                {/* Placar do que vai acontecer */}
                <div className="mb-3 grid grid-cols-4 gap-2">
                  {[
                    { n: analise.novos.length, t: "entram", cor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                    { n: analise.alterados.length, t: "mudam", cor: "text-amber-700 bg-amber-50 border-amber-200" },
                    { n: analise.iguais, t: "iguais", cor: "text-muted-foreground bg-muted border-border" },
                    { n: analise.removidos.length, t: "saem", cor: "text-red-700 bg-red-50 border-red-200" },
                  ].map((c) => (
                    <div key={c.t} className={`rounded-lg border p-2 text-center ${c.cor}`}>
                      <div className="text-xl font-black leading-none">{c.n}</div>
                      <div className="text-[10px] font-bold uppercase">{c.t}</div>
                    </div>
                  ))}
                </div>

                {analise.erros.length > 0 && (
                  <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-2.5">
                    <p className="text-xs font-bold text-red-700">Arquivo com problema — não dá pra aplicar:</p>
                    <ul className="mt-1 list-disc pl-4 text-[11px] text-red-700">
                      {analise.erros.slice(0, 6).map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Amostra do que muda */}
                {analise.alterados.length > 0 && (
                  <div className="mb-2 max-h-40 overflow-y-auto rounded-lg border border-border">
                    <table className="w-full text-[11px]">
                      <tbody>
                        {analise.alterados.slice(0, 40).map((a) => (
                          <tr key={a.id} className="border-b border-border last:border-0">
                            <td className="px-2 py-1 font-mono text-muted-foreground">{a.id}</td>
                            <td className="max-w-[240px] truncate px-2 py-1 text-foreground">{a.name}</td>
                            <td className="px-2 py-1 text-amber-700">{a.campos.join(", ")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {analise.alterados.length > 40 && (
                      <p className="px-2 py-1 text-[10px] text-muted-foreground">
                        …e mais {analise.alterados.length - 40}
                      </p>
                    )}
                  </div>
                )}

                {analise.removidos.length > 0 && (
                  <p className="mb-2 flex items-start gap-1.5 rounded-lg border border-red-200 bg-red-50 p-2.5 text-[11px] font-semibold text-red-700">
                    <Trash2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>
                      {analise.removidos.length} produto(s) somem da loja:{" "}
                      {analise.removidos
                        .slice(0, 4)
                        .map((r) => r.name)
                        .join(", ")}
                      {analise.removidos.length > 4 ? "…" : ""}
                    </span>
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between gap-2">
                  <p className="text-[11px] text-muted-foreground">
                    {mudancas === 0
                      ? "Este arquivo é igual ao catálogo atual — nada a fazer."
                      : "Nada foi gravado ainda."}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={fechar}
                      className="rounded-lg border border-border px-3 py-2 text-sm font-bold text-foreground hover:bg-muted"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={aplicar}
                      disabled={aplicando || mudancas === 0 || analise.erros.length > 0}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-primary-foreground disabled:opacity-40"
                    >
                      {aplicando ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : modo === "substituir" ? (
                        <ArrowRight className="h-4 w-4" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      Aplicar {mudancas > 0 ? `(${mudancas})` : ""}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
