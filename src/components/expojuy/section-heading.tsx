"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <ScrollReveal
      className={cn(
        "mb-12 flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em]",
          light
            ? "border-turquoise/40 bg-turquoise/10 text-turquoise"
            : "border-violet-brand/25 bg-lavender-light text-violet-ink"
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", light ? "bg-turquoise" : "bg-violet-brand")} />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "font-display max-w-3xl text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}{" "}
        {highlight ? <span className="text-gradient">{highlight}</span> : null}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-white/75" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
      <span className="rainbow-line mt-1 h-1 w-20 rounded-full opacity-90" aria-hidden="true" />
    </ScrollReveal>
  );
}
