"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface AccordionSectionProps {
  hairTypes?: string[]
  needs?: string[]
  benefits?: string[]
  description?: string
  howToUse?: string[]
  touchTest?: string[]
  precautions?: string[]
}

export function AccordionSection({
  hairTypes = [],
  needs = [],
  benefits = [],
  description = "",
  howToUse = [],
  touchTest = [],
  precautions = [],
}: AccordionSectionProps) {
  return (
    <div className="px-4 bg-[#ffffff]">
      {/* Description always visible first */}
      <div className="border-b border-[#f0f0f0] py-4">
        <h3 className="text-sm font-semibold text-[#1a1a1a] mb-2">Descrição do Produto</h3>
        <p className="text-sm text-[#737373] leading-relaxed">{description}</p>
      </div>

      <Accordion type="single" collapsible className="w-full hidden md:block">
        <AccordionItem value="hair-types" className="border-b border-[#f0f0f0]">
          <AccordionTrigger className="text-sm font-medium text-[#1a1a1a] hover:no-underline py-4">
            Tipos de Cabelos
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-1.5">
              {hairTypes.map((type, i) => (
                <li key={i} className="text-sm text-[#737373] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b98a2e] mt-1.5 shrink-0" />
                  {type}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="needs" className="border-b border-[#f0f0f0]">
          <AccordionTrigger className="text-sm font-medium text-[#1a1a1a] hover:no-underline py-4">
            Necessidades
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-1.5">
              {needs.map((need, i) => (
                <li key={i} className="text-sm text-[#737373] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b98a2e] mt-1.5 shrink-0" />
                  {need}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="benefits" className="border-b border-[#f0f0f0]">
          <AccordionTrigger className="text-sm font-medium text-[#1a1a1a] hover:no-underline py-4">
            Benefícios
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-1.5">
              {benefits.map((benefit, i) => (
                <li key={i} className="text-sm text-[#737373] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b98a2e] mt-1.5 shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="how-to-use" className="border-b border-[#f0f0f0]">
          <AccordionTrigger className="text-sm font-medium text-[#1a1a1a] hover:no-underline py-4">
            Modo de Uso
          </AccordionTrigger>
          <AccordionContent>
            <ol className="flex flex-col gap-2">
              {howToUse.map((step, i) => (
                <li key={i} className="text-sm text-[#737373] flex items-start gap-2">
                  <span className="text-xs font-bold text-[#b98a2e] mt-0.5 shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="touch-test" className="border-b border-[#f0f0f0]">
          <AccordionTrigger className="text-sm font-medium text-[#1a1a1a] hover:no-underline py-4">
            Prova de Toque
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2">
              {touchTest.map((item, i) => (
                <li key={i} className="text-sm text-[#737373] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b98a2e] mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="precautions" className="border-b-0">
          <AccordionTrigger className="text-sm font-medium text-[#1a1a1a] hover:no-underline py-4">
            Precaucoes
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2">
              {precautions.map((item, i) => (
                <li key={i} className="text-sm text-[#737373] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
