"use client";

import * as React from "react";
import { Trophy, Vote, Loader2, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { EXHIBITORS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { fetchVote, castVote, VOTE_EVENT, type VoteState } from "@/lib/vote";

const MEDAL_STYLES = [
  "bg-gradient-brand shadow-md shadow-violet-brand/30", // oro
  "bg-gradient-to-br from-slate-300 to-slate-400", // plata
  "bg-gradient-to-br from-amber-500 to-amber-600", // bronce
];

/** Banda de resultados de la encuesta "Votá tu stand favorito". */
export function StandVoteStrip() {
  const [state, setState] = React.useState<VoteState | null>(null);
  const [pending, setPending] = React.useState<string | null>(null);

  const load = React.useCallback(() => {
    fetchVote()
      .then(setState)
      .catch(() => setState({ results: [], total: 0, myVote: null }));
  }, []);

  React.useEffect(() => {
    load();
    const onUpdated = (e: Event) => setState((e as CustomEvent<VoteState>).detail);
    window.addEventListener(VOTE_EVENT, onUpdated);
    window.addEventListener("focus", load);
    return () => {
      window.removeEventListener(VOTE_EVENT, onUpdated);
      window.removeEventListener("focus", load);
    };
  }, [load]);

  const ranking = React.useMemo(() => {
    const byId = new Map(EXHIBITORS.map((e) => [e.id, e]));
    type Ranked = { exhibitorId: string; count: number; ex: (typeof EXHIBITORS)[number] };
    const list: Ranked[] = [];
    for (const r of state?.results ?? []) {
      const ex = byId.get(r.exhibitorId);
      if (ex) list.push({ exhibitorId: r.exhibitorId, count: r.count, ex });
    }
    return list.sort((a, b) => b.count - a.count).slice(0, 3);
  }, [state]);

  const max = Math.max(...ranking.map((r) => r.count), 1);

  const quickVote = async (exhibitorId: string, name: string) => {
    setPending(exhibitorId);
    try {
      const next = await castVote(exhibitorId);
      toast.success(
        state?.myVote === exhibitorId
          ? `Tu voto para ${name} sigue firme 🏆`
          : `¡Voto registrado para ${name}!`
      );
      setState(next);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al votar");
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-violet-brand/30 bg-gradient-to-br from-deep via-violet-dark to-deep p-5 shadow-lg sm:p-6">
      <div className="dots-pattern-light absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-turquoise text-deep shadow-md">
            <Trophy className="h-5.5 w-5.5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-base font-extrabold leading-tight text-white sm:text-lg">
              Votá tu stand favorito
            </h3>
            <p className="text-xs text-white/70">
              Premio del público ExpoJuy · se anuncia en el escenario principal el día de cierre
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur">
          <Vote className="h-3.5 w-3.5 text-turquoise" aria-hidden="true" />
          {state ? `${state.total} ${state.total === 1 ? "voto" : "votos"}` : "Cargando…"}
        </span>
      </div>

      {state && ranking.length === 0 ? (
        <p className="relative mt-4 rounded-2xl border border-dashed border-white/25 bg-white/5 px-4 py-3 text-center text-xs text-white/75">
          Todavía no hay votos — abrí el perfil de un expositor o toques <Trophy className="inline h-3.5 w-3.5" aria-hidden="true" /> para dejar el primero.
        </p>
      ) : (
        <ol className="relative mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {ranking.map((r, i) => {
            const isMine = state?.myVote === r.ex.id;
            return (
              <li
                key={r.ex.id}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border p-3 transition",
                  isMine
                    ? "border-turquoise bg-turquoise/15"
                    : "border-white/15 bg-white/5 hover:border-turquoise/50"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white",
                    MEDAL_STYLES[i] ?? "bg-lavender"
                  )}
                >
                  {i === 0 ? <Medal className="h-4 w-4" aria-hidden="true" /> : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold text-white">{r.ex.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-turquoise to-teal-300 transition-all duration-700 ease-out"
                        style={{ width: `${Math.max((r.count / max) * 100, 12)}%` }}
                        role="presentation"
                      />
                    </div>
                    <span className="shrink-0 font-mono text-[11px] font-bold text-turquoise">
                      {r.count}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  disabled={pending === r.ex.id}
                  onClick={() => quickVote(r.ex.id, r.ex.name)}
                  className={cn(
                    "h-8 shrink-0 rounded-full px-3 text-[11px] font-bold",
                    isMine
                      ? "bg-turquoise text-deep hover:bg-turquoise-dark"
                      : "border border-white/30 bg-white/10 text-white hover:bg-white hover:text-deep"
                  )}
                  aria-label={isMine ? `Tu voto: ${r.ex.name}` : `Votar ${r.ex.name}`}
                >
                  {pending === r.ex.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  ) : isMine ? (
                    "Tu voto"
                  ) : (
                    "Votar"
                  )}
                </Button>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
