"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Objection } from "@/lib/objections-shared"

// Gavetas de quebra de objeção — conteúdo GLOBAL: os mesmos itens aparecem em
// todos os produtos, editados numa única aba do painel admin.
export function ObjectionsSection({ items }: { items: Objection[] }) {
  if (!items?.length) return null

  return (
    <section className="border-t border-[#e5e5e5] bg-white px-4 py-8 md:px-0 md:py-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-lg font-bold text-[#1a1a1a] md:text-xl">Perguntas frequentes</h2>
        <p className="mt-1 text-sm text-[#737373]">
          As dúvidas mais comuns antes de finalizar a compra.
        </p>

        <Accordion type="single" collapsible className="mt-5 w-full">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-[#f0f0f0] last:border-b-0"
            >
              <AccordionTrigger className="py-4 text-left text-sm font-semibold text-[#1a1a1a] hover:no-underline md:text-base">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <p className="whitespace-pre-line pb-2 text-sm leading-relaxed text-[#737373]">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
