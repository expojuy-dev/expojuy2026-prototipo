"use client";

import * as React from "react";
import { CalendarHeart, X, Trash2, Download, Store, CalendarClock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePlanStore, downloadPlanIcs } from "./plan-store";
import { cn } from "@/lib/utils";

export function PlanPanel() {
  const [open, setOpen] = React.useState(false);
  const { activities, exhibitors, toggleActivity, toggleExhibitor, clearAll } = usePlanStore();

  const actCount = Object.keys(activities).length;
  const exhCount = Object.keys(exhibitors).length;
  const total = actCount + exhCount;

  const exportIcs = () => {
    if (downloadPlanIcs(activities)) {
      toast.success("¡Plan descargado!", {
        description: "Importá el archivo .ics en Google Calendar, Apple Calendar u Outlook.",
      });
    } else {
      toast.info("Todavía no guardaste actividades en tu plan.");
    }
  };

  return (
    <>
      {/* Chip flotante */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar Mi ExpoJuy" : `Abrir Mi ExpoJuy — ${total} guardados`}
        aria-expanded={open}
        className={cn(
          "fixed bottom-5 left-5 z-50 flex h-14 items-center gap-2.5 rounded-full border-2 px-4 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 sm:bottom-6 sm:left-6",
          total > 0
            ? "border-transparent bg-gradient-brand text-white shadow-turquoise/40"
            : "border-lavender/60 bg-surface/90 text-violet-ink backdrop-blur hover:border-violet-brand"
        )}
      >
        <CalendarHeart className="h-6 w-6" aria-hidden="true" />
        <span className="hidden text-sm font-bold sm:block">Mi ExpoJuy</span>
        {total > 0 ? (
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-surface px-1.5 text-xs font-extrabold text-violet-ink">
            {total}
          </span>
        ) : null}
      </button>

      {/* Panel */}
      <div
        className={cn(
          "fixed bottom-[88px] left-4 z-50 flex max-h-[70vh] w-[calc(100vw-2rem)] max-w-sm origin-bottom-left flex-col overflow-hidden rounded-3xl border border-lavender/50 bg-surface shadow-2xl shadow-deep/30 transition-all duration-300 sm:left-6 sm:bottom-24",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        )}
        role="dialog"
        aria-label="Mi ExpoJuy — mi plan del evento"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-deep p-4 text-white">
          <span className="glass flex h-10 w-10 items-center justify-center rounded-full text-turquoise">
            <CalendarHeart className="h-5.5 w-5.5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">Mi ExpoJuy</p>
            <p className="text-[11px] text-white/70">
              {actCount} {actCount === 1 ? "actividad" : "actividades"} · {exhCount}{" "}
              {exhCount === 1 ? "expositor" : "expositores"} guardados
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar panel"
            className="rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Contenido */}
        <div className="custom-scrollbar flex-1 overflow-y-auto bg-turquoise-light/30 p-4">
          {total === 0 ? (
            <div className="flex flex-col items-center gap-2.5 py-8 text-center">
              <CalendarHeart className="h-10 w-10 text-lavender" aria-hidden="true" />
              <p className="font-display text-sm font-bold text-ink">Tu plan está vacío</p>
              <p className="max-w-[240px] text-xs leading-relaxed text-muted-foreground">
                Tocá la ⭐ en las actividades de la agenda y el ❤️ en las empresas que te interesan.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {actCount > 0 ? (
                <section aria-label="Actividades guardadas">
                  <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-ink">
                    <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" /> Agenda
                  </p>
                  <ul className="flex flex-col gap-2">
                    {Object.values(activities).map((a) => (
                      <li
                        key={a.key}
                        className="group flex items-start gap-2.5 rounded-xl border border-lavender/40 bg-surface p-2.5"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-bold text-ink">{a.title}</p>
                          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                            <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                            {a.dayLabel} · {a.time} · {a.location}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleActivity(a)}
                          aria-label={`Quitar ${a.title} de mi plan`}
                          className="rounded-full p-1.5 text-muted-foreground transition hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {exhCount > 0 ? (
                <section aria-label="Expositores guardados">
                  <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-turquoise-ink">
                    <Store className="h-3.5 w-3.5" aria-hidden="true" /> Expositores
                  </p>
                  <ul className="flex flex-col gap-2">
                    {Object.values(exhibitors).map((e) => (
                      <li
                        key={e.id}
                        className="flex items-center gap-2.5 rounded-xl border border-lavender/40 bg-surface p-2.5"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-bold text-ink">{e.name}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {e.stand} · {e.category}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleExhibitor(e)}
                          aria-label={`Quitar ${e.name} de mi plan`}
                          className="rounded-full p-1.5 text-muted-foreground transition hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          )}
        </div>

        {/* Acciones */}
        {total > 0 ? (
          <div className="flex items-center gap-2 border-t border-lavender/30 bg-surface p-3">
            <Button
              onClick={exportIcs}
              className="bg-gradient-brand h-10 flex-1 rounded-full text-xs font-bold text-white"
            >
              <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              Descargar plan (.ics)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                clearAll();
                toast.success("Plan vaciado");
              }}
              className="h-10 rounded-full border-lavender/60 px-4 text-xs font-bold text-muted-foreground hover:border-red-300 hover:text-red-500"
            >
              <Trash2 className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
              Vaciar
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
}
