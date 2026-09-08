"use client";

import {
  Lightbulb,
  Monitor,
  Factory,
  TrendingUp,
  Handshake,
  Brain,
  Store,
  Users,
  CalendarDays,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { VALUES, STATS } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { ScrollReveal, StaggerContainer, staggerItem } from "./scroll-reveal";
import { motion } from "framer-motion";
import { AnimatedCounter } from "./animated-counter";
import { CamaraLogo } from "./logo";

const VALUE_ICONS: Record<string, React.ElementType> = {
  lightbulb: Lightbulb,
  monitor: Monitor,
  factory: Factory,
  "trending-up": TrendingUp,
  handshake: Handshake,
  brain: Brain,
};

const VALUE_STYLES: Record<string, string> = {
  turquoise: "bg-turquoise/12 text-turquoise-ink group-hover:bg-turquoise group-hover:text-white",
  blue: "bg-blue-bright/12 text-blue-bright group-hover:bg-blue-bright group-hover:text-white",
  violet: "bg-violet-brand/12 text-violet-ink group-hover:bg-violet-brand group-hover:text-white",
};

const STAT_ICONS: Record<string, React.ElementType> = {
  store: Store,
  users: Users,
  calendar: CalendarDays,
  "layout-grid": LayoutGrid,
};

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="relative bg-lavender-light/60 py-20 sm:py-24"
      aria-label="Sobre ExpoJuy 2026"
    >
      {/* Waves decorativas montadas exactamente sobre el límite superior de la sección (mismo patrón que el footer) */}
      <div className="absolute bottom-full left-0 right-0 w-full h-16 sm:h-24 pointer-events-none overflow-hidden bg-transparent" aria-hidden="true">
        <svg
          className="absolute bottom-0 w-full h-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,58.7C840,64,960,96,1080,96C1200,96,1320,64,1380,48L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            className="fill-violet-600/[0.06] dark:fill-violet-600/[0.20]"
          />
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            className="fill-cyan-500/[0.08] dark:fill-cyan-500/[0.30]"
          />
          <path
            d="M0,96L60,90.7C120,85,240,75,360,80C480,85,600,107,720,106.7C840,107,960,85,1080,80C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            className="fill-[#F9F6FB] dark:fill-[#0d0a1e]"
          />
        </svg>
      </div>
      <div className="dots-pattern pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Sobre ExpoJuy 2026"
          title="El encuentro que"
          highlight="une al Norte con el mundo"
          description="ExpoJuy 2026 es la plataforma de vinculación más importante entre empresas, productores, instituciones y público general del NOA y países limítrofes. Durante 10 días, San Salvador de Jujuy se convierte en la capital regional de los negocios, la tecnología y la innovación productiva."
        />

        {/* Cards de valores */}
        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value) => {
            const Icon = VALUE_ICONS[value.icon] ?? Lightbulb;
            return (
              <motion.div key={value.title} variants={staggerItem}>
                <Card className="group h-full border-lavender/40 bg-surface/85 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-turquoise/50 hover:shadow-xl hover:shadow-turquoise/10">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <span
                      className={`inline-flex h-13 w-13 items-center justify-center rounded-2xl p-3 transition-all duration-300 ${VALUE_STYLES[value.color]}`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-bold text-ink">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </StaggerContainer>

        {/* Métricas */}
        <ScrollReveal delay={0.1} className="mt-16">
          <div className="gradient-ring overflow-hidden rounded-3xl bg-deep shadow-2xl shadow-deep/30">
            <div className="dots-pattern-light absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="relative grid grid-cols-2 gap-y-10 px-6 py-12 sm:px-10 lg:grid-cols-4">
              {STATS.map((stat) => {
                const Icon = STAT_ICONS[stat.icon] ?? Store;
                return (
                  <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
                    <span className="glass flex h-11 w-11 items-center justify-center rounded-xl text-turquoise">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="font-display text-4xl font-extrabold text-white sm:text-5xl"
                    />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lavender sm:text-sm">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Línea arcoíris */}
            <div className="rainbow-line h-1 w-full" aria-hidden="true" />
          </div>
        </ScrollReveal>

        {/* Organizador */}
        <ScrollReveal delay={0.15} className="mt-12">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-lavender/40 bg-surface p-7 shadow-sm sm:flex-row sm:p-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <CamaraLogo />
            </div>
            <p className="max-w-md text-center text-sm leading-relaxed text-muted-foreground sm:text-left">
              Con el respaldo de la <strong className="text-violet-ink">Cámara de Comercio Exterior de Jujuy</strong>,
              institución con más de 30 años de trayectoria impulsando la internacionalización
              de las empresas del norte argentino.
            </p>
            <a
              href="#contacto"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-violet-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-dark hover:shadow-lg hover:shadow-violet-brand/30"
            >
              Sumate al evento
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
