"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, CalendarPlus, CalendarArrowDown, UserRound, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { AGENDA, EVENT, type Activity } from "@/lib/data";
import { downloadIcs, type IcsEvent } from "@/lib/ics";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { usePlanStore } from "./plan-store";
import { cn } from "@/lib/utils";

function toGoogleCalendarUrl(activity: Activity, date: string): string {
  const [start, end] = activity.time.split("-").map((s) => s.trim());
  const stamp = (hm: string) => `${date.replace(/-/g, "")}T${hm.replace(":", "")}00`;
  // Horario de Jujuy: UTC-3
  const dates = `${stamp(start)}%2D0300/${stamp(end)}%2D0300`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${activity.title} — ExpoJuy 2026`,
    dates,
    details: `${activity.description}\n\nDisertante: ${activity.speaker.name} (${activity.speaker.role})`,
    location: `${activity.location} · Predio Ferial Ciudad Cultural, San Salvador de Jujuy`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString().replace("%2D0300", "-0300")}`;
}

function toIcsEvent(activity: Activity, date: string): IcsEvent {
  return {
    uid: `${date}-${activity.time}-${activity.title.slice(0, 24).replace(/\s+/g, "-").toLowerCase()}`,
    date,
    time: activity.time,
    title: `${activity.title} — ExpoJuy 2026`,
    description: `${activity.description}\n\nDisertante: ${activity.speaker.name} (${activity.speaker.role})\n\nAgenda completa: https://expojuy.com.ar/#agenda`,
    location: `${activity.location} · ${EVENT.venue}, San Salvador de Jujuy`,
  };
}

const ROW_STYLES = [
  "bg-surface border-l-turquoise",
  "bg-turquoise-light/50 border-l-blue-bright",
  "bg-surface border-l-violet-brand",
  "bg-lavender-light/70 border-l-lavender",
  "bg-surface border-l-turquoise",
  "bg-turquoise-light/50 border-l-violet-brand",
];

const DOT_STYLES = [
  "bg-turquoise",
  "bg-blue-bright",
  "bg-violet-brand",
  "bg-lavender",
  "bg-turquoise",
  "bg-violet-brand",
];

const LOCATION_STYLES: Record<string, string> = {
  "Auditorio Principal": "bg-violet-brand/12 text-violet-ink",
  "Sala de Negocios": "bg-slate-500/12 text-slate-700",
  "Espacio Tech": "bg-turquoise/15 text-turquoise-ink",
  "Escenario Principal": "bg-amber-400/15 text-amber-700",
  "Pabellón D": "bg-lavender/25 text-violet-dark",
  "Salón VIP": "bg-deep/10 text-ink",
};

export function AgendaSection() {
  const [tab, setTab] = React.useState("day1");
  const { activities, toggleActivity } = usePlanStore();

  const handleToggleActivity = (
    key: string,
    day: (typeof AGENDA)[number],
    act: Activity
  ) => {
    const wasSaved = !!activities[key];
    toggleActivity({
      key,
      dayLabel: day.label.split(" · ")[0],
      date: day.date,
      time: act.time,
      title: act.title,
      location: act.location,
    });
    if (!wasSaved) toast.success("Agregado a Mi ExpoJuy ⭐", { description: act.title });
  };

  return (
    <section
      id="agenda"
      className="relative overflow-hidden bg-gradient-to-b from-turquoise-light/70 via-background to-lavender-light/60 py-20 sm:py-24"
      aria-label="Agenda de actividades"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Agenda 2026"
          title="Viví cada día de"
          highlight="ExpoJuy"
          description="Conferencias, rondas de negocios, talleres y shows. Armá tu propia agenda y no te pierdas nada."
        />

        <ScrollReveal>
          <div role="tablist" aria-label="Días del evento" className="w-full">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <div className="no-scrollbar flex w-full max-w-3xl justify-start gap-1.5 overflow-x-auto rounded-full border border-lavender/40 bg-surface p-1.5 shadow-sm sm:justify-center">
                {AGENDA.map((day) => (
                  <button
                    key={day.day}
                    role="tab"
                    aria-selected={tab === day.day}
                    onClick={() => setTab(day.day)}
                    className={cn(
                      "shrink-0 rounded-full px-4 py-2.5 text-[13px] font-bold whitespace-nowrap transition-all duration-300",
                      tab === day.day
                        ? "bg-gradient-brand text-white shadow-md shadow-turquoise/30"
                        : "text-graphite/75 hover:bg-turquoise-light hover:text-turquoise-ink"
                    )}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  downloadIcs(
                    "expoju2026-agenda",
                    AGENDA.flatMap((day) => day.activities.map((act) => toIcsEvent(act, day.date))),
                    "agenda completa"
                  )
                }
                className="shrink-0 rounded-full border-2 border-turquoise/60 bg-surface text-xs font-bold text-turquoise-ink transition hover:border-turquoise hover:bg-turquoise hover:text-white hover:shadow-md hover:shadow-turquoise/25"
                aria-label="Descargar agenda completa en formato calendario (.ics)"
              >
                <CalendarArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                Agenda en mi calendario (.ics)
              </Button>
            </div>

            {AGENDA.filter((day) => day.day === tab).map((day) => (
              <div key={day.day} role="tabpanel" className="mt-8">
                <div className="relative flex flex-col gap-4">
                  {/* Línea vertical del timeline (desktop) */}
                  <div
                    className="absolute bottom-4 left-[7px] top-4 hidden w-0.5 rounded-full bg-gradient-to-b from-turquoise via-lavender to-violet-brand opacity-40 sm:block"
                    aria-hidden="true"
                  />
                  {day.activities.map((act, i) => {
                    const actKey = `${day.day}-${i}`;
                    const isFav = !!activities[actKey];
                    return (
                    <ScrollReveal key={actKey} delay={i * 0.06}>
                      <article
                        className={cn(
                          "group relative ml-0 flex flex-col gap-4 rounded-2xl border border-lavender/40 border-l-4 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-turquoise/10 sm:ml-6 sm:flex-row sm:items-center",
                          ROW_STYLES[i % ROW_STYLES.length],
                          isFav && "ring-2 ring-amber-300/60"
                        )}
                      >
                        {/* Favorito: guardar en Mi ExpoJuy */}
                        <button
                          onClick={() => handleToggleActivity(actKey, day, act)}
                          aria-pressed={isFav}
                          aria-label={isFav ? `Quitar "${act.title}" de Mi ExpoJuy` : `Guardar "${act.title}" en Mi ExpoJuy`}
                          title="Guardar en Mi ExpoJuy"
                          className={cn(
                            "absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border shadow-md transition-all duration-200 hover:scale-110 active:scale-90",
                            isFav
                              ? "border-amber-300 bg-amber-400 text-white"
                              : "border-lavender/50 bg-surface text-lavender hover:border-amber-300 hover:text-amber-400"
                          )}
                        >
                          <Star className={cn("h-4 w-4", isFav && "fill-current")} aria-hidden="true" />
                        </button>

                        {/* Punto del timeline (color por franja) */}
                        <span
                          className={cn(
                            "absolute -left-[31px] top-8 hidden h-3.5 w-3.5 rounded-full border-[3px] border-white shadow transition-transform group-hover:scale-125 sm:block",
                            DOT_STYLES[i % DOT_STYLES.length]
                          )}
                          aria-hidden="true"
                        />

                        {/* Horario */}
                        <div className="flex w-full shrink-0 items-center gap-2 sm:w-36 sm:flex-col sm:items-start sm:gap-1">
                          <span className="font-display inline-flex items-center gap-1.5 text-sm font-extrabold text-ink">
                            <Clock className="h-4 w-4 text-turquoise-ink" aria-hidden="true" />
                            {act.time}
                          </span>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold",
                              LOCATION_STYLES[act.location] ?? "bg-muted text-muted-foreground"
                            )}
                          >
                            <MapPin className="h-3 w-3" aria-hidden="true" />
                            {act.location}
                          </span>
                        </div>

                        {/* Contenido */}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-base font-bold leading-snug text-ink sm:text-lg">
                            {act.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {act.description}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-1.5">
                            {act.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="rounded-full border-turquoise/40 bg-turquoise-light text-[11px] font-bold text-turquoise-ink"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Disertante + acción */}
                        <div className="flex w-full shrink-0 items-center justify-between gap-3 border-t border-lavender/30 pt-4 sm:w-56 sm:flex-col sm:items-end sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                          <div className="flex items-center gap-2.5 sm:flex-row-reverse sm:text-right">
                            <span
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white shadow-md"
                              style={{ backgroundColor: act.speaker.color }}
                              aria-hidden="true"
                            >
                              {act.speaker.initials}
                            </span>
                            <div>
                              <p className="flex items-center gap-1 text-[13px] font-bold leading-tight text-ink">
                                <UserRound className="h-3 w-3 shrink-0 text-violet-ink sm:hidden" aria-hidden="true" />
                                {act.speaker.name}
                              </p>
                              <p className="text-[11px] leading-tight text-muted-foreground">
                                {act.speaker.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-1.5">
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="shrink-0 rounded-full border-2 border-violet-brand/60 text-xs font-bold text-violet-ink transition hover:border-violet-brand hover:bg-violet-brand hover:text-white"
                            >
                              <a
                                href={toGoogleCalendarUrl(act, day.date)}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Añadir "${act.title}" a Google Calendar`}
                              >
                                <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />
                                Mi calendario
                              </a>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadIcs("expoju2026-actividad", [toIcsEvent(act, day.date)], act.title)}
                              className="shrink-0 rounded-full border-2 border-turquoise/50 px-2.5 text-turquoise-ink transition hover:border-turquoise hover:bg-turquoise hover:text-white"
                              aria-label={`Descargar "${act.title}" como archivo de calendario (.ics)`}
                              title="Descargar .ics (funciona con cualquier app de calendario)"
                            >
                              <CalendarArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                              <span className="sr-only">Descargar .ics</span>
                            </Button>
                          </div>
                        </div>
                      </article>
                    </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-turquoise" aria-hidden="true" />
            La agenda completa con más de 80 actividades se publica semanalmente. ¡Mantente al tanto en nuestras redes!
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
