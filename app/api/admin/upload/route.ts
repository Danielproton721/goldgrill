import { NextResponse } from "next/server"
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { isAuthed } from "@/lib/admin-auth"

export const dynamic = "force-dynamic"

const MAX_IMAGE_BYTES = 15 * 1024 * 1024
const MAX_VIDEO_BYTES = 100 * 1024 * 1024

// Gera o token de upload direto-do-navegador pro editor de descrição
// (app/admin/rich-text-editor.tsx). O arquivo nunca passa por esta function —
// só o token; o navegador manda o binário direto pro Vercel Blob.
export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
  }

  let body: HandleUploadBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 })
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const kind = clientPayload === "video" ? "video" : "image"
        return {
          allowedContentTypes: kind === "video" ? ["video/*"] : ["image/*"],
          maximumSizeInBytes: kind === "video" ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES,
          addRandomSuffix: true,
        }
      },
      onUploadCompleted: async () => {},
    })
    return NextResponse.json(jsonResponse)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro no upload." }, { status: 400 })
  }
}
