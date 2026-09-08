"use client";

import { Crown, Medal, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SPONSOR_TIERS } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";

export function SponsorsSection() {
  const [platino, oro, institucional] = SPONSOR_TIERS;

  const LogoTile = ({
    name,
    initials,
    gradient,
    size = "md",
    border,
  }: {
    name: string;
    initials: string;
    gradient: string;
    size?: "lg" | "md" | "sm";
    border?: string;
  }) => (
    <div
      className={cn(
        "group/logo flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl border bg-surface p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        size === "lg" && "px-8 py-7",
        border ?? "border-lavender/40"
      )}
      title={name}
      tabIndex={0}
      role="img"
      aria-label={`Logo de ${name}`}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-xl bg-gradient-to-br font-display font-extrabold text-white shadow-md grayscale transition-all duration-300 group-hover/logo:scale-105 group-hover/logo:grayscale-0",
          gradient,
          size === "lg" && "h-20 w-20 text-2xl",
          size === "md" && "h-14 w-14 text-lg",
          size === "sm" && "h-11 w-11 text-sm"
        )}
        aria-hidden="true"
      >
        {initials}
      </span>
      <span
        className={cn(
          "text-center font-bold text-graphite/70 transition group-hover/logo:text-ink",
          size === "lg" && "font-display text-sm",
          size === "sm" && "text-[11px] leading-tight"
        )}
      >
        {name}
      </span>
    </div>
  );

  return (
    <section id="sponsors" className="relative overflow-hidden bg-turquoise-light/60 py-20 sm:py-24" aria-label="Sponsors y aliados">
      <div className="dots-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Sponsors 2026"
          title="Sponsors &"
          highlight="Aliados Estratégicos"
          description="Las empresas que hacen posible la feria más importante del Norte Argentino."
        />

        {/* Platino */}
        <ScrollReveal>
          <div className="mb-10">
            <TierHeader icon={<Crown className="h-5 w-5" aria-hidden="true" />} label={platino.title} accent="text-amber-500" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {platino.sponsors.map((s) => (
                <LogoTile
                  key={s.name}
                  name={s.name}
                  initials={s.initials}
                  gradient={s.gradient}
                  size="lg"
                  border="border-2 border-amber-300/80 shadow-[0_0_28px_-6px_rgba(245,180,60,0.45)]"
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Oro */}
        <ScrollReveal delay={0.08}>
          <div className="mb-10">
            <TierHeader icon={<Medal className="h-5 w-5" aria-hidden="true" />} label={oro.title} accent="text-slate-500" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {oro.sponsors.map((s) => (
                <LogoTile key={s.name} name={s.name} initials={s.initials} gradient={s.gradient} border="border-2 border-slate-300/80" />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Institucional */}
        <ScrollReveal delay={0.14}>
          <div>
            <TierHeader icon={<Handshake className="h-5 w-5" aria-hidden="true" />} label={institucional.title} accent="text-violet-ink" />
            <div className="grid grid-cols-2 gap-3 rounded-3xl bg-muted/70 p-5 sm:grid-cols-3 lg:grid-cols-6">
              {institucional.sponsors.map((s) => (
                <LogoTile key={s.name} name={s.name} initials={s.initials} gradient={s.gradient} size="sm" />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-brand h-14 rounded-full px-9 text-base font-bold text-white shadow-xl shadow-turquoise/30 transition hover:scale-[1.03] hover:shadow-2xl hover:brightness-110 active:scale-95"
            >
              <a href="#contacto">
                Convertite en Sponsor
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
            <p className="mt-3 text-sm text-muted-foreground">
              +40 marcas ya acompañan la edición 2026 · Cupos limitados por nivel
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function TierHeader({ icon, label, accent }: { icon: React.ReactNode; label: string; accent: string }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className={cn("flex items-center gap-2 font-display text-lg font-extrabold", accent)}>
        {icon}
        {label}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-lavender/60 to-transparent" aria-hidden="true" />
    </div>
  );
}
