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
    <section className="relative overflow-hidden rounded-3xl bg-white/90 dark:bg-gradient-to-r dark:from-slate-900/90 dark:via-[#151128]/95 dark:to-slate-900/90 border border-purple-200/70 dark:border-purple-500/30 p-5 sm:p-6 shadow-[0_20px_40px_-15px_rgba(124,58,237,0.08),0_0_0_1px_rgba(124,58,237,0.12)] dark:shadow-[0_0_25px_-5px_rgba(168,85,247,0.18),inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
      {/* Glow ambient decorative spots inside card */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-200/30 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-cyan-200/25 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top bar with title, tags, status and counter */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border-b border-slate-100 dark:border-white/10 pb-6">
          <div className="flex items-start gap-4">
            {/* Icon trophy container */}
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-emerald-50 via-cyan-50 to-purple-100 dark:from-emerald-400/20 dark:via-cyan-500/20 dark:to-purple-600/30 border border-purple-200 dark:border-emerald-400/30 flex items-center justify-center shadow-sm dark:shadow-lg dark:shadow-emerald-500/10 text-emerald-600 dark:text-emerald-300">
              <Trophy className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Votá tu stand favorito
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 shadow-[0_4px_12px_-2px_rgba(109,40,217,0.12)] dark:shadow-[0_0_12px_rgba(124,58,237,0.35)]">
                  Edición 2026
                </span>
              </div>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 flex items-center gap-2 flex-wrap">
                <span className="font-medium text-purple-700 dark:text-cyan-400">Premio del público ExpoJuy</span>
                <span className="text-slate-300 dark:text-slate-500">•</span>
                <span className="text-slate-500 dark:text-slate-400">Se anunciará y premiará en el escenario principal el día de cierre</span>
              </p>
            </div>
          </div>

          {/* Badges on right: Votacion abierta & votos emitidos */}
          <div className="flex items-center flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-slate-950/60 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs md:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              Votación abierta
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-500/40 text-purple-800 dark:text-purple-200 text-xs md:text-sm font-semibold shadow-sm dark:shadow-inner">
              <Vote className="w-4 h-4 text-purple-600 dark:text-purple-400" aria-hidden="true" />
              <span>{state ? `${state.total} ${state.total === 1 ? "voto" : "votos"} emitidos` : "Cargando…"}</span>
            </div>
          </div>
        </div>

        {/* Banner box: empty state or ranking list */}
        {state && ranking.length === 0 ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-blue-100/70 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Trophy className="w-4 h-4" aria-hidden="true" />
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Todavía no hay votos — abrí el perfil de un expositor o toques <Trophy className="inline h-3.5 w-3.5 mx-1" aria-hidden="true" /> para dejar el primero.
              </p>
            </div>
          </div>
        ) : (
          <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {ranking.map((r, i) => {
              const isMine = state?.myVote === r.ex.id;
              return (
                <li
                  key={r.ex.id}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border p-3 transition",
                    isMine
                      ? "border-purple-300 bg-purple-50 dark:border-turquoise dark:bg-turquoise/15"
                      : "border-slate-200 bg-slate-50 hover:border-purple-300 dark:border-white/15 dark:bg-white/5 dark:hover:border-turquoise/50"
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
                    <p className="truncate text-[13px] font-bold text-slate-900 dark:text-white">{r.ex.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/15">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 dark:from-turquoise dark:to-teal-300 transition-all duration-700 ease-out"
                          style={{ width: `${Math.max((r.count / max) * 100, 12)}%` }}
                          role="presentation"
                        />
                      </div>
                      <span className="shrink-0 font-mono text-[11px] font-bold text-purple-600 dark:text-turquoise">
                        {r.count}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    disabled={pending === r.ex.id}
                    onClick={() => quickVote(r.ex.id, r.ex.name)}
                    className={cn(
                      "h-8 shrink-0 rounded-full px-3 text-[11px] font-bold transition-colors",
                      isMine
                        ? "bg-purple-600 text-white hover:bg-purple-700 dark:bg-turquoise dark:text-deep dark:hover:bg-turquoise-dark"
                        : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-deep"
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
    </section>
  );
}
