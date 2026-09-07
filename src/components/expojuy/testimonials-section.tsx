"use client";

import * as React from "react";
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareHeart } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  edition: string;
  initials: string;
  rating: number;
  tone: "turquoise" | "violet" | "lavender";
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Cerramos distribuciones con tres compradores de Bolivia y Chile en una sola ronda de negocios. ExpoJuy no es una feria más: es la puerta de entrada al mercado del NOA.",
    name: "Marcela Vilte",
    role: "Gerenta Comercial · Agroindustrial Qullpa",
    edition: "Expositora · ExpoJuy 2025",
    initials: "MV",
    rating: 5,
    tone: "violet",
  },
  {
    quote:
      "Presentamos nuestra línea de monitoreo con IA para mineras y nos llevaron una sorpresa: la agenda de reuniones B2B se llenó el primer día. Volvimos con un piloto firmado.",
    name: "Diego Aramayo",
    role: "CEO · TechAndes Sistemas",
    edition: "Expositor · Pabellón Tecnología",
    initials: "DA",
    rating: 5,
    tone: "turquoise",
  },
  {
    quote:
      "Fui por el escenario de economía del conocimiento y terminé armando una alianza con un hub de innovación de Salta. La feria te conecta sin darte cuenta.",
    name: "Lucía Cruz",
    role: "Desarrolladora & emprendedora",
    edition: "Visitante · ExpoJuy 2025",
    initials: "LC",
    rating: 5,
    tone: "lavender",
  },
  {
    quote:
      "Como prensa internacional, destacar el nivel organizativo: centro de medios impecable, acceso fluido con credenciales QR y entrevistas con los disertantes en el mismo día.",
    name: "Rodrigo Méndez",
    role: "Editor · Portal Comercio Exterior",
    edition: "Prensa acreditada",
    initials: "RM",
    rating: 5,
    tone: "turquoise",
  },
  {
    quote:
      "El pabellón de litio y energías renovables nos permitió mostrar el potencial de Jujuy frente a inversionistas de tres países. El año que viene vamos con el doble de espacio.",
    name: "Ing. Carlos Quispe",
    role: "Director · Cámara Minera de Jujuy",
    edition: "Expositor institucional",
    initials: "CQ",
    rating: 5,
    tone: "violet",
  },
  {
    quote:
      "Vinimos con la familia un domingo y los chicos disfrutaron las actividades científicas mientras nosotros cerrábamos proveedores para nuestro comercio. Hay ExpoJuy para todos.",
    name: "Silvina Ramador",
    role: "Comerciante · San Salvador de Jujuy",
    edition: "Visitante · Abono full",
    initials: "SR",
    rating: 5,
    tone: "lavender",
  },
];

const TONE_STYLES: Record<Testimonial["tone"], { ring: string; chip: string; bar: string }> = {
  turquoise: {
    ring: "from-turquoise to-blue-bright",
    chip: "bg-turquoise-light text-turquoise-ink",
    bar: "bg-turquoise",
  },
  violet: {
    ring: "from-violet-brand to-violet-dark",
    chip: "bg-violet-brand/10 text-violet-ink",
    bar: "bg-violet-brand",
  },
  lavender: {
    ring: "from-lavender to-violet-brand",
    chip: "bg-lavender/25 text-violet-dark",
    bar: "bg-lavender",
  },
};

export function TestimonialsSection() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const next = React.useCallback(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), []);
  const prev = React.useCallback(
    () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    []
  );

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = TESTIMONIALS[index];
  const tone = TONE_STYLES[t.tone];

  return (
    <section
      id="testimonios"
      className="relative overflow-hidden bg-gradient-to-b from-background via-turquoise-light/50 to-background py-20 sm:py-24"
      aria-label="Testimonios de ExpoJuy"
    >
      {/* Marca de agua gigante */}
      <span
        className="font-display pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none text-[16rem] font-black leading-none text-lavender/10 sm:text-[22rem]"
        aria-hidden="true"
      >
        ”
      </span>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Voces de la feria"
          title="Lo que dicen quienes ya"
          highlight="vivieron ExpoJuy"
          description="Expositores, visitantes, prensa e instituciones que hicieron de cada edición el mayor punto de encuentro del Norte Argentino."
        />

        <ScrollReveal delay={0.1}>
          <div
            className="relative mx-auto mt-12 max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Card principal */}
            <div className="relative overflow-hidden rounded-[2rem] border-2 border-lavender/40 bg-surface p-7 shadow-xl shadow-violet-brand/5 sm:p-10">
              <div className={cn("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r", tone.ring)} aria-hidden="true" />
              <Quote className="absolute right-6 top-6 h-12 w-12 text-lavender/30" aria-hidden="true" />

              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Estrellas */}
                  <div
                    className="flex items-center gap-1"
                    aria-label={`Puntuación: ${t.rating} de 5 estrellas`}
                  >
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>

                  <blockquote className="font-display mt-4 text-lg font-semibold leading-relaxed text-ink sm:text-xl">
                    “{t.quote}”
                  </blockquote>

                  <figcaption className="mt-6 flex flex-wrap items-center gap-4">
                    <span
                      className={cn(
                        "flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-gradient-to-br p-[3px] shadow-md",
                        tone.ring
                      )}
                      aria-hidden="true"
                    >
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-surface p-[3px]">
                        <span
                          className={cn(
                            "font-display flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-sm font-black text-white",
                            tone.ring
                          )}
                        >
                          {t.initials}
                        </span>
                      </span>
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-base font-extrabold text-ink">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                      <span
                        className={cn(
                          "mt-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold",
                          tone.chip
                        )}
                      >
                        <MessageSquareHeart className="h-3 w-3" aria-hidden="true" />
                        {t.edition}
                      </span>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Controles */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Testimonio anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-lavender/50 bg-surface text-violet-ink transition hover:-translate-y-0.5 hover:border-violet-brand hover:shadow-lg"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2" role="tablist" aria-label="Seleccionar testimonio">
                {TESTIMONIALS.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonio ${i + 1}: ${item.name}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300",
                      i === index ? "w-8 bg-gradient-brand" : "w-2.5 bg-lavender/50 hover:bg-lavender"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Testimonio siguiente"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-lavender/50 bg-surface text-violet-ink transition hover:-translate-y-0.5 hover:border-violet-brand hover:shadow-lg"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
