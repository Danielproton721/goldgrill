// Helpers pro campo `description` do produto, que agora guarda HTML (editor
// rico do admin) em vez de texto puro. Ver app/admin/rich-text-editor.tsx
// (onde o HTML é gerado) e components/store/rich-description.tsx (onde é
// renderizado pro público).

import DOMPurify from "isomorphic-dompurify"

const ALLOWED_TAGS = [
  "p",
  "h2",
  "h3",
  "strong",
  "em",
  "u",
  "s",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "video",
  "br",
]

const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "controls", "class"]

// Sanitiza o HTML da descrição antes de renderizar na PDP (conteúdo público,
// gerado no editor do admin — sanitiza mesmo assim como defesa em profundidade).
export function sanitizeDescriptionHtml(html: string): string {
  return DOMPurify.sanitize(html ?? "", { ALLOWED_TAGS, ALLOWED_ATTR })
}

// Remove todas as tags e colapsa espaços — usado no <meta name="description">
// (SEO) e na extração de características por regex, que espera texto puro.
export function stripHtmlToText(html: string): string {
  const text = DOMPurify.sanitize(html ?? "", { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
  return text.replace(/\s+/g, " ").trim()
}
