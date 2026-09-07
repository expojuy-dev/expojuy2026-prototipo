"use client";

import * as React from "react";
import {
  Maximize2,
  FileDown,
  MapPin,
  Cross,
  Camera,
  Crown,
  Info,
  Car,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EXHIBITORS, ZONES, type ZoneId } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  estacionamiento: Car,
  enfermeria: Cross,
  prensa: Camera,
  vip: Crown,
  info: Info,
};

export function MapSection() {
  const [selected, setSelected] = React.useState<ZoneId>("tecnologia");
  const [hovered, setHovered] = React.useState<ZoneId | null>(null);
  const [tooltip, setTooltip] = React.useState<{ x: number; y: number } | null>(null);
  const [locatedId, setLocatedId] = React.useState<string | null>(null);
  const [accordionValue, setAccordionValue] = React.useState("z-tecnologia");
  const locatedRef = React.useRef<HTMLLIElement | null>(null);
  const clearTimer = React.useRef<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const zone = ZONES.find((z) => z.id === selected) ?? ZONES[0];
  const zoneExhibitors = EXHIBITORS.filter((e) => e.zone === selected);
  const hoverZone = ZONES.find((z) => z.id === hovered);
  const located = locatedId ? EXHIBITORS.find((e) => e.id === locatedId) ?? null : null;

  // "Ver en el mapa" desde el perfil de un expositor: selecciona su zona,
  // resalta el stand y lleva al visitante hasta el plano.
  React.useEffect(() => {
    const onLocate = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      const ex = EXHIBITORS.find((x) => x.id === id);
      if (!ex) return;
      setSelected(ex.zone as ZoneId);
      setAccordionValue(`z-${ex.zone}`);
      setLocatedId(ex.id);
      requestAnimationFrame(() => {
        document.getElementById("mapa")?.scrollIntoView({ behavior: "smooth", block: "start" });
        requestAnimationFrame(() => {
          locatedRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      });
      if (clearTimer.current) window.clearTimeout(clearTimer.current);
      clearTimer.current = window.setTimeout(() => setLocatedId(null), 12000);
    };
    window.addEventListener("expojuy:locate-exhibitor", onLocate);
    return () => {
      window.removeEventListener("expojuy:locate-exhibitor", onLocate);
      if (clearTimer.current) window.clearTimeout(clearTimer.current);
    };
  }, []);

  const enterFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await el.requestFullscreen();
    } catch {
      /* ignore */
    }
  };

  const downloadPdf = () => window.print();

  return (
    <section id="mapa" className="bg-lavender-light/60 py-20 sm:py-24" aria-label="Mapa del predio ferial">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Plano del Predio"
          title="Explorá el"
          highlight="predio ferial"
          description="Cuatro pabellones temáticos, escenario principal y un área de servicios completa. Pasá el mouse (o tocá) cada zona para ver qué empresas exponen ahí."
        />

        {/* ── Desktop: mapa + panel ── */}
        <ScrollReveal>
          <div className="hidden gap-6 lg:grid lg:grid-cols-[1.7fr_1fr]">
            <div
              ref={containerRef}
              className="relative overflow-hidden rounded-3xl border border-lavender/50 bg-surface shadow-sm"
            >
              <MapSvg
                selected={selected}
                hovered={hovered}
                onSelect={(z) => setSelected(z)}
                onHover={(z, pos) => {
                  setHovered(z);
                  setTooltip(pos);
                }}
                onLeave={() => {
                  setHovered(null);
                  setTooltip(null);
                }}
              />
              {/* Tooltip flotante */}
              {hoverZone && tooltip ? (
                <div
                  className="pointer-events-none absolute z-20 max-w-[240px] rounded-xl border border-white/15 bg-deep px-4 py-3 text-white shadow-2xl"
                  style={{
                    left: Math.min(tooltip.x + 16, 480),
                    top: Math.max(tooltip.y - 70, 8),
                  }}
                  role="tooltip"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-turquoise">
                    {hoverZone.short}
                  </p>
                  <p className="mt-0.5 text-sm font-bold leading-tight">{hoverZone.name}</p>
                  <p className="mt-1 text-xs leading-snug text-white/70">
                    {hoverZone.id === "servicios"
                      ? hoverZone.services?.slice(0, 3).join(" · ")
                      : `${EXHIBITORS.filter((e) => e.zone === hoverZone.id).length} expositores · Click para ver`}
                  </p>
                </div>
              ) : null}

              {/* Callout de stand ubicado (llega desde "Ver en el mapa") */}
              {located ? (
                <div className="absolute left-4 top-4 z-20 flex max-w-[300px] items-center gap-3 rounded-2xl border border-turquoise/60 bg-deep/95 px-4 py-3 shadow-2xl backdrop-blur">
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-turquoise text-deep">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-ping rounded-full bg-turquoise" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-turquoise">Stand ubicado</p>
                    <p className="truncate text-sm font-bold text-white">{located.name}</p>
                    <p className="text-[11px] text-white/70">{located.stand}</p>
                  </div>
                  <button
                    onClick={() => setLocatedId(null)}
                    className="ml-1 rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
                    aria-label="Quitar resaltado del stand"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ) : null}

              {/* Acciones */}
              <div className="absolute bottom-4 right-4 z-20 flex gap-2 print:hidden">
                <Button
                  size="sm"
                  onClick={enterFullscreen}
                  className="rounded-full border border-white/15 bg-deep text-white shadow-lg transition hover:bg-violet-brand"
                  aria-label="Ver plano en pantalla completa"
                >
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                  Pantalla completa
                </Button>
                <Button
                  size="sm"
                  onClick={downloadPdf}
                  className="rounded-full bg-turquoise text-white shadow-lg transition hover:bg-turquoise-dark"
                  aria-label="Descargar plano en PDF"
                >
                  <FileDown className="h-4 w-4" aria-hidden="true" />
                  Plano PDF
                </Button>
              </div>
            </div>

            {/* Panel lateral */}
            <div className="flex flex-col rounded-3xl border border-lavender/50 bg-surface p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Zona seleccionada
                  </p>
                  <h3 className="font-display mt-1 text-xl font-extrabold leading-tight text-ink">
                    {zone.name}
                  </h3>
                </div>
                <span
                  className="h-5 w-5 shrink-0 rounded-full border-4"
                  style={{ backgroundColor: zone.color, borderColor: `${zone.color}33` }}
                  aria-hidden="true"
                />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{zone.description}</p>

              {zone.services ? (
                <ul className="mt-4 flex flex-col gap-2">
                  {zone.services.map((s) => (
                    <li key={s} className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm font-medium text-graphite">
                      <MapPin className="h-4 w-4 shrink-0 text-turquoise" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <p className="mt-5 text-xs font-bold uppercase tracking-widest text-violet-ink">
                    {zoneExhibitors.length} expositores en esta zona
                  </p>
                  <ul className="custom-scrollbar mt-3 flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
                    {zoneExhibitors.map((ex) => {
                      const isLocated = ex.id === locatedId;
                      return (
                        <li
                          key={ex.id}
                          ref={isLocated ? locatedRef : undefined}
                          className={cn(
                            "flex items-center gap-3 rounded-xl border p-2.5 transition",
                            isLocated
                              ? "locate-pulse border-turquoise bg-turquoise-light ring-2 ring-turquoise/50"
                              : "border-lavender/40 bg-lavender-light/50 hover:border-turquoise/50 hover:bg-turquoise-light"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-extrabold text-white",
                              ex.gradient
                            )}
                            aria-hidden="true"
                          >
                            {ex.initials}
                          </span>
                          <div className="min-w-0">
                            <p className="flex items-center gap-1.5 truncate text-sm font-bold text-ink">
                              {isLocated ? <MapPin className="h-3.5 w-3.5 shrink-0 text-turquoise-dark" aria-hidden="true" /> : null}
                              {ex.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {ex.stand}
                              {isLocated ? <span className="ml-1.5 font-bold text-turquoise-dark">· Acá está</span> : null}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              <div className="mt-auto pt-5">
                <div className="flex flex-wrap gap-2">
                  {ZONES.map((z) => (
                    <button
                      key={z.id}
                      onClick={() => setSelected(z.id)}
                      aria-pressed={selected === z.id}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-bold transition",
                        selected === z.id
                          ? "border-transparent text-white shadow"
                          : "border-lavender/50 bg-surface text-graphite/70 hover:border-turquoise"
                      )}
                      style={selected === z.id ? { backgroundColor: z.color } : undefined}
                    >
                      {z.short}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Mobile / tablet: lista colapsable ── */}
        <ScrollReveal className="lg:hidden">
          <div className="rounded-3xl border border-lavender/50 bg-surface p-4 shadow-sm">
            <Accordion
              type="single"
              collapsible
              value={accordionValue}
              onValueChange={setAccordionValue}
              className="w-full"
            >
              {ZONES.map((z) => {
                const list = EXHIBITORS.filter((e) => e.zone === z.id);
                return (
                  <AccordionItem key={z.id} value={`z-${z.id}`} className="border-lavender/40">
                    <AccordionTrigger className="items-center gap-3 py-4 text-left hover:no-underline">
                      <span className="flex items-center gap-3">
                        <span
                          className="h-4 w-4 shrink-0 rounded-full"
                          style={{ backgroundColor: z.color }}
                          aria-hidden="true"
                        />
                        <span>
                          <span className="font-display block text-sm font-bold text-ink">{z.name}</span>
                          <span className="block text-xs text-muted-foreground">{z.description}</span>
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      {z.services ? (
                        <ul className="flex flex-col gap-1.5">
                          {z.services.map((s) => (
                            <li key={s} className="rounded-lg bg-muted px-3 py-2 text-sm font-medium text-graphite">
                              {s}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="flex flex-col gap-1.5">
                          {list.map((ex) => {
                            const isLocated = ex.id === locatedId;
                            return (
                              <li
                                key={ex.id}
                                ref={isLocated ? locatedRef : undefined}
                                className={cn(
                                  "flex items-center gap-2.5 rounded-lg border p-2 transition",
                                  isLocated
                                    ? "locate-pulse border-turquoise bg-turquoise-light ring-2 ring-turquoise/50"
                                    : "border-transparent bg-lavender-light/60"
                                )}
                              >
                                <span
                                  className={cn(
                                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-[10px] font-extrabold text-white",
                                    ex.gradient
                                  )}
                                  aria-hidden="true"
                                >
                                  {ex.initials}
                                </span>
                                <div className="min-w-0">
                                  <p className="truncate text-[13px] font-bold text-ink">{ex.name}</p>
                                  <p className="text-[11px] text-muted-foreground">
                                    {ex.stand}
                                    {isLocated ? <span className="ml-1 font-bold text-turquoise-dark">· Acá está</span> : null}
                                  </p>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
            <p className="mt-3 flex items-center gap-1.5 rounded-xl bg-turquoise-light px-3 py-2.5 text-xs text-turquoise-ink">
              <Maximize2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              En computadoras podés explorar el mapa interactivo en pantalla completa.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SVG esquemático del predio
   ───────────────────────────────────────────────────────────── */

function MapSvg({
  selected,
  hovered,
  onSelect,
  onHover,
  onLeave,
}: {
  selected: ZoneId;
  hovered: ZoneId | null;
  onSelect: (z: ZoneId) => void;
  onHover: (z: ZoneId, pos: { x: number; y: number }) => void;
  onLeave: () => void;
}) {
  // Modo oscuro del plano: paleta completa alternativa. Renderiza SIEMPRE light
  // en SSR y en el primer render del cliente (mounted guard) para evitar mismatch
  // de hidratación cuando el usuario ya tenía dark persistido en localStorage.
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  const C = dark
    ? {
        bg: "#221236",
        street: "#2F1C4A",
        streetOpacityV: 1,
        defaultStroke: "#4d3a68",
        labelDefault: "#EDE4F7",
        sublabelDefault: "#b3a6c8",
        teal: "#5cdccb",
        violet: "#cfa3e2",
        deepLabel: "#EDE4F7",
        gastroLabel: "#d9b5ee",
        gray: "#c9c0d6",
        compassFill: "#2F1C4A",
        compassStroke: "#9a6ec0",
        compassN: "#C4A1D4",
      }
    : {
        bg: "#FDFBFE",
        street: "#F1EAF6",
        streetOpacityV: 0.7,
        defaultStroke: "#d9cfe3",
        labelDefault: "#2A1745",
        sublabelDefault: "#6b6b6b",
        teal: "#1fa396",
        violet: "#7B2D8E",
        deepLabel: "#2A1745",
        gastroLabel: "#5e2170",
        gray: "#4A4A4A",
        compassFill: "#fff",
        compassStroke: "#C4A1D4",
        compassN: "#7B2D8E",
      };

  const handleMove = (e: React.MouseEvent, z: ZoneId) => {
    const rect = (e.currentTarget.closest("div.relative") as HTMLElement)?.getBoundingClientRect();
    onHover(z, { x: e.clientX - (rect?.left ?? 0), y: e.clientY - (rect?.top ?? 0) });
  };

  const zoneProps = (id: ZoneId, fill: string, stroke: string) => ({
    fill: hovered === id || selected === id ? fill : `${fill}`,
    stroke: hovered === id || selected === id ? stroke : C.defaultStroke,
    strokeWidth: hovered === id || selected === id ? 4 : 2.5,
    onMouseEnter: (e: React.MouseEvent) => handleMove(e, id),
    onMouseMove: (e: React.MouseEvent) => handleMove(e, id),
    onMouseLeave: onLeave,
    onClick: () => onSelect(id),
    className: "cursor-pointer transition-all duration-200",
    tabIndex: 0,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(id);
      }
    },
    role: "button",
    "aria-label": ZONES.find((z) => z.id === id)?.name,
  });

  const label = (x: number, y: number, text: string, size = 15, fill?: string) => (
    <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill ?? C.labelDefault} pointerEvents="none" fontFamily="var(--font-outfit)">
      {text}
    </text>
  );

  const sublabel = (x: number, y: number, text: string, fill?: string) => (
    <text x={x} y={y} textAnchor="middle" fontSize={10.5} fontWeight={600} fill={fill ?? C.sublabelDefault} pointerEvents="none" fontFamily="var(--font-jakarta)">
      {text}
    </text>
  );

  return (
    <svg
      viewBox="0 0 920 640"
      className="h-auto w-full"
      role="img"
      aria-label="Plano esquemático del predio ferial ExpoJuy 2026"
    >
      {/* Fondo */}
      <rect width="920" height="640" fill={C.bg} />
      {/* Calles internas */}
      <rect x="0" y="306" width="920" height="26" fill={C.street} />
      <rect x="424" y="0" width="72" height="640" fill={C.street} opacity={C.streetOpacityV} />

      {/* Puerta Norte */}
      <g>
        <rect x="380" y="10" width="160" height="34" rx={10} fill="#2EC4B6" opacity="0.9" />
        {label(460, 32, "PUERTA NORTE", 12, "#fff")}
      </g>

      {/* Pabellón A — Tecnología */}
      <rect x="50" y="86" width="250" height="204" rx={16} {...zoneProps("tecnologia", "rgba(46,196,182,0.28)", "#2EC4B6")} />
      {label(175, 178, "PABELLÓN A", 16, C.teal)}
      {label(175, 200, "Tecnología e", 13, C.teal)}
      {label(175, 216, "Innovación", 13, C.teal)}
      {sublabel(175, 240, "IA · Software · Startups", C.teal)}

      {/* Pabellón C — Internacional */}
      <rect x="530" y="86" width="250" height="204" rx={16} {...zoneProps("internacional", "rgba(42,23,69,0.32)", "#2A1745")} />
      {label(655, 178, "PABELLÓN C", 16, C.deepLabel)}
      {label(655, 200, "Internacional", 13, C.deepLabel)}
      {label(655, 216, "y Negocios", 13, C.deepLabel)}
      {sublabel(655, 240, "Rondas B2B · Delegaciones", C.deepLabel)}

      {/* Pabellón B — Industria */}
      <rect x="290" y="86" width="250" height="204" rx={16} {...zoneProps("industria", "rgba(123,45,142,0.30)", "#7B2D8E")} />
      {label(415, 178, "PABELLÓN B", 16, C.violet)}
      {label(415, 200, "Industria", 13, C.violet)}
      {label(415, 216, "y Minería", 13, C.violet)}
      {sublabel(415, 240, "Litio · Agro · Energía", C.violet)}

      {/* Pabellón D — Gastronomía */}
      <rect x="50" y="344" width="380" height="230" rx={16} {...zoneProps("gastro", "rgba(196,161,212,0.40)", "#C4A1D4")} />
      {label(200, 440, "PABELLÓN D", 16, C.gastroLabel)}
      {label(200, 462, "Gastronomía", 13, C.gastroLabel)}
      {sublabel(200, 484, "Sabores del NOA · Artesanías", C.gastroLabel)}
      {/* Escenario */}
      <circle cx="365" cy="452" r="52" fill="#7B2D8E" opacity="0.92" />
      {label(365, 448, "ESCENARIO", 11.5, "#fff")}
      {label(365, 464, "PRINCIPAL", 11.5, "#fff")}

      {/* Servicios */}
      <g>
        {/* VIP */}
        <rect x="460" y="344" width="130" height="70" rx={12} {...zoneProps("servicios", "rgba(74,74,74,0.14)", "#4A4A4A")} />
        <Crown x={492} y={362} width={18} height={18} className="pointer-events-none" color={C.gray} />
        {label(568, 385, "Salón VIP", 12.5)}
        {/* Prensa */}
        <rect x="460" y="428" width="130" height="70" rx={12} {...zoneProps("servicios", "rgba(74,74,74,0.14)", "#4A4A4A")} />
        <Camera x={492} y={446} width={18} height={18} className="pointer-events-none" color={C.gray} />
        {label(568, 469, "Prensa", 12.5)}
        {/* Enfermería */}
        <rect x="604" y="344" width="130" height="70" rx={12} {...zoneProps("servicios", "rgba(229,72,77,0.15)", "#E5484D")} />
        <Cross x={636} y={362} width={18} height={18} className="pointer-events-none" color="#E5484D" />
        {label(712, 385, "Enfermería", 12.5)}
        {/* Información */}
        <rect x="604" y="428" width="130" height="70" rx={12} {...zoneProps("servicios", "rgba(41,171,226,0.15)", "#29ABE2")} />
        <Info x={636} y={446} width={18} height={18} className="pointer-events-none" color="#29ABE2" />
        {label(712, 469, "Informes", 12.5)}
        {/* Estacionamiento */}
        <rect x="748" y="344" width="122" height="230" rx={12} {...zoneProps("servicios", "rgba(74,74,74,0.18)", "#4A4A4A")} />
        <Car x={795} y={430} width={26} height={26} className="pointer-events-none" color={C.gray} />
        {label(809, 480, "Estacio-", 12)}
        {label(809, 496, "namiento", 12)}
      </g>

      {/* Puerta Sur */}
      <g>
        <rect x="380" y="596" width="160" height="34" rx={10} fill="#2EC4B6" opacity="0.9" />
        {label(460, 618, "PUERTA SUR", 12, "#fff")}
      </g>

      {/* Brújula */}
      <g transform="translate(868,44)" pointerEvents="none">
        <circle r="22" fill={C.compassFill} stroke={C.compassStroke} strokeWidth="2" />
        <path d="M0,-14 L5,6 L0,2 L-5,6 Z" fill="#7B2D8E" />
        <text y="-26" textAnchor="middle" fontSize="11" fontWeight="800" fill={C.compassN}>N</text>
      </g>
    </svg>
  );
}
