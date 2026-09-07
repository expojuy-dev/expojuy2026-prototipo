"use client";

import * as React from "react";
import {
  Handshake,
  Loader2,
  Search,
  Inbox,
  Clock,
  CircleCheck,
  CircleX,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type LookupRequest = {
  id: string;
  exhibitorName: string;
  preferredSlot: string;
  status: string;
  createdAt: string;
};

const STATUS_META: Record<
  string,
  { label: string; hint: string; badge: string; icon: React.ElementType }
> = {
  pendiente: {
    label: "Pendiente",
    hint: "El equipo del expositor va a confirmarte por email.",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock,
  },
  confirmada: {
    label: "Confirmada",
    hint: "¡Listo! Coordiná tu llegada a la Sala de Negocios (Pabellón C) 10 minutos antes.",
    badge: "border-turquoise/40 bg-turquoise-light text-turquoise-ink",
    icon: CircleCheck,
  },
  rechazada: {
    label: "No confirmada",
    hint: "Esta agenda no pudo coordinarse. Podés pedir otra franja desde el perfil del expositor.",
    badge: "border-red-200 bg-red-50 text-red-600",
    icon: CircleX,
  },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Consulta pública del estado de solicitudes de reunión B2B.
 * Cada persona consulta únicamente por su propio email.
 */
export function MeetingLookupCard() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [searched, setSearched] = React.useState(false);
  const [results, setResults] = React.useState<LookupRequest[] | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = email.trim();
    if (!clean) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/meetings?email=${encodeURIComponent(clean)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "No pudimos consultar tus solicitudes");
      setResults(json.requests ?? []);
      setSearched(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-lavender/50 bg-surface shadow-sm">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-brand" aria-hidden="true" />
      <div className="flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center">
        {/* Texto + form */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="gradient-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lavender-light">
              <Handshake className="h-5 w-5 text-violet-ink" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-base font-extrabold text-ink sm:text-lg">
                ¿Pediste una reunión B2B? Consultá su estado
              </h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Ingresá el email con el que solicitaste el encuentro y te mostramos cómo está tu
                agenda.
              </p>
            </div>
          </div>

          <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lavender"
                aria-hidden="true"
              />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                aria-label="Email con el que solicitaste la reunión"
                className="h-11 rounded-xl pl-9"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-brand h-11 rounded-xl px-6 font-bold text-white shadow-md shadow-turquoise/25 transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                "Consultar"
              )}
            </Button>
          </form>
          <p className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-turquoise-ink" aria-hidden="true" />
            Solo ves las solicitudes cargadas con tu propio email. Nadie más puede consultarlas.
          </p>
        </div>

        {/* Resultados */}
        <div className="w-full lg:w-[340px]">
          {!searched ? (
            <div className="flex h-full min-h-[140px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-lavender/60 bg-lavender-light/40 p-5 text-center">
              <Inbox className="h-7 w-7 text-lavender" aria-hidden="true" />
              <p className="text-xs text-muted-foreground">
                Tus solicitudes y su estado van a aparecer acá.
              </p>
            </div>
          ) : loading ? (
            <div className="flex h-full min-h-[140px] items-center justify-center rounded-2xl border border-dashed border-lavender/60 bg-lavender-light/40">
              <Loader2 className="h-6 w-6 animate-spin text-violet-ink" aria-hidden="true" />
            </div>
          ) : !results || results.length === 0 ? (
            <div className="flex h-full min-h-[140px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-amber-200/80 bg-amber-50/60 p-5 text-center">
              <Inbox className="h-7 w-7 text-amber-400" aria-hidden="true" />
              <p className="text-xs font-semibold text-amber-700">
                No encontramos solicitudes con ese email.
              </p>
              <p className="text-[11px] text-amber-600/80">
                Revisá que esté bien escrito o solicitá una reunión desde el perfil de un expositor.
              </p>
            </div>
          ) : (
            <ul className="flex max-h-[260px] flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar">
              {results.map((r) => {
                const meta = STATUS_META[r.status] ?? STATUS_META.pendiente;
                const Icon = meta.icon;
                return (
                  <li
                    key={r.id}
                    className="rounded-2xl border border-lavender/50 bg-surface p-3.5 shadow-sm transition hover:border-turquoise/40"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-ink">{r.exhibitorName}</p>
                        <p className="mt-0.5 text-[11px] font-semibold text-turquoise-ink">
                          {r.preferredSlot}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Solicitada el {fmtDate(r.createdAt)}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn("shrink-0 rounded-full text-[10px] font-bold", meta.badge)}
                      >
                        <Icon className="mr-1 h-3 w-3" aria-hidden="true" />
                        {meta.label}
                      </Badge>
                    </div>
                    <p className="mt-2 border-t border-lavender/30 pt-2 text-[11px] leading-relaxed text-muted-foreground">
                      {meta.hint}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
