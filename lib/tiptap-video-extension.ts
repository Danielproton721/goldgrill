// Nó customizado do Tiptap pra vídeo — o Tiptap não vem com um pronto.
// Renderiza <video controls src="..."> e expõe o comando setVideo(src) pra
// inserir no cursor (usado pelo botão de vídeo em app/admin/rich-text-editor.tsx).

import { Node, mergeAttributes } from "@tiptap/core"

export interface VideoOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      setVideo: (src: string) => ReturnType
    }
  }
}

export const Video = Node.create<VideoOptions>({
  name: "video",
  group: "block",
  atom: true,
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {
        controls: "true",
        class: "rounded-lg",
      },
    }
  },

  addAttributes() {
    return {
      src: { default: null },
    }
  },

  parseHTML() {
    return [{ tag: "video" }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["video", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setVideo:
        (src: string) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: { src } }),
    }
  },
})
