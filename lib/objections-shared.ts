// Tipos e defaults das gavetas de quebra de objeção — conteúdo GLOBAL da loja
// (vale pra todos os produtos). Arquivo sem "server-only" de propósito: o
// painel admin (client) e a PDP importam daqui. A leitura/escrita no KV fica
// em lib/objections.ts (server).

export interface Objection {
  id: string
  title: string
  answer: string
}

export const OBJECTIONS_KEY = "objections:v1"
export const OBJECTIONS_TAG = "objections"

// Usados quando ainda não há nada salvo no KV — a seção já nasce útil.
export const DEFAULT_OBJECTIONS: Objection[] = [
  {
    id: "entrega",
    title: "Chega a tempo do Dia dos Pais?",
    answer:
      "Sim. Pedidos aprovados até 30/07 chegam antes do dia 09/08 para todo o Brasil. Você acompanha cada etapa pelo código de rastreio enviado por e-mail assim que o pedido é despachado.",
  },
  {
    id: "qualidade",
    title: "E se o produto não for o que eu esperava?",
    answer:
      "Você tem 30 dias para devolver. Se não gostar, se não servir ou se simplesmente mudar de ideia, devolvemos 100% do valor pago — sem burocracia e sem precisar justificar.",
  },
  {
    id: "seguranca",
    title: "É seguro comprar neste site?",
    answer:
      "Sim. O pagamento é processado em ambiente criptografado por gateway certificado, e a loja é operada por empresa com CNPJ ativo. Seus dados de cartão nunca ficam armazenados conosco.",
  },
  {
    id: "garantia",
    title: "O produto tem garantia?",
    answer:
      "Todos os produtos têm garantia contra defeitos de fabricação. Se chegar com qualquer problema, resolvemos com troca ou reembolso — é só falar com a gente pelo e-mail de atendimento.",
  },
]

// Normaliza o que veio do KV/painel: descarta itens sem título e garante id.
export function normalizeObjections(input: unknown): Objection[] {
  if (!Array.isArray(input)) return []
  return input
    .map((item, i) => {
      const o = item as Partial<Objection>
      const title = typeof o?.title === "string" ? o.title.trim() : ""
      const answer = typeof o?.answer === "string" ? o.answer.trim() : ""
      const id = typeof o?.id === "string" && o.id.trim() ? o.id.trim() : `item-${i + 1}`
      return { id, title, answer }
    })
    .filter((o) => o.title.length > 0)
}
