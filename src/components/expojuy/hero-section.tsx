"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Store, MapPin, Play, ArrowRight } from "lucide-react";
import { ExpoJuyIcon } from "./logo";

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
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:bg-[#080811] dark:from-[#080811] dark:via-[#080811] dark:to-[#080811]"
      aria-label="ExpoJuy 2026 — Inicio"
    >
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <img
          src="/images/hero-feria.png"
          alt=""
          className="h-full w-full object-cover object-center opacity-70 brightness-110 dark:opacity-100 dark:brightness-90 dark:contrast-105"
          loading="eager"
        />
        {/* Light mode overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-50% to-transparent dark:from-[#080811] dark:via-[#080811]/90 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#080811] dark:via-transparent dark:to-[#080811]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.06),transparent_60%)] dark:bg-gradient-to-tr dark:from-violet-950/40 dark:via-transparent dark:to-cyan-950/30" />
      </div>

      {/* ── Ambient glow spheres (dark mode only) ── */}
      <div className="ambient-sphere-violet absolute -top-24 left-[10%] hidden dark:block" aria-hidden="true" />
      <div className="ambient-sphere-cyan absolute top-1/4 right-[5%] hidden dark:block" aria-hidden="true" />

      {/* ── Main content container ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col lg:flex-row items-center justify-between gap-12 px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

        {/* ── LEFT COLUMN: Content & Editorial Typography ── */}
        <motion.div
          initial="hidden"
          animate="show"
          className="w-full lg:max-w-2xl flex flex-col justify-center text-left space-y-7"
        >
          {/* Badge with venue & date */}
          <motion.div variants={fadeUp} custom={0.1} className="inline-flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase text-cyan-700 bg-cyan-50/90 border border-cyan-200/80 shadow-sm dark:py-1 dark:font-semibold dark:text-cyan-300 dark:bg-cyan-950/60 dark:border-cyan-500/30 dark:backdrop-blur-md dark:shadow-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-500 dark:bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
              </span>
              9 — 12 OCT 2026
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              • SAN SALVADOR DE JUJUY
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={fadeUp} custom={0.25} className="space-y-3">
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight leading-none text-slate-900 dark:text-white">
              Expo<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 dark:from-cyan-400 dark:via-cyan-300 dark:to-violet-400">Juy</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600 dark:from-violet-400 dark:via-purple-300 dark:to-cyan-400 font-extrabold text-4xl sm:text-6xl xl:text-7xl ml-1 inline-block">
                2026
              </span>
            </h1>
            <p className="text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100 flex flex-wrap items-center gap-x-2">
              <span className="text-slate-900 dark:text-slate-100">Conectando Países.</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 dark:from-cyan-300 dark:via-cyan-400 dark:to-violet-400 font-extrabold">
                Creando Oportunidades.
              </span>
            </p>
          </motion.div>

          {/* Description paragraph */}
          <motion.p
            variants={fadeUp}
            custom={0.4}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl"
          >
            La feria de producción, tecnología, innovación y comercio exterior
            más importante del Norte Argentino. Un punto de encuentro
            estratégico para la integración regional y global en{" "}
            <span className="text-slate-900 dark:text-white font-semibold underline decoration-cyan-400 dark:decoration-cyan-400/60 underline-offset-4">
              San Salvador de Jujuy
            </span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} custom={0.55} className="flex flex-wrap items-center gap-4 pt-1">
            <Button
              asChild
              size="lg"
              className="bg-gradient-m2-cta h-14 rounded-full px-7 font-bold text-sm tracking-wide text-white shadow-xl shadow-cyan-500/20 hover:shadow-cyan-400/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
            >
              <a href="#entradas">
                <span>Comprar Entradas</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 rounded-full px-6 font-semibold text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 hover:border-violet-400 hover:text-violet-700 shadow-sm dark:text-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/15 dark:hover:border-violet-400/50 dark:hover:text-white transition-all duration-200 dark:backdrop-blur-md"
            >
              <a href="#contacto">
                <Store className="h-4 w-4 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                <span>Quiero ser Expositor</span>
              </a>
            </Button>
          </motion.div>

          {/* Key Metrics Grid */}
          <motion.div
            variants={fadeUp}
            custom={0.7}
            className="pt-8 border-t border-slate-200 dark:border-white/10 grid grid-cols-3 gap-4 max-w-lg"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">4 Días</div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">Acceso Total</p>
            </div>
            <div className="border-l border-slate-200 dark:border-white/10 pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 tracking-tight">350+</div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">Expositores</p>
            </div>
            <div className="border-l border-slate-200 dark:border-white/10 pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-violet-600 dark:text-violet-400 tracking-tight">50K+</div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">Visitantes</p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN: Floating Interactive Highlights ── */}
        <motion.div
          initial="hidden"
          animate="show"
          className="w-full lg:w-auto flex flex-col items-start lg:items-end gap-5 lg:self-end pb-4"
        >
          {/* Location Badge (dark only — on light the image fades too much) */}
          <motion.div
            variants={fadeUp}
            custom={0.8}
            className="hidden dark:inline-flex glass-card-dark rounded-full px-4 py-2 items-center gap-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <MapPin className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
            Ciudad Cultural, Jujuy
          </motion.div>

          {/* Floating Virtual Tour Card */}
          <motion.div
            variants={fadeUp}
            custom={0.95}
            className="rounded-2xl p-4 sm:p-5 shadow-xl border flex items-center justify-between gap-4 group transition-all duration-300 w-full sm:w-80 backdrop-blur-xl border-slate-100 bg-white/95 hover:border-cyan-400 dark:glass-card-dark dark:glass-card-dark-hover dark:shadow-2xl dark:border-white/20 dark:hover:border-cyan-400/50 dark:bg-[#0b0c1b]/80"
          >
            {/* Thumbnail */}
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-violet-100 border border-violet-200/60 dark:bg-violet-950 dark:border-white/10">
              <ExpoJuyIcon size={56} className="w-full h-full p-1.5" />
              <div className="absolute inset-0 bg-violet-600/10 dark:bg-violet-900/30" />
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0 pr-1">
              <p className="text-[11px] font-bold text-cyan-600 dark:text-cyan-300 dark:font-semibold tracking-wide uppercase">
                Recorrido Virtual
              </p>
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors">
                Conocé la Expo 2026
              </p>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                Pabellón Central 360°
              </span>
            </div>
            {/* Play button */}
            <button
              type="button"
              aria-label="Ver video tour"
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-200 shrink-0 bg-violet-600 text-white group-hover:bg-cyan-500 group-hover:scale-110 active:scale-95 dark:bg-white dark:text-violet-950 dark:group-hover:bg-cyan-400 dark:group-hover:text-black dark:shadow-lg"
            >
              <Play className="h-4 w-4 ml-0.5" fill="currentColor" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Decorative wave separator at bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-20 sm:h-28 pointer-events-none z-10" aria-hidden="true">
        <svg
          className="absolute bottom-0 w-full h-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Violet Layer — subtle in light, stronger in dark */}
          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,58.7C840,64,960,96,1080,96C1200,96,1320,64,1380,48L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            className="fill-violet-600/[0.06] dark:fill-violet-600/[0.15]"
          />
          {/* Cyan Accent */}
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            className="fill-cyan-500/[0.08] dark:fill-cyan-500/[0.20]"
          />
          {/* Foreground Base (matches page bg) */}
          <path
            d="M0,96L60,90.7C120,85,240,75,360,80C480,85,600,107,720,106.7C840,107,960,85,1080,80C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            className="fill-white/95 dark:fill-background/95"
          />
        </svg>
      </div>
    </section>
  );
}
