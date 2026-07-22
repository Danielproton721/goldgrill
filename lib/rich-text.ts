// Helpers pro campo `description` do produto, que agora guarda HTML (editor
// rico do admin) em vez de texto puro. Ver app/admin/rich-text-editor.tsx
// (onde o HTML é gerado) e components/store/rich-description.tsx (onde é
// renderizado pro público).
//
// Usa `sanitize-html` (parser htmlparser2, JS puro) e NÃO `isomorphic-dompurify`:
// aquele carrega jsdom, que quebrava na regeneração ISR da página de produto no
// serverless — a página falhava em silêncio e servia o HTML velho, fazendo as
// edições do painel só aparecerem depois de um deploy novo.

import sanitizeHtml from "sanitize-html"

const ALLOWED_TAGS = [
  "p",
  "h2",
  "h3",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "video",
  "br",
  "span",
]

// Sanitiza o HTML da descrição antes de renderizar na PDP (conteúdo público,
// gerado no editor do admin — sanitiza mesmo assim como defesa em profundidade).
export function sanitizeDescriptionHtml(html: string): string {
  return sanitizeHtml(html ?? "", {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "class"],
      video: ["src", "controls", "class"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  })
}

// Remove todas as tags e colapsa espaços — usado no <meta name="description">
// (SEO) e na extração de características por regex, que espera texto puro.
export function stripHtmlToText(html: string): string {
  const text = sanitizeHtml(html ?? "", { allowedTags: [], allowedAttributes: {} })
  return text.replace(/&amp;/g, "&").replace(/\s+/g, " ").trim()
}
