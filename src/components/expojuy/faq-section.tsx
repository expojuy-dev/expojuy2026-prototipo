"use client";

import * as React from "react";
import { MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQS } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";

export function FaqSection() {
  const [value, setValue] = React.useState("faq-0");

  // El buscador global (Ctrl+K) puede abrir una pregunta específica
  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const index = (e as CustomEvent<{ index: number }>).detail?.index;
      if (typeof index === "number" && FAQS[index]) {
        setValue(`faq-${index}`);
        requestAnimationFrame(() => {
          document
            .getElementById("faq")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    window.addEventListener("expojuy:open-faq", onOpen);
    return () => window.removeEventListener("expojuy:open-faq", onOpen);
  }, []);

  return (
    <section id="faq" className="bg-background py-20 sm:py-24" aria-label="Preguntas frecuentes">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Preguntas"
          highlight="frecuentes"
          description="Todo lo que necesitás saber antes de visitar o participar de ExpoJuy 2026."
        />

        <ScrollReveal>
          <Accordion
            type="single"
            collapsible
            value={value}
            onValueChange={setValue}
            className="w-full space-y-3"
          >
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="rounded-2xl border border-lavender/50 bg-surface px-5 shadow-sm transition-colors data-[state=open]:border-turquoise/60 data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="py-5 text-left hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lavender-light text-violet-ink transition-colors data-[state=open]:bg-turquoise-light">
                      <MessageCircleQuestion className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-[15px] font-bold leading-snug text-ink sm:text-base">
                      {faq.q}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-11 pr-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 rounded-3xl border border-lavender/50 bg-lavender-light/70 p-7 text-center">
            <p className="font-display text-lg font-bold text-ink">¿Tenés otra consulta?</p>
            <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
              Escribinos y nuestro equipo te responde dentro de las próximas 24 horas hábiles.
            </p>
            <Button
              asChild
              className="bg-gradient-brand mt-5 rounded-full px-8 py-6 font-bold text-white shadow-lg hover:brightness-110"
            >
              <a href="#contacto">Ir al formulario de contacto</a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
