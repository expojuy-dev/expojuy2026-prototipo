"use client";

import * as React from "react";
import Image from "next/image";
import { Search, MapPin, ChevronDown, Globe2, ArrowRight, Building2, Heart, CalendarClock, Loader2, CheckCircle2, ArrowLeft, Camera, Star, Share2, ContactRound, Crosshair, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { EXHIBITORS, CATEGORIES, ZONES, MEETING_SLOTS, type Exhibitor } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { usePlanStore } from "./plan-store";
import { StandVoteStrip } from "./stand-vote-strip";
import { downloadVCard } from "@/lib/vcard";
import { castVote, fetchVote, VOTE_EVENT } from "@/lib/vote";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<string, string> = {
  "Tecnología & IA": "bg-turquoise/15 text-turquoise-ink border-turquoise/40",
  "Minería & Litio": "bg-violet-brand/12 text-violet-ink border-violet-brand/40",
  Agroindustria: "bg-lime-500/15 text-lime-700 border-lime-500/40",
  "Comercio Exterior": "bg-blue-bright/12 text-sky-700 border-blue-bright/40",
  "Energías Renovables": "bg-emerald-500/12 text-emerald-700 border-emerald-500/40",
  Turismo: "bg-rose-400/15 text-rose-600 border-rose-400/40",
  Institucional: "bg-slate-400/15 text-slate-700 border-slate-400/40",
  Gastronomía: "bg-amber-400/15 text-amber-700 border-amber-400/40",
};

const PAGE_SIZE = 9;

export function ExhibitorsSection() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("Todos");
  const [onlyFeatured, setOnlyFeatured] = React.useState(false);
  const [visible, setVisible] = React.useState(PAGE_SIZE);
  const [selected, setSelected] = React.useState<Exhibitor | null>(null);
  const [dialogView, setDialogView] = React.useState<"info" | "meeting">("info");
  const [voteState, setVoteState] = React.useState<{ myVote: string | null; total: number } | null>(null);
  const [voting, setVoting] = React.useState(false);
  const { exhibitors: favs, toggleExhibitor } = usePlanStore();

  const exhibitorById = React.useMemo(() => new Map(EXHIBITORS.map((e) => [e.id, e])), []);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXHIBITORS.filter((e) => {
      const matchCategory = category === "Todos" || e.category === category;
      const matchFeatured = !onlyFeatured || e.featured;
      const matchQuery =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q);
      return matchCategory && matchFeatured && matchQuery;
    });
  }, [query, category, onlyFeatured]);

  React.useEffect(() => setVisible(PAGE_SIZE), [query, category, onlyFeatured]);

  const openExhibitor = (ex: Exhibitor) => {
    setSelected(ex);
    setDialogView("info");
  };

  // Abrir desde la URL: #expositor-exp-01 (deep-link compartible)
  React.useEffect(() => {
    const openFromHash = () => {
      const m = window.location.hash.match(/^#expositor-([\w-]+)$/);
      if (m && exhibitorById.has(m[1])) openExhibitor(exhibitorById.get(m[1])!);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [exhibitorById]);

  // Sincroniza el hash con el perfil abierto (para compartir)
  React.useEffect(() => {
    if (selected && dialogView === "info") {
      history.replaceState(null, "", `#expositor-${selected.id}`);
    } else if (window.location.hash.startsWith("#expositor-")) {
      history.replaceState(null, "", "#expositores");
    }
  }, [selected, dialogView]);

  // El buscador global (Ctrl+K) puede pedir abrir el perfil de un expositor
  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      const ex = EXHIBITORS.find((x) => x.id === id);
      if (ex) openExhibitor(ex);
    };
    window.addEventListener("expojuy:open-exhibitor", onOpen);
    return () => window.removeEventListener("expojuy:open-exhibitor", onOpen);
  }, []);

  // Encuesta "Votá tu stand favorito": estado compartido con el strip
  React.useEffect(() => {
    let alive = true;
    fetchVote()
      .then((s) => alive && setVoteState({ myVote: s.myVote, total: s.total }))
      .catch(() => {});
    const onUpdated = (e: Event) => {
      const d = (e as CustomEvent<{ myVote: string | null; total: number }>).detail;
      if (alive && d) setVoteState({ myVote: d.myVote, total: d.total });
    };
    window.addEventListener(VOTE_EVENT, onUpdated);
    return () => {
      alive = false;
      window.removeEventListener(VOTE_EVENT, onUpdated);
    };
  }, []);

  const voteSelected = async () => {
    if (!selected || voting) return;
    setVoting(true);
    try {
      const s = await castVote(selected.id);
      setVoteState({ myVote: s.myVote, total: s.total });
      toast.success(
        voteState?.myVote === selected.id
          ? `Tu voto para ${selected.name} sigue firme 🏆`
          : `¡Voto registrado para ${selected.name}!`
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al votar");
    } finally {
      setVoting(false);
    }
  };

  const shown = filtered.slice(0, visible);

  return (
    <section id="expositores" className="bg-background py-20 sm:py-24" aria-label="Directorio de expositores">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Directorio Digital"
          title="Conocé a nuestros"
          highlight="expositores"
          description={`${EXHIBITORS.length} empresas líderes del NOA y países vecinos ya confirmaron su presencia. Buscá por nombre, rubro o producto y planificá tu recorrida.`}
        />

        {/* Buscador */}
        <ScrollReveal>
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-turquoise"
                aria-hidden="true"
              />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar empresa, rubro o producto..."
                aria-label="Buscar empresa, rubro o producto"
                className="h-14 rounded-full border-2 border-lavender/50 bg-surface pl-12 pr-5 text-base shadow-sm transition focus:border-turquoise focus-visible:ring-turquoise/30 sm:h-15"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Filtros por categoría */}
        <ScrollReveal delay={0.08}>
          <div
            className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center"
            role="tablist"
            aria-label="Filtrar por categoría"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={category === cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                  category === cat
                    ? "border-transparent bg-gradient-brand text-white shadow-md shadow-turquoise/25 scale-[1.03]"
                    : "border-lavender/50 bg-surface text-graphite/80 hover:border-turquoise hover:text-turquoise-ink"
                )}
              >
                {cat}
              </button>
            ))}
            <button
              role="tab"
              aria-selected={onlyFeatured}
              onClick={() => setOnlyFeatured((v) => !v)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                onlyFeatured
                  ? "border-amber-400 bg-amber-400 text-white shadow-md shadow-amber-300/30 scale-[1.03]"
                  : "border-amber-300/60 bg-amber-400/10 text-amber-600 hover:border-amber-400 hover:bg-amber-400/20"
              )}
              aria-label="Mostrar solo expositores destacados"
            >
              <Star className={cn("mr-1 inline h-3.5 w-3.5", onlyFeatured && "fill-current")} aria-hidden="true" />
              Solo destacados
            </button>
          </div>
        </ScrollReveal>

        {/* Encuesta: Votá tu stand favorito */}
        <ScrollReveal className="mt-8">
          <StandVoteStrip />
        </ScrollReveal>

        {/* Contador resultados */}
        <p className="mt-6 text-center text-sm text-muted-foreground" role="status">
          <strong className="text-violet-ink">{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "expositor encontrado" : "expositores encontrados"}
        </p>

        {/* Grilla */}
        {shown.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((ex, i) => (
              <ScrollReveal key={ex.id} delay={Math.min(i * 0.05, 0.4)}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-lavender/40 bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-turquoise/60 hover:shadow-xl hover:shadow-turquoise/10">
                  {/* Acento superior por categoría + barrido de brillo al hover */}
                  <span
                    className={cn(
                      "absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-60 transition-opacity duration-300 group-hover:opacity-100",
                      ex.gradient
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                    aria-hidden="true"
                  >
                    <span className="absolute -inset-y-10 -left-1/2 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-[125%] group-hover:opacity-100" />
                  </span>
                  {/* Favorito */}
                  <button
                    onClick={() => {
                      const wasSaved = !!favs[ex.id];
                      toggleExhibitor({ id: ex.id, name: ex.name, stand: ex.stand, category: ex.category });
                      if (!wasSaved) toast.success("Guardado en Mi ExpoJuy ❤️", { description: ex.name });
                    }}
                    aria-pressed={!!favs[ex.id]}
                    aria-label={favs[ex.id] ? `Quitar ${ex.name} de Mi ExpoJuy` : `Guardar ${ex.name} en Mi ExpoJuy`}
                    title="Guardar en Mi ExpoJuy"
                    className={cn(
                      "absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border shadow-md transition-all duration-200 hover:scale-110 active:scale-90",
                      favs[ex.id]
                        ? "border-rose-300 bg-rose-500 text-white"
                        : "border-lavender/50 bg-surface text-lavender hover:border-rose-300 hover:text-rose-400"
                    )}
                  >
                    <Heart className={cn("h-4 w-4", favs[ex.id] && "fill-current")} aria-hidden="true" />
                  </button>

                  <div className="flex items-start justify-between gap-3">
                    {/* Logo placeholder */}
                    <span
                      className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-display text-lg font-extrabold text-white shadow-md",
                        ex.gradient
                      )}
                      aria-hidden="true"
                    >
                      {ex.initials}
                    </span>
                    <div className="flex flex-col items-end gap-1.5">
                      <Badge
                        variant="outline"
                        className={cn("rounded-full border text-[11px] font-bold", CATEGORY_STYLES[ex.category])}
                      >
                        {ex.category}
                      </Badge>
                      {ex.featured ? (
                        <Badge className="rounded-full border-0 bg-amber-400/15 text-[10px] font-bold text-amber-600">
                          ★ Destacado
                        </Badge>
                      ) : null}
                    </div>
                  </div>

                  <h3 className="font-display mt-4 text-base font-bold leading-snug text-ink">
                    {ex.name}
                  </h3>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-turquoise-ink">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {ex.stand}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {ex.description}
                  </p>

                  <div className="mt-auto pt-4">
                    <Button
                      variant="ghost"
                      onClick={() => openExhibitor(ex)}
                      className="group/btn w-full justify-between rounded-xl bg-turquoise-light/70 text-sm font-bold text-turquoise-ink transition hover:bg-turquoise hover:text-white"
                      aria-label={`Ver perfil completo de ${ex.name}`}
                    >
                      Ver perfil completo
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                    </Button>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-lavender/60 bg-lavender-light/50 py-16 text-center">
            <Building2 className="h-10 w-10 text-lavender" aria-hidden="true" />
            <p className="font-display text-lg font-bold text-ink">No encontramos expositores</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Probá con otro término de búsqueda o revisá todas las categorías.
            </p>
            <Button
              variant="outline"
              className="rounded-full border-violet-brand text-violet-ink hover:bg-violet-brand hover:text-white"
              onClick={() => {
                setQuery("");
                setCategory("Todos");
                setOnlyFeatured(false);
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Ver más */}
        {visible < filtered.length ? (
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-full border-2 border-violet-brand px-8 py-6 font-bold text-violet-ink transition hover:bg-violet-brand hover:text-white hover:shadow-lg hover:shadow-violet-brand/25"
            >
              Ver más expositores ({filtered.length - visible} restantes)
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        ) : null}
      </div>

      {/* Dialog perfil */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg overflow-hidden rounded-3xl p-0">
          {selected && dialogView === "info" ? (
            <>
              {selected.image ? (
                /* Header con foto real del stand (expositores destacados) */
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={selected.image}
                    alt={"Stand de " + selected.name + " en ExpoJuy 2026"}
                    fill
                    sizes="(max-width: 512px) 100vw, 512px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" aria-hidden="true" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
                    <Camera className="h-3.5 w-3.5 text-turquoise" aria-hidden="true" />
                    Foto del stand
                  </span>
                </div>
              ) : (
                <div className={cn("relative h-28 bg-gradient-to-br", selected.gradient)}>
                  <div className="dots-pattern-light absolute inset-0 opacity-40" aria-hidden="true" />
                </div>
              )}
              <div className={cn("-mt-10 px-6 pb-6", !selected.image && "pt-0")}>
                <span
                  className={cn(
                    "flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br font-display text-2xl font-extrabold text-white shadow-lg",
                    selected.gradient
                  )}
                  aria-hidden="true"
                >
                  {selected.initials}
                </span>
                <DialogHeader className="mt-4 items-start text-left space-y-1.5">
                  <DialogTitle className="font-display text-xl font-extrabold text-ink">
                    {selected.name}
                  </DialogTitle>
                  <DialogDescription className="flex flex-wrap items-center gap-2 text-sm">
                    <Badge
                      variant="outline"
                      className={cn("rounded-full border text-[11px] font-bold", CATEGORY_STYLES[selected.category])}
                    >
                      {selected.category}
                    </Badge>
                    {selected.country ? (
                      <Badge className="rounded-full bg-blue-bright/15 text-sky-700 border border-blue-bright/30 text-[11px] font-bold" variant="outline">
                        <Globe2 className="mr-1 h-3 w-3" /> {selected.country}
                      </Badge>
                    ) : null}
                  </DialogDescription>
                </DialogHeader>
                <p className="mt-3 text-sm leading-relaxed text-graphite">
                  {selected.description}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("expojuy:locate-exhibitor", { detail: { id: selected.id } })
                      );
                      setSelected(null);
                    }}
                    className="group rounded-xl bg-turquoise-light p-3.5 text-left ring-turquoise/50 transition hover:ring-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise"
                    aria-label={`Ver ubicación de ${selected.name} en el plano del predio`}
                  >
                    <p className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-turquoise-ink">
                      Ubicación
                      <Crosshair className="h-3.5 w-3.5 transition group-hover:scale-125 group-hover:text-turquoise-dark" aria-hidden="true" />
                    </p>
                    <p className="mt-1 text-sm font-bold text-ink">{selected.stand}</p>
                    <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-turquoise-dark opacity-80 transition group-hover:opacity-100">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      Ver en el mapa
                    </p>
                  </button>
                  <div className="rounded-xl bg-lavender-light p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-violet-ink">Zona</p>
                    <p className="mt-1 text-sm font-bold text-ink">
                      {ZONES.find((z) => z.id === selected.zone)?.name}
                    </p>
                  </div>
                </div>
                {/* Compartir perfil (deep-link #expositor-id) */}
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-lavender/40 pt-4">
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <Share2 className="h-3 w-3" aria-hidden="true" />
                    Compartir
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const url = `${window.location.origin}/#expositor-${selected.id}`;
                      const text = `${selected.name} en ExpoJuy 2026 · ${selected.stand}`;
                      window.open(
                        `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="h-8 rounded-full border-lavender/50 text-xs font-bold text-ink hover:bg-green-50 hover:text-green-700"
                    aria-label={`Compartir ${selected.name} por WhatsApp`}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const url = `${window.location.origin}/#expositor-${selected.id}`;
                      const text = `${selected.name} en ExpoJuy 2026 · ${selected.stand}`;
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="h-8 rounded-full border-lavender/50 text-xs font-bold text-ink hover:bg-sky-50 hover:text-sky-700"
                    aria-label={`Compartir ${selected.name} en X (Twitter)`}
                  >
                    X / Twitter
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      try {
                        downloadVCard(selected);
                        toast.success(`Contacto de ${selected.name} descargado (.vcf)`);
                      } catch {
                        toast.error("No se pudo generar el contacto");
                      }
                    }}
                    className="h-8 rounded-full border-lavender/50 text-xs font-bold text-ink hover:bg-emerald-50 hover:text-emerald-700"
                    aria-label={`Guardar contacto de ${selected.name} en la agenda`}
                  >
                    Guardar contacto
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(`${window.location.origin}/#expositor-${selected.id}`);
                        toast.success("Enlace del expositor copiado");
                      } catch {
                        toast.error("No se pudo copiar el enlace");
                      }
                    }}
                    className="h-8 rounded-full border-lavender/50 text-xs font-bold text-ink hover:bg-violet-brand/10 hover:text-violet-ink"
                    aria-label={`Copiar enlace del perfil de ${selected.name}`}
                  >
                    Copiar enlace
                  </Button>
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <Button
                    onClick={() => setDialogView("meeting")}
                    className="bg-gradient-brand h-12 rounded-full font-bold text-white shadow-md shadow-turquoise/25 transition hover:brightness-110"
                  >
                    <CalendarClock className="mr-2 h-4.5 w-4.5" aria-hidden="true" />
                    Solicitar reunión B2B
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      onClick={voteSelected}
                      disabled={voting}
                      className={cn(
                        "h-11 flex-1 rounded-full border-2 font-bold transition",
                        voteState?.myVote === selected.id
                          ? "border-turquoise bg-turquoise text-white shadow-md shadow-turquoise/25 hover:bg-turquoise-dark"
                          : "border-amber-400/70 bg-amber-400/10 text-amber-600 hover:border-amber-400 hover:bg-amber-400 hover:text-white"
                      )}
                      aria-label={
                        voteState?.myVote === selected.id
                          ? `Tu voto actual: ${selected.name}. Podés cambiarlo tocando acá`
                          : `Votar a ${selected.name} como stand favorito`
                      }
                    >
                      {voting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <Trophy className={cn("mr-2 h-4 w-4", voteState?.myVote === selected.id && "fill-current")} aria-hidden="true" />
                      )}
                      {voteState?.myVote === selected.id ? "Tu voto" : "Votar stand favorito"}
                    </Button>
                    <Button asChild variant="outline" className="h-11 flex-1 rounded-full border-2 border-violet-brand font-bold text-violet-ink hover:bg-violet-brand hover:text-white">
                      <a href="#agenda" onClick={() => setSelected(null)}>
                        Ver agenda
                      </a>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    className="h-10 rounded-full font-bold text-muted-foreground hover:bg-lavender-light hover:text-ink"
                    onClick={() => setSelected(null)}
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </>
          ) : null}

          {selected && dialogView === "meeting" ? (
            <MeetingForm exhibitor={selected} onBack={() => setDialogView("info")} />
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ── Formulario de solicitud de reunión B2B ─────────────── */

function MeetingForm({ exhibitor, onBack }: { exhibitor: Exhibitor; onBack: () => void }) {
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exhibitorId: exhibitor.id,
          exhibitorName: exhibitor.name,
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          company: String(fd.get("company") ?? ""),
          preferredSlot: String(fd.get("slot") ?? ""),
          message: String(fd.get("message") ?? ""),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al enviar");
      setDone(true);
      toast.success("¡Reunión solicitada!", { description: data.message });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos enviar tu solicitud.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-turquoise/15">
          <CheckCircle2 className="h-8 w-8 text-turquoise-ink" aria-hidden="true" />
        </span>
        <DialogTitle className="font-display text-xl font-extrabold text-ink">
          ¡Reunión solicitada!
        </DialogTitle>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          El equipo comercial de <strong className="text-violet-ink">{exhibitor.name}</strong> va a
          confirmar tu reunión por email. Encontrá esta y otras solicitudes en tu casilla.
        </p>
        <Button onClick={onBack} variant="outline" className="rounded-full border-2 border-turquoise font-bold text-turquoise-ink hover:bg-turquoise hover:text-white">
          Volver al perfil
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="-ml-2 mb-3 rounded-full text-muted-foreground hover:text-violet-ink"
      >
        <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
        Volver al perfil
      </Button>
      <DialogHeader className="items-start space-y-1.5 text-left">
        <DialogTitle className="font-display text-lg font-extrabold text-ink">
          Reunión B2B con {exhibitor.name}
        </DialogTitle>
        <DialogDescription>
          Ronda de negocios oficial · {exhibitor.stand}. Elegí una franja y te confirmamos por email.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={submit} className="mt-5 flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="mtg-name">Nombre completo *</Label>
            <Input id="mtg-name" name="name" required minLength={3} placeholder="Tu nombre" className="h-11 rounded-xl" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="mtg-email">Email *</Label>
            <Input id="mtg-email" name="email" type="email" required placeholder="tu@empresa.com" className="h-11 rounded-xl" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="mtg-company">Empresa</Label>
            <Input id="mtg-company" name="company" placeholder="Razón social" className="h-11 rounded-xl" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="mtg-slot">Franja preferida *</Label>
            <Select name="slot" required defaultValue={MEETING_SLOTS[0]}>
              <SelectTrigger id="mtg-slot" className="h-11 w-full rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MEETING_SLOTS.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="mtg-message">¿Qué te interesa de {exhibitor.name}? *</Label>
          <Textarea
            id="mtg-message"
            name="message"
            required
            minLength={10}
            rows={3}
            placeholder="Contanos brevemente el objetivo de la reunión..."
            className="resize-none rounded-xl"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-gradient-brand h-12 rounded-full text-sm font-bold text-white disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              Enviando solicitud...
            </>
          ) : (
            "Confirmar solicitud de reunión"
          )}
        </Button>
      </form>
    </div>
  );
}
