"use client"

import { useMemo, useState } from "react"
import { AlertTriangle, ArrowRight, Loader2, Tag, X } from "lucide-react"
import type { ProductRow } from "@/lib/catalog"

// Edição de preços em massa. Mexer no preço de muitos produtos de uma vez é a
// ação mais destrutiva do painel — então nada é aplicado sem a prévia
// "antes → depois" na tela, e qualquer linha inválida bloqueia o botão.

type Acao = "desconto" | "ajuste" | "definirDe" | "limparDe" | "arredondar"

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 })

function num(v: unknown): number {
  const n = Number(String(v ?? "").replace(",", "."))
  return Number.isFinite(n) ? n : 0
}

const cent = (n: number) => Math.round(n * 100) / 100

/** Faz o preço terminar em ,90 / ,99 / inteiro, sempre pra baixo (nunca sobe). */
function terminarEm(valor: number, final: "90" | "99" | "00"): number {
  const inteiro = Math.floor(valor)
  const alvo = final === "00" ? inteiro : inteiro + (final === "90" ? 0.9 : 0.99)
  // Se arredondar pra baixo zeraria o preço, sobe uma unidade.
  return alvo > 0 ? cent(alvo) : cent(1 + (final === "00" ? 0 : final === "90" ? 0.9 : 0.99))
}

export function BulkPriceModal({
  rows,
  onClose,
  onDone,
}: {
  /** Produtos selecionados (linhas completas do catálogo). */
  rows: ProductRow[]
  onClose: () => void
  onDone: (msg: { ok: boolean; text: string }) => void
}) {
  const [acao, setAcao] = useState<Acao>("desconto")
  const [percent, setPercent] = useState("20")
  const [direcao, setDirecao] = useState<"baixar" | "subir">("baixar")
  const [tipo, setTipo] = useState<"percent" | "reais">("percent")
  const [valor, setValor] = useState("10")
  const [final, setFinal] = useState<"90" | "99" | "00">("90")
  const [salvando, setSalvando] = useState(false)

  // Calcula o resultado de cada produto — é isso que vira a prévia E o que é
  // enviado. Prévia e gravação saem do mesmo cálculo, nunca divergem.
  const previa = useMemo(() => {
    const p = num(percent)
    const v = num(valor)

    return rows.map((row) => {
      const precoAntes = num(row.price)
      const deAntes = String(row.compareAtPrice ?? "").trim()
      let preco = precoAntes
      let de = deAntes

      if (acao === "desconto") {
        // Padrão de e-commerce: o preço atual vira o riscado e o novo preço cai.
        de = String(cent(precoAntes))
        preco = cent(precoAntes * (1 - p / 100))
      } else if (acao === "ajuste") {
        const delta = tipo === "percent" ? precoAntes * (v / 100) : v
        preco = cent(direcao === "baixar" ? precoAntes - delta : precoAntes + delta)
      } else if (acao === "definirDe") {
        de = String(cent(precoAntes * (1 + p / 100)))
      } else if (acao === "limparDe") {
        de = ""
      } else if (acao === "arredondar") {
        preco = terminarEm(precoAntes, final)
      }

      const deNum = de ? num(de) : 0
      const invalido = !(preco > 0) || (Boolean(de) && deNum <= preco)

      return {
        row,
        nome: String(row.name ?? row.id),
        precoAntes,
        preco,
        deAntes,
        de,
        mudou: preco !== precoAntes || de !== deAntes,
        invalido,
      }
    })
  }, [rows, acao, percent, valor, tipo, direcao, final])

  const invalidos = previa.filter((p) => p.invalido)
  const mudam = previa.filter((p) => p.mudou && !p.invalido)

  async function aplicar() {
    setSalvando(true)
    try {
      const payload = mudam.map((p) => ({ ...p.row, price: String(p.preco), compareAtPrice: p.de }))
      const r = await fetch("/api/admin/products/bulk", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ rows: payload }),
      })
      const d = await r.json().catch(() => ({}))
      if (r.ok && d?.ok) {
        onDone({ ok: true, text: `Preço atualizado em ${d.salvos} produto(s).` })
      } else {
        onDone({ ok: false, text: d?.error || `Falhou em ${d?.falhas?.length ?? "alguns"} produto(s).` })
      }
    } catch {
      onDone({ ok: false, text: "Falha de conexão ao salvar." })
    } finally {
      setSalvando(false)
    }
  }

  const opcoes: { id: Acao; titulo: string; explica: string }[] = [
    {
      id: "desconto",
      titulo: "Criar desconto",
      explica: "O preço de hoje vira o riscado e o novo preço fica menor.",
    },
    { id: "ajuste", titulo: "Mudar o preço", explica: "Sobe ou desce o preço, sem mexer no riscado." },
    { id: "definirDe", titulo: "Só criar o riscado", explica: "Define o preço “de” acima do preço atual." },
    { id: "limparDe", titulo: "Tirar o riscado", explica: "Remove o preço “de”, fica só o preço normal." },
    { id: "arredondar", titulo: "Arredondar", explica: "Faz os preços terminarem igual (,90 · ,99 · inteiro)." },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-3 sm:items-center">
      <div className="w-full max-w-3xl rounded-xl border border-border bg-card shadow-xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-bold text-foreground">
              Editar preços · {rows.length} produto(s) selecionado(s)
            </h3>
          </div>
          <button onClick={onClose} className="rounded p-1 text-muted-foreground hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4">
          {/* Escolha da ação */}
          <div className="grid gap-2 sm:grid-cols-2">
            {opcoes.map((o) => (
              <button
                key={o.id}
                onClick={() => setAcao(o.id)}
                className={`rounded-lg border p-2.5 text-left transition-colors ${
                  acao === o.id ? "border-primary bg-muted" : "border-border hover:bg-muted/50"
                }`}
              >
                <div className="text-xs font-bold text-foreground">{o.titulo}</div>
                <div className="text-[11px] text-muted-foreground">{o.explica}</div>
              </button>
            ))}
          </div>

          {/* Campos da ação escolhida */}
          <div className="mt-3 rounded-lg bg-muted/50 p-3">
            {acao === "desconto" && (
              <label className="flex flex-wrap items-center gap-2 text-sm">
                Desconto de
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  className="w-20 rounded border border-border bg-background px-2 py-1 text-sm"
                />
                % sobre o preço atual
              </label>
            )}

            {acao === "ajuste" && (
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <select
                  value={direcao}
                  onChange={(e) => setDirecao(e.target.value as "baixar" | "subir")}
                  className="rounded border border-border bg-background px-2 py-1 text-sm"
                >
                  <option value="baixar">Baixar</option>
                  <option value="subir">Subir</option>
                </select>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="w-24 rounded border border-border bg-background px-2 py-1 text-sm"
                />
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as "percent" | "reais")}
                  className="rounded border border-border bg-background px-2 py-1 text-sm"
                >
                  <option value="percent">%</option>
                  <option value="reais">reais</option>
                </select>
              </div>
            )}

            {acao === "definirDe" && (
              <label className="flex flex-wrap items-center gap-2 text-sm">
                Preço “de” fica
                <input
                  type="number"
                  min="1"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  className="w-20 rounded border border-border bg-background px-2 py-1 text-sm"
                />
                % acima do preço
              </label>
            )}

            {acao === "limparDe" && (
              <p className="text-sm text-muted-foreground">
                O preço riscado sai da loja nos produtos selecionados. O preço normal não muda.
              </p>
            )}

            {acao === "arredondar" && (
              <label className="flex flex-wrap items-center gap-2 text-sm">
                Terminar em
                <select
                  value={final}
                  onChange={(e) => setFinal(e.target.value as "90" | "99" | "00")}
                  className="rounded border border-border bg-background px-2 py-1 text-sm"
                >
                  <option value="90">,90</option>
                  <option value="99">,99</option>
                  <option value="00">valor inteiro</option>
                </select>
                <span className="text-xs text-muted-foreground">(sempre pra baixo, nunca aumenta)</span>
              </label>
            )}
          </div>

          {/* Prévia */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Como vai ficar
              </span>
              <span className="text-[11px] text-muted-foreground">
                {mudam.length} muda(m) · {previa.length - mudam.length - invalidos.length} sem mudança
              </span>
            </div>

            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-[12px]">
                <thead className="bg-muted/60 text-left text-[10px] uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-2 py-1.5 font-semibold">Produto</th>
                    <th className="px-2 py-1.5 font-semibold">Preço</th>
                    <th className="px-2 py-1.5 font-semibold">Riscado (“de”)</th>
                  </tr>
                </thead>
                <tbody>
                  {previa.map((p) => (
                    <tr
                      key={p.row.id}
                      className={`border-t border-border/60 ${p.invalido ? "bg-red-50" : p.mudou ? "" : "opacity-50"}`}
                    >
                      <td className="max-w-[240px] truncate px-2 py-1.5 text-foreground">{p.nome}</td>
                      <td className="whitespace-nowrap px-2 py-1.5">
                        <span className="text-muted-foreground">{brl(p.precoAntes)}</span>
                        {p.preco !== p.precoAntes && (
                          <>
                            <ArrowRight className="mx-1 inline h-3 w-3 text-muted-foreground" />
                            <strong className={p.invalido ? "text-red-600" : "text-emerald-700"}>
                              {brl(p.preco)}
                            </strong>
                          </>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-2 py-1.5">
                        <span className="text-muted-foreground">
                          {p.deAntes ? brl(num(p.deAntes)) : "—"}
                        </span>
                        {p.de !== p.deAntes && (
                          <>
                            <ArrowRight className="mx-1 inline h-3 w-3 text-muted-foreground" />
                            <strong className={p.invalido ? "text-red-600" : "text-emerald-700"}>
                              {p.de ? brl(num(p.de)) : "—"}
                            </strong>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {invalidos.length > 0 && (
              <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-red-50 p-2 text-[11px] text-red-700">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {invalidos.length} produto(s) ficariam com preço inválido (zero, negativo, ou riscado menor que o
                preço). Ajuste o valor — nada é salvo enquanto isso.
              </p>
            )}
          </div>
        </div>

        {/* Rodapé */}
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border px-4 py-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-border px-3 py-2 text-sm font-bold text-foreground hover:bg-muted"
          >
            Cancelar
          </button>
          <button
            onClick={aplicar}
            disabled={salvando || invalidos.length > 0 || mudam.length === 0}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-primary-foreground disabled:opacity-50"
          >
            {salvando && <Loader2 className="h-4 w-4 animate-spin" />}
            {salvando ? "salvando…" : `Aplicar em ${mudam.length} produto(s)`}
          </button>
        </div>
      </div>
    </div>
  )
}
