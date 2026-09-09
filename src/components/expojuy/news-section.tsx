"use client";

import * as React from "react";
import Image from "next/image";
import { CalendarDays, Clock3, ArrowRight, Newspaper, Download, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NEWS, EVENT, type NewsItem } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function NewsSection() {
  const featured = NEWS.find((n) => n.featured) ?? NEWS[0];
  const rest = NEWS.filter((n) => n.id !== featured.id);
  const [open, setOpen] = React.useState<NewsItem | null>(null);
  const [showAll, setShowAll] = React.useState(false);

  const newsById = React.useMemo(() => new Map(NEWS.map((n) => [n.id, n])), []);

  // Abrir desde la URL: #noticia-n1 (deep-link compartible)
  React.useEffect(() => {
    const openFromHash = () => {
      const m = window.location.hash.match(/^#noticia-(n\d+)$/);
      if (m && newsById.has(m[1])) setOpen(newsById.get(m[1])!);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [newsById]);

  // Escucha aperturas desde el buscador global (expojuy:open-news)
  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      const item = id ? newsById.get(id) : undefined;
      if (item) {
        setOpen(item);
        document.getElementById("noticias")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("expojuy:open-news", onOpen);
    return () => window.removeEventListener("expojuy:open-news", onOpen);
  }, [newsById]);

  // Sincroniza el hash con la noticia abierta (para compartir)
  React.useEffect(() => {
    if (open) {
      history.replaceState(null, "", `#noticia-${open.id}`);
    } else if (window.location.hash.startsWith("#noticia-")) {
      history.replaceState(null, "", "#noticias");
    }
  }, [open]);

  const shareUrl = open ? `${window.location.origin}/#noticia-${open.id}` : "";

  return (
    <section id="noticias" className="bg-background py-20 sm:py-24" aria-label="Noticias y novedades">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Sala de Prensa"
          title="Noticias y"
          highlight="novedades"
          description="Todo lo que pasa rumbo a ExpoJuy 2026: confirmaciones, lanzamientos y anuncios oficiales del comité organizador."
        />

        {/* Noticia destacada */}
        <ScrollReveal>
          <article
            className="group grid cursor-pointer overflow-hidden rounded-3xl border border-lavender/50 bg-surface shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-violet-brand/15 lg:grid-cols-2"
            onClick={() => setOpen(featured)}
            role="button"
            tabIndex={0}
            aria-label={`Leer noticia destacada: ${featured.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") setOpen(featured);
            }}
          >
            <div className="relative min-h-[260px] overflow-hidden lg:min-h-[380px]">
              <Image
                src={featured.image}
                alt={`Imagen de la noticia: ${featured.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <Badge className="bg-gradient-brand absolute left-4 top-4 rounded-full border-0 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg">
                ⭐ Destacada
              </Badge>
            </div>
            <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-muted-foreground">
                <Badge variant="outline" className="rounded-full border-turquoise/50 bg-turquoise-light font-bold text-turquoise-ink">
                  {featured.category}
                </Badge>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  {featured.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                  {featured.readTime} de lectura
                </span>
              </div>
              <h3 className="font-display text-2xl font-extrabold leading-snug text-ink transition group-hover:text-violet-ink sm:text-3xl">
                {featured.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-violet-ink">
                Leer más
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
              </span>
            </div>
          </article>
        </ScrollReveal>

        {/* Grilla de noticias */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(showAll ? rest : rest.slice(0, 3)).map((news, i) => (
            <ScrollReveal key={news.id} delay={Math.min(i * 0.07, 0.35)}>
              <article
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-lavender/50 bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-turquoise/50 hover:shadow-xl hover:shadow-turquoise/10"
                onClick={() => setOpen(news)}
                role="button"
                tabIndex={0}
                aria-label={`Leer noticia: ${news.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setOpen(news);
                }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={news.image}
                    alt={`Imagen de la noticia: ${news.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <Badge className="absolute left-3 top-3 rounded-full border-0 bg-deep/85 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                    {news.category}
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-5">
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" aria-hidden="true" />
                      {news.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3 w-3" aria-hidden="true" />
                      {news.readTime}
                    </span>
                  </div>
                  <h3 className="font-display line-clamp-2 text-base font-bold leading-snug text-ink transition group-hover:text-violet-ink">
                    {news.title}
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {news.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-bold text-turquoise-ink">
                    Leer más
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {rest.length > 3 && (
          <div className="mt-10 flex justify-center">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="group rounded-full border-2 border-lavender/50 px-6 font-bold text-violet-ink transition hover:border-violet-brand hover:bg-violet-brand hover:text-white dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:border-violet-400/50"
            >
              {showAll ? "Ocultar noticias" : "Ver más noticias"}
              <ArrowRight 
                className={cn(
                  "ml-2 h-4 w-4 transition-transform", 
                  showAll ? "-rotate-90 group-hover:-translate-y-1" : "group-hover:translate-x-1"
                )} 
                aria-hidden="true" 
              />
            </Button>
          </div>
        )}

        {/* Kit de medios */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 relative overflow-hidden w-full bg-white/95 dark:bg-[#1a1236]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-purple-500/20 shadow-[0_20px_45px_-15px_rgba(99,102,241,0.08),0_4px_16px_-2px_rgba(15,23,42,0.04)] dark:shadow-2xl dark:shadow-purple-950/60 transition-all duration-300 hover:shadow-2xl hover:border-slate-300 dark:hover:border-purple-500/30 p-6 sm:p-7 md:p-8 lg:px-9 lg:py-7">
            {/* Background subtle gradient highlights */}
            <div aria-hidden="true" className="absolute -right-24 -top-24 w-64 h-64 bg-gradient-to-br from-cyan-100/40 via-violet-100/30 to-transparent dark:from-purple-600/10 dark:via-cyan-600/10 rounded-full blur-2xl pointer-events-none"></div>
            <div aria-hidden="true" className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-tr from-cyan-50/50 via-slate-100/50 to-transparent dark:from-cyan-600/10 dark:via-purple-600/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start sm:items-center justify-between gap-6 lg:gap-8">
              {/* Left: Icon and textual information */}
              <div className="flex items-start sm:items-center gap-4 sm:gap-5 w-full lg:w-auto">
                {/* Camera icon container */}
                <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-50/80 dark:bg-white/[0.04] border border-cyan-200/80 dark:border-white/10 flex items-center justify-center shadow-inner group transition-transform duration-300 hover:scale-105 dark:hover:border-cyan-400/50">
                  <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-600 dark:text-[#00d2ff] group-hover:text-cyan-500 dark:group-hover:drop-shadow-[0_0_8px_rgba(0,210,255,0.7)] transition-all" aria-hidden="true" />
                </div>
                {/* Title and description */}
                <div className="flex flex-col text-left space-y-1 sm:space-y-1.5 flex-1 min-w-0">
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                    <span>Sala de Prensa</span>
                    <span className="text-slate-400 font-light">—</span>
                    <span>Kit de Medios</span>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300/90 leading-relaxed max-w-xl">
                    Logos oficiales, fotografías en alta resolución y comunicados para prensa acreditada.
                  </p>
                </div>
              </div>

              {/* Right: Call to Actions */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-3.5 w-full lg:w-auto justify-start lg:justify-end shrink-0 pt-2 lg:pt-0">
                {/* Primary CTA */}
                <Button asChild className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-6 sm:py-3 rounded-full text-white font-semibold text-sm sm:text-base bg-gradient-to-r from-cyan-500 via-[#00a8cc] to-violet-600 dark:from-[#00c9db] dark:via-[#2185d0] dark:to-[#8024c7] hover:from-cyan-400 hover:to-violet-500 dark:hover:from-[#00e1f7] dark:hover:to-[#912be0] shadow-[0_8px_20px_-4px_rgba(6,182,212,0.45)] dark:shadow-md dark:shadow-cyan-500/20 transition-all duration-300 hover:scale-105 active:scale-95 border-0 h-auto">
                  <a href="/images/hero-feria.png" download aria-label="Descargar foto oficial del predio">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white/95" aria-hidden="true" />
                    <span>Descargar kit</span>
                  </a>
                </Button>

                {/* Secondary CTA */}
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-6 sm:py-3 rounded-full text-slate-700 dark:text-slate-200 font-medium text-sm sm:text-base bg-slate-50/90 dark:bg-white/5 hover:bg-slate-100/90 dark:hover:bg-white/10 border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-900 dark:hover:text-white transition-all duration-200 shadow-sm h-auto"
                >
                  <a href={`mailto:${EVENT.pressEmail}`}>{EVENT.pressEmail}</a>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Dialog de noticia */}
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-3xl p-0 custom-scrollbar">
          {open ? (
            <article>
              <div className="relative aspect-[16/8] w-full">
                <Image
                  src={open.image}
                  alt={`Imagen de la noticia: ${open.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent" />
                <DialogHeader className="absolute bottom-0 left-0 right-0 items-start p-6 text-left">
                  <Badge className="mb-2 w-fit rounded-full border-0 bg-turquoise px-3 py-1 text-[11px] font-bold text-white">
                    {open.category}
                  </Badge>
                  <DialogTitle className="font-display pr-4 text-xl font-extrabold leading-snug text-white sm:text-2xl">
                    {open.title}
                  </DialogTitle>
                  <DialogDescription className="flex items-center gap-2 text-xs font-semibold text-white/80">
                    <Newspaper className="h-3.5 w-3.5" aria-hidden="true" />
                    {open.date} · {open.readTime} de lectura
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="space-y-4 p-6 sm:p-8">
                {/* Cuerpo del artículo */}
                {open.body.map((paragraph, i) =>
                  i === 0 ? (
                    <p
                      key={i}
                      className="text-[15px] font-medium leading-relaxed text-graphite first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:font-black first-letter:leading-[0.85] first-letter:text-violet-ink"
                    >
                      {paragraph}
                    </p>
                  ) : (
                    <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  )
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {open.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="rounded-full border-lavender/60 bg-lavender-light/60 text-[11px] font-bold text-violet-dark"
                    >
                      #{t}
                    </Badge>
                  ))}
                </div>

                {/* Contacto prensa */}
                <p className="rounded-2xl bg-turquoise-light/50 p-3.5 text-xs leading-relaxed text-graphite/80">
                  Para más información, consultas de prensa o solicitud de entrevistas, escribinos a{" "}
                  <a
                    href={`mailto:${EVENT.pressEmail}`}
                    className="font-bold text-violet-ink underline"
                  >
                    {EVENT.pressEmail}
                  </a>
                  . Seguí la cobertura completa en nuestras redes sociales oficiales.
                </p>

                {/* Compartir */}
                <div className="flex flex-wrap items-center gap-2 border-t border-lavender/40 pt-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Compartir
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const url = shareUrl;
                      const text = `${open.title} — ExpoJuy 2026`;
                      window.open(
                        `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="h-8 rounded-full border-lavender/50 text-xs font-bold text-ink hover:bg-green-50 hover:text-green-700"
                    aria-label="Compartir por WhatsApp"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const url = shareUrl;
                      const text = `${open.title} — ExpoJuy 2026`;
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="h-8 rounded-full border-lavender/50 text-xs font-bold text-ink hover:bg-sky-50 hover:text-sky-700"
                    aria-label="Compartir en X (Twitter)"
                  >
                    X / Twitter
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(shareUrl);
                        toast.success("Enlace copiado al portapapeles");
                      } catch {
                        toast.error("No se pudo copiar el enlace");
                      }
                    }}
                    className="h-8 rounded-full border-lavender/50 text-xs font-bold text-ink hover:bg-violet-brand/10 hover:text-violet-ink"
                    aria-label="Copiar enlace de la noticia"
                  >
                    Copiar enlace
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Button asChild className="bg-gradient-brand flex-1 rounded-full font-bold text-white">
                    <a href="#entradas" onClick={() => setOpen(null)}>
                      Conseguir entradas
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const idx = NEWS.findIndex((n) => n.id === open.id);
                      const next = NEWS[(idx + 1) % NEWS.length];
                      setOpen(next);
                    }}
                    className="flex-1 rounded-full border-2 border-violet-brand font-bold text-violet-ink hover:bg-violet-brand hover:text-white"
                  >
                    Leer siguiente →
                  </Button>
                </div>
              </div>
            </article>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
