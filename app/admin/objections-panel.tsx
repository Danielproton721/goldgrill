"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Loader2, Plus, Trash2 } from "lucide-react"
import type { Objection } from "@/lib/objections-shared"

// Editor das gavetas de quebra de objeção. O conteúdo é GLOBAL: o que for
// salvo aqui aparece na página de TODOS os produtos.
export function ObjectionsPanel({ kvOk }: { kvOk: boolean }) {
  const [items, setItems] = useState<Objection[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/admin/objections", { cache: "no-store" })
        const data = await res.json()
        setItems(Array.isArray(data?.items) ? data.items : [])
      } catch {
        setMsg({ type: "err", text: "Não consegui carregar." })
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  function update(idx: number, patch: Partial<Objection>) {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)))
  }

  function addItem() {
    setItems((prev) => [...prev, { id: `item-${Date.now()}`, title: "", answer: "" }])
  }

  function removeItem(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx))
  }

  function move(idx: number, dir: -1 | 1) {
    setItems((prev) => {
      const next = [...prev]
      const target = idx + dir
      if (target < 0 || target >= next.length) return prev
      ;[next[idx], next[target]] = [next[target], next[idx]]
      return next
    })
  }

  async function save() {
    setSaving(true)
    setMsg(null)
    try {
      const res = await fetch("/api/admin/objections", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Erro ao salvar.")
      setItems(Array.isArray(data?.items) ? data.items : items)
      setMsg({ type: "ok", text: "Salvo! Já vale para todos os produtos da loja." })
    } catch (e: any) {
      setMsg({ type: "err", text: e?.message || "Erro ao salvar." })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Carregando…
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-sm font-bold text-foreground">Quebra de objeções (perguntas frequentes)</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Estas gavetas aparecem abaixo da descrição em <strong>todos os produtos</strong> da loja. O
          que você editar aqui muda em todos de uma vez.
        </p>
      </div>

      {!kvOk && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-50 p-3 text-xs text-amber-800">
          KV (Upstash) não configurado — dá pra editar na tela, mas não salvar.
        </div>
      )}

      {msg && (
        <div
          className={`rounded-xl border p-3 text-sm ${
            msg.type === "ok"
              ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-700"
              : "border-destructive/30 bg-destructive/5 text-destructive"
          }`}
        >
          {msg.text}
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={item.id} className="rounded-xl border border-border bg-card p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-muted-foreground">Gaveta {idx + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(idx, -1)}
                  disabled={idx === 0}
                  title="Mover para cima"
                  className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => move(idx, 1)}
                  disabled={idx === items.length - 1}
                  title="Mover para baixo"
                  className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  title="Remover gaveta"
                  className="rounded-lg border border-border p-1.5 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <label className="block text-xs font-semibold text-muted-foreground">
              Título (a pergunta / objeção)
              <input
                value={item.title}
                onChange={(e) => update(idx, { title: e.target.value })}
                placeholder="Ex.: Chega a tempo do Dia dos Pais?"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              />
            </label>

            <label className="mt-3 block text-xs font-semibold text-muted-foreground">
              Resposta (a quebra da objeção)
              <textarea
                value={item.answer}
                onChange={(e) => update(idx, { answer: e.target.value })}
                rows={3}
                placeholder="Responda de forma direta, tirando o medo de comprar."
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              />
            </label>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-bold text-foreground hover:bg-muted"
        >
          <Plus className="h-4 w-4" /> Adicionar gaveta
        </button>
        <button
          type="button"
          onClick={save}
          disabled={saving || !kvOk}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-colors hover:brightness-110 disabled:opacity-50"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Salvar para toda a loja
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-center text-xs text-muted-foreground">
          Sem gavetas — a seção não vai aparecer nos produtos.
        </p>
      )}
    </div>
  )
}
