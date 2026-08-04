// Compressão de imagem no navegador, antes do upload.
//
// Existe porque o editor de descrição subia o arquivo original: um PNG de
// 4,4 MB do ChatGPT ia inteiro pro storage e era servido cru na página (a
// descrição usa <img> direto, sem passar pelo otimizador do Next). Quatro
// dessas na mesma página = ~18 MB por visita, e a franquia de transferência do
// Vercel Blob (10 GB/mês) morreu em 13 dias — com a página do produto principal
// quebrada por um mês.
//
// A descrição renderiza a imagem em ~700px de largura, então guardar 4000px é
// desperdício puro. 1400px cobre tela retina com folga.
//
// Roda 100% no navegador (canvas), sem dependência nova e sem chave nova.

const LARGURA_MAX = 1400
const QUALIDADE = 0.82

export type ResultadoCompressao = {
  arquivo: File
  antes: number
  depois: number
  /** true quando o original foi mantido (formato que não vale recomprimir) */
  intacto: boolean
  motivo?: string
}

// GIF pode ser animado (o canvas mataria a animação) e SVG é vetor: nos dois o
// original é melhor. Ambos costumam ser leves de qualquer forma.
const NAO_MEXER = ["image/gif", "image/svg+xml"]

function trocarExtensao(nome: string, ext: string): string {
  const base = nome.replace(/\.[^.]+$/, "") || "imagem"
  return `${base}.${ext}`
}

async function paraBlob(canvas: HTMLCanvasElement, tipo: string, q: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, tipo, q))
}

export async function comprimirImagem(file: File): Promise<ResultadoCompressao> {
  const original: ResultadoCompressao = {
    arquivo: file,
    antes: file.size,
    depois: file.size,
    intacto: true,
  }

  if (!file.type.startsWith("image/")) return { ...original, motivo: "não é imagem" }
  if (NAO_MEXER.includes(file.type)) return { ...original, motivo: "formato preservado" }

  try {
    const bitmap = await createImageBitmap(file)
    const escala = Math.min(1, LARGURA_MAX / bitmap.width)
    const largura = Math.round(bitmap.width * escala)
    const altura = Math.round(bitmap.height * escala)

    const canvas = document.createElement("canvas")
    canvas.width = largura
    canvas.height = altura
    const ctx = canvas.getContext("2d")
    if (!ctx) return { ...original, motivo: "canvas indisponível" }
    ctx.drawImage(bitmap, 0, 0, largura, altura)
    bitmap.close?.()

    // WebP primeiro (bem menor); JPEG como reserva se o navegador não codificar.
    let saida = await paraBlob(canvas, "image/webp", QUALIDADE)
    let ext = "webp"
    if (!saida || saida.type !== "image/webp") {
      saida = await paraBlob(canvas, "image/jpeg", QUALIDADE)
      ext = "jpg"
    }
    if (!saida) return { ...original, motivo: "navegador não converteu" }

    // Se comprimir não ajudou (imagem já pequena e otimizada), fica com o original.
    if (saida.size >= file.size) return { ...original, motivo: "original já era menor" }

    const comprimido = new File([saida], trocarExtensao(file.name, ext), { type: saida.type })
    return { arquivo: comprimido, antes: file.size, depois: comprimido.size, intacto: false }
  } catch {
    // Falha na conversão nunca deve impedir o upload — sobe o original.
    return { ...original, motivo: "não deu pra converter" }
  }
}

export function formatarBytes(n: number): string {
  if (n >= 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`
  return `${Math.round(n / 1024)} KB`
}
