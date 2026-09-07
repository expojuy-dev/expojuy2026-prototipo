"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Ticket, Store, MapPin, CalendarDays, Search, ChevronDown, Globe } from "lucide-react";
import { ExpoJuyLogo } from "./logo";
import { SOCIALS, EVENT } from "@/lib/data";
import { openSearchPalette } from "./search-palette";
import { ThemeToggle, ThemeToggleInline } from "./theme-toggle";
import { InstallAppSheetItem } from "./install-app";
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
};

/* Links principales visibles en la barra */
const PRIMARY_NAV = [
  { href: "#sobre", label: "Sobre ExpoJuy", shortLabel: "Sobre" },
  { href: "#expositores", label: "Expositores", shortLabel: "Expositores" },
  { href: "#agenda", label: "Agenda", shortLabel: "Agenda" },
  { href: "#mapa", label: "Mapa del Predio", shortLabel: "Mapa" },
];

/* Links secundarios que van dentro de "Más" */
const MORE_NAV = [
  { href: "#noticias", label: "Noticias", shortLabel: "Noticias" },
  { href: "#sponsors", label: "Sponsors", shortLabel: "Sponsors" },
  { href: "#faq", label: "FAQ", shortLabel: "FAQ" },
  { href: "#contacto", label: "Contacto", shortLabel: "Contacto" },
];

/* Todos los links combinados para el menú mobile */
const NAV_LINKS = [
  { href: "#inicio", label: "Inicio", shortLabel: null },
  ...PRIMARY_NAV,
  ...MORE_NAV,
];

/* Idiomas disponibles */
const LANGUAGES = [
  { code: "es", label: "Español", flag: "🇦🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState("#inicio");
  const [open, setOpen] = React.useState(false);
  const [lang, setLang] = React.useState<string>("es");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy simple
  React.useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Barra de progreso de scroll (arcoíris) */}
      <motion.div
        aria-hidden="true"
        className="rainbow-line fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
        style={{ scaleX: progress }}
      />
      {/* Barra superior fina */}
      <div
        className={cn(
          "bg-deep text-white transition-all duration-300 overflow-hidden",
          scrolled ? "h-0 opacity-0" : "h-9 opacity-100"
        )}
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-[11px] sm:px-6">
          <div className="flex items-center gap-4 truncate">
            <span className="inline-flex items-center gap-1.5 text-lavender">
              <CalendarDays className="h-3.5 w-3.5 text-turquoise" aria-hidden="true" />
              {EVENT.daysLabel}, 2026
            </span>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <MapPin className="h-3.5 w-3.5 text-turquoise" aria-hidden="true" />
              {EVENT.address}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Selector de idioma */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[11px] font-semibold text-white/80 transition hover:border-turquoise/60 hover:text-turquoise"
                >
                  <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">{currentLang.flag} {currentLang.label}</span>
                  <span className="sm:hidden">{currentLang.flag}</span>
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px]">
                {LANGUAGES.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={cn(
                      "cursor-pointer gap-2 text-sm font-medium",
                      lang === l.code && "text-turquoise"
                    )}
                  >
                    <span>{l.flag}</span> {l.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Modo claro / oscuro */}
            <ThemeToggle />
            <div className="flex items-center gap-1" aria-label="Redes sociales">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-turquoise"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              );
            })}
            </div>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <div
        className={cn(
          "bg-surface/90 backdrop-blur-lg transition-shadow duration-300",
          scrolled ? "shadow-[0_6px_24px_-8px_rgba(42,23,69,0.18)]" : "shadow-none",
          "border-b border-lavender/30"
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#inicio" aria-label="ExpoJuy 2026 — Inicio" className="shrink-0">
            <ExpoJuyLogo />
          </a>

          {/* Links desktop: primarios + dropdown "Más" */}
          <nav aria-label="Navegación principal" className="hidden min-w-0 xl:block">
            <ul className="flex items-center gap-0.5">
              {PRIMARY_NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative whitespace-nowrap rounded-full px-2.5 py-2 text-[12.5px] font-semibold transition-colors",
                      active === link.href
                        ? "text-violet-ink"
                        : "text-graphite/80 hover:text-turquoise-ink"
                    )}
                  >
                    {link.shortLabel}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-brand transition-all duration-300",
                        active === link.href ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                      )}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
              {/* Dropdown "Más" */}
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[12.5px] font-semibold transition-colors",
                        MORE_NAV.some((l) => active === l.href)
                          ? "text-violet-ink"
                          : "text-graphite/80 hover:text-turquoise-ink"
                      )}
                    >
                      Más
                      <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                      <span
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-brand transition-all duration-300",
                          MORE_NAV.some((l) => active === l.href) ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[160px]">
                    {MORE_NAV.map((link) => (
                      <DropdownMenuItem key={link.href} asChild>
                        <a
                          href={link.href}
                          className={cn(
                            "cursor-pointer text-sm font-semibold",
                            active === link.href ? "text-turquoise" : ""
                          )}
                        >
                          {link.label}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </nav>

          {/* CTAs: Buscar + Expositor + Entradas */}
          <div className="flex items-center gap-2">
            {/* Toggle de tema siempre visible en desktop (la barra superior se oculta al scrollear) */}
            <ThemeToggle variant="nav" className="hidden md:inline-flex" />
            {/* Buscador global (Ctrl+K) — movido desde la barra superior */}
            <button
              type="button"
              onClick={openSearchPalette}
              aria-label="Abrir buscador del sitio (Ctrl+K)"
              className="group hidden items-center gap-1.5 rounded-full border border-lavender/50 bg-transparent px-3 py-1.5 text-graphite/80 transition hover:border-turquoise/60 hover:text-turquoise-ink md:inline-flex"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span className="text-[12px] font-semibold">Buscar</span>
              <kbd className="hidden rounded border border-lavender/40 bg-lavender-light px-1 font-mono text-[9px] font-bold text-graphite/60 xl:inline">
                Ctrl K
              </kbd>
            </button>
            <Button
              asChild
              variant="outline"
              className="hidden whitespace-nowrap rounded-full border-2 border-violet-brand bg-transparent px-4 font-bold text-violet-ink transition hover:bg-violet-brand hover:text-white hover:shadow-lg hover:shadow-violet-brand/25 md:inline-flex md:flex"
            >
              <a href="#contacto">
                <Store className="h-4 w-4" aria-hidden="true" />
                Quiero ser Expositor
              </a>
            </Button>
            <Button
              asChild
              className="bg-gradient-brand hidden whitespace-nowrap rounded-full px-4 font-bold text-white shadow-md shadow-turquoise/30 transition hover:shadow-xl hover:shadow-turquoise/40 hover:brightness-105 sm:inline-flex sm:flex"
            >
              <a href="#entradas">
                <Ticket className="h-4 w-4" aria-hidden="true" />
                Comprar Entradas
              </a>
            </Button>

            {/* Menú mobile */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Abrir menú"
                  className="rounded-full border-lavender/60 text-ink xl:hidden"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[86vw] max-w-sm overflow-y-auto border-l-0 bg-surface p-0 custom-scrollbar"
              >
                <SheetHeader className="border-b border-lavender/30 p-5 text-left">
                  <SheetTitle asChild>
                    <div>
                      <ExpoJuyLogo />
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <nav aria-label="Navegación mobile" className="p-4">
                  <ul className="flex flex-col gap-1">
                    {NAV_LINKS.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-sm font-semibold transition",
                            active === link.href
                              ? "bg-lavender-light text-violet-ink"
                              : "text-graphite hover:bg-turquoise-light hover:text-turquoise-ink"
                          )}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {/* Selector de idioma en mobile */}
                  <div className="mt-4 border-t border-lavender/30 pt-4">
                    <p className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-graphite/60">Idioma</p>
                    <div className="flex gap-2 px-4">
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => setLang(l.code)}
                          className={cn(
                            "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition",
                            lang === l.code
                              ? "border-turquoise bg-turquoise-light text-turquoise-ink"
                              : "border-lavender/40 text-graphite hover:border-turquoise/50"
                          )}
                        >
                          <span>{l.flag}</span> {l.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 border-t border-lavender/30 pt-4">
                    <ThemeToggleInline className="w-full" />
                    <InstallAppSheetItem onNavigate={() => setOpen(false)} />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setOpen(false);
                        openSearchPalette();
                      }}
                      className="rounded-full border-dashed border-lavender/70 font-bold text-violet-dark hover:border-turquoise hover:text-turquoise-ink"
                    >
                      <Search className="h-4 w-4" /> Buscar en el sitio
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-2 border-violet-brand font-bold text-violet-ink"
                    >
                      <a href="#contacto" onClick={() => setOpen(false)}>
                        <Store className="h-4 w-4" /> Quiero ser Expositor
                      </a>
                    </Button>
                    <Button asChild className="bg-gradient-brand rounded-full font-bold text-white">
                      <a href="#entradas" onClick={() => setOpen(false)}>
                        <Ticket className="h-4 w-4" /> Comprar Entradas
                      </a>
                    </Button>
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    {SOCIALS.map((s) => {
                      const Icon = SOCIAL_ICONS[s.icon];
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="rounded-full border border-lavender/40 p-2.5 text-violet-ink transition hover:bg-violet-brand hover:text-white"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {/* Línea arcoíris sutil al pie del header */}
        <div className="rainbow-line h-[3px] w-full opacity-80" aria-hidden="true" />
      </div>
    </header>
  );
}
