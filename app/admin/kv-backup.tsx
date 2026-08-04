"use client"

import { useRef, useState } from "react"
import { AlertTriangle, Database, Download, Loader2, Upload } from "lucide-react"

// Backup e migração do banco, direto do painel.
//
// Existe porque a credencial do Upstash pode estar marcada como "sensitive" na
// Vercel — invisível até pra quem administra o projeto. Quem consegue ler o
// banco é o servidor da loja, então é ele quem exporta.
//
// Uso na migração: exporta aqui → troca a variável do Upstash na Vercel →
// Redeploy → volta e importa o arquivo (agora já no banco novo).
export function KvBackup({ banco }: { banco?: string | null }) {
  const [baixando, setBaixando] = useState(false)
  const [importando, setImportando] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; texto: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function baixar() {
    setBaixando(true)
    setMsg(null)
    try {
      const r = await fetch("/api/admin/kv-export")
      if (!r.ok) {
        const d = await r.json().catch(() => ({}))
        throw new Error(d?.error || `erro ${r.status}`)
      }
      const blob = await r.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `backup-${banco || "kv"}-${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      setMsg({ ok: true, texto: "Backup baixado. Guarde num lugar seguro — tem dado de cliente dentro." })
    } catch (e) {
      setMsg({ ok: false, texto: `Não deu pra exportar: ${(e as Error)?.message}` })
    } finally {
      setBaixando(false)
    }
  }

  async function importar(arquivo: File, sobrescrever: boolean) {
    setImportando(true)
    setMsg(null)
    try {
      const texto = await arquivo.text()
      const dump = JSON.parse(texto)
      const r = await fetch("/api/admin/kv-import", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...dump, sobrescrever }),
      })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d?.error || `erro ${r.status}`)
      setMsg({
        ok: d.ok,
        texto: `Importado no banco "${d.destino}": ${d.gravados} gravado(s), ${d.pulados} já existia(m)${
          d.totalFalhas ? `, ${d.totalFalhas} falha(s)` : ""
        }.`,
      })
    } catch (e) {
      setMsg({ ok: false, texto: `Não deu pra importar: ${(e as Error)?.message}` })
    } finally {
      setImportando(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-2">
        <Database className="mt-0.5 h-5 w-5 text-muted-foreground" />
        <div className="flex-1">
          <h3 className="text-sm font-bold text-foreground">Backup e migração do banco</h3>
          <p className="text-xs text-muted-foreground">
            Baixa tudo que está no banco {banco ? <strong>{banco}</strong> : "atual"} — pedidos, catálogo editado,
            configuração de gateway, relay e bump.
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={baixar}
          disabled={baixando}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-primary-foreground disabled:opacity-50"
        >
          {baixando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Baixar backup
        </button>

        <button
          onClick={() => inputRef.current?.click()}
          disabled={importando}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-bold text-foreground hover:bg-muted disabled:opacity-50"
        >
          {importando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Restaurar arquivo
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (!f) return
            const sobrescrever = window.confirm(
              "Sobrescrever chaves que já existem neste banco?\n\n" +
                "OK = substitui o que já está lá.\n" +
                "Cancelar = grava só o que falta (mais seguro)."
            )
            importar(f, sobrescrever)
          }}
        />
      </div>

      {msg && (
        <p className={`mt-2 text-xs font-semibold ${msg.ok ? "text-emerald-700" : "text-red-600"}`}>{msg.texto}</p>
      )}

      <div className="mt-3 rounded-lg bg-muted/60 p-2.5">
        <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            <strong>Pra trocar de banco:</strong> baixe o backup → troque{" "}
            <code className="font-mono">UPSTASH_REDIS_REST_URL</code> e o token na Vercel → Redeploy → volte aqui e
            restaure o arquivo. O arquivo tem nome, CPF, telefone e endereço dos clientes: trate como documento
            sigiloso.
          </span>
        </p>
      </div>
    </div>
  )
}
