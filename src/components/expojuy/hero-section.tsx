"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Ticket, Store, ChevronDown, MapPin, CalendarDays } from "lucide-react";
import { EVENT } from "@/lib/data";
import { Countdown } from "./countdown";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
};

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-deep"
      aria-label="ExpoJuy 2026 — Inicio"
    >
      {/* Fondo */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/hero-feria.png"
          alt=""
          className="h-full w-full scale-105 object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Overlay degradado violeta oscuro → transparente */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep/95 via-deep/75 to-deep/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,45,142,0.35),transparent_65%)]" />
        <div className="dots-pattern-light absolute inset-0 opacity-40" />
      </div>

      {/* Halos decorativos */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-turquoise/25 blur-[110px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-violet-brand/40 blur-[120px]" aria-hidden="true" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-24 pt-36 text-center sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.1}>
          <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-turquoise sm:text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-turquoise opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-turquoise" />
            </span>
            25 Sep — 4 Oct 2026 · San Salvador de Jujuy
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.25}
          className="font-display mt-6 text-6xl font-black leading-none tracking-tight text-white drop-shadow-xl sm:text-8xl lg:text-[8.5rem]"
        >
          Expo<span className="text-gradient-soft">Juy</span>
          <span className="ml-3 inline-block bg-gradient-brand rounded-2xl px-3 pb-1.5 pt-0.5 text-[0.55em] align-middle shadow-xl shadow-turquoise/25 sm:ml-5 sm:px-4">
            2026
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.4}
          className="font-display mt-5 text-xl font-bold tracking-wide text-lavender sm:text-2xl lg:text-3xl"
        >
          Conectando Países <span className="text-turquoise">—</span> Creando Oportunidades
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.52}
          className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg"
        >
          La feria de producción, tecnología, innovación y comercio exterior más importante
          del Norte Argentino. <strong className="text-white">San Salvador de Jujuy.</strong>
        </motion.p>

        {/* Countdown */}
        <div className="mt-9 w-full">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white/60">
            El evento comienza en
          </p>
          <Countdown />
        </div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1.35}
          className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 w-full rounded-full border-2 border-lavender bg-white/5 px-8 text-base font-bold text-white backdrop-blur transition hover:border-white hover:bg-white hover:text-violet-brand hover:shadow-2xl sm:w-auto"
          >
            <a href="#contacto">
              <Store className="h-5 w-5" aria-hidden="true" />
              Quiero ser Expositor
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-gradient-brand btn-shine h-14 w-full rounded-full px-8 text-base font-bold text-white shadow-xl shadow-violet-brand/40 transition hover:scale-[1.03] hover:shadow-2xl hover:brightness-110 active:scale-95 sm:w-auto"
          >
            <a href="#entradas">
              <Ticket className="h-5 w-5" aria-hidden="true" />
              Comprar Entradas
            </a>
          </Button>
        </motion.div>

        {/* Info rápida */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1.5}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-white/65 sm:text-sm"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-turquoise" aria-hidden="true" />
            {EVENT.venue}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-turquoise" aria-hidden="true" />
            {EVENT.schedule}
          </span>
        </motion.div>
      </div>

      {/* Scroll down */}
      <motion.a
        href="#sobre"
        aria-label="Desplazarse hacia abajo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-white/70 transition hover:text-turquoise"
      >
        <span className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="animate-bounce-soft h-6 w-6" aria-hidden="true" />
        </span>
      </motion.a>
    </section>
  );
}
