import { sanitizeDescriptionHtml } from "@/lib/rich-text"

// Renderiza o HTML gerado pelo editor rico do admin (app/admin/rich-text-editor.tsx).
// Sanitiza antes de injetar — é conteúdo do admin, mas vai pro site público.
// Descrições antigas (texto puro, sem tags) passam direto sem mudança visual.
export function RichDescription({ html, className = "" }: { html: string; className?: string }) {
  const safe = sanitizeDescriptionHtml(html ?? "")
  return (
    <div
      className={`[&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-lg [&_video]:my-4 [&_video]:max-w-full [&_video]:rounded-lg [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-[#1a1a1a] [&_h3]:mt-3 [&_h3]:mb-1.5 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-[#1a1a1a] [&_p]:mb-2 [&_ul]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_a]:underline [&_a]:text-[#b98a2e] first:[&_*]:mt-0 last:[&_*]:mb-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  )
}
