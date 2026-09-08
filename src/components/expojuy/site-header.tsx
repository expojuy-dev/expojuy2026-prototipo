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
import { Menu, Ticket, Store, MapPin, CalendarDays, Search, ChevronDown, Newspaper, Award, HelpCircle, Mail } from "lucide-react";
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
  { href: "#inicio", label: "Inicio", shortLabel: "Inicio" },
  { href: "#sobre", label: "Sobre ExpoJuy", shortLabel: "Sobre ExpoJuy" },
  { href: "#expositores", label: "Expositores", shortLabel: "Expositores" },
  { href: "#agenda", label: "Agenda", shortLabel: "Agenda" },
];

/* Links secundarios que van dentro de "Más" */
const MORE_NAV = [
  { href: "#mapa", label: "Mapa del Predio", shortLabel: "Mapa", description: "Ubicación de stands y pabellones", icon: MapPin },
  { href: "#noticias", label: "Noticias", shortLabel: "Noticias", description: "Novedades y comunicados oficiales", icon: Newspaper },
  { href: "#sponsors", label: "Sponsors", shortLabel: "Sponsors", description: "Empresas e instituciones aliadas", icon: Award },
  { href: "#faq", label: "Preguntas Frecuentes", shortLabel: "FAQ", description: "Horarios, accesos e información útil", icon: HelpCircle },
  { href: "#contacto", label: "Contacto", shortLabel: "Contacto", description: "Mesa de ayuda y prensa", icon: Mail },
];

/* Todos los links combinados para el menú mobile */
const NAV_LINKS = [
  { href: "#inicio", label: "Inicio", shortLabel: null },
  ...PRIMARY_NAV,
  ...MORE_NAV,
];

/* Idiomas disponibles con abreviatura */
export const LANGUAGES = [
  { code: "es", label: "Español", short: "ES", flag: "🇦🇷" },
  { code: "en", label: "English", short: "EN", flag: "🇺🇸" },
  { code: "pt", label: "Português", short: "PT", flag: "🇧🇷" },
] as const;

/**
 * Botón circular para elegir idioma con el mismo tamaño y proporciones
 * que el botón de modo claro/oscuro (ThemeToggle).
 */
export function LanguageToggle({
  className,
  variant = "topbar",
  currentCode,
  onSelect,
}: {
  className?: string;
  variant?: "topbar" | "nav";
  currentCode: string;
  onSelect: (code: string) => void;
}) {
  const currentLang = LANGUAGES.find((l) => l.code === currentCode) ?? LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Cambiar idioma. Idioma seleccionado: ${currentLang.label}`}
          title={`Idioma: ${currentLang.label}`}
          className={cn(
            "group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border font-extrabold tracking-tight transition-all duration-300 hover:scale-105 active:scale-95",
            variant === "topbar"
              ? "h-7 w-7 text-[9px] border-white/20 bg-surface/10 text-white/85 hover:border-turquoise/70 hover:text-turquoise"
              : "h-9 w-9 text-[11px] border-lavender/60 bg-turquoise-light text-violet-ink hover:border-turquoise hover:text-turquoise-ink",
            className
          )}
        >
          <span className="select-none leading-none uppercase">{currentLang.short}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[145px] rounded-xl border border-lavender/40 bg-surface/95 p-1.5 shadow-xl backdrop-blur-md z-50"
      >
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => onSelect(l.code)}
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors",
              currentCode === l.code
                ? "bg-turquoise-light text-turquoise-ink font-bold"
                : "text-graphite hover:bg-lavender-light hover:text-ink"
            )}
          >
            <span className="flex items-center gap-2">
              <span className="text-base leading-none">{l.flag}</span>
              <span>{l.label}</span>
            </span>
            <span
              className={cn(
                "rounded px-1 text-[10px] font-mono font-bold uppercase",
                currentCode === l.code
                  ? "bg-turquoise/20 text-turquoise-ink"
                  : "text-graphite/50"
              )}
            >
              {l.short}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState("#inicio");
  const [open, setOpen] = React.useState(false);
  const [lang, setLang] = React.useState<string>("es");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

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
          <div className="flex items-center gap-2">
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
            <div className="ml-2 flex items-center gap-2 border-l border-white/10 pl-3">
              {/* Selector de idioma circular */}
              <LanguageToggle
                variant="topbar"
                currentCode={lang}
                onSelect={setLang}
              />
              {/* Modo claro / oscuro */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <div
        className={cn(
          "bg-surface/90 backdrop-blur-lg transition-shadow duration-300",
          scrolled ? "shadow-[0_6px_24px_-8px_rgba(42,23,69,0.18)]" : "shadow-[0_1px_2px_rgba(0,0,0,0.02)]",
          "border-b border-black/5 dark:border-white/10"
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#inicio" aria-label="ExpoJuy 2026 — Inicio" className="shrink-0">
            <ExpoJuyLogo />
          </a>

          {/* Links desktop: primarios + dropdown "Más" */}
          <nav aria-label="Navegación principal" className="hidden min-w-0 xl:block">
            <ul className="flex items-center gap-0.5 rounded-full bg-black/[0.02] p-1 dark:bg-white/[0.02]">
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
                  <DropdownMenuContent align="start" className="min-w-[280px] rounded-2xl border-lavender/40 bg-surface/95 p-2 shadow-xl backdrop-blur-md">
                    <div className="mb-2 mt-1 px-3 text-[10px] font-bold uppercase tracking-wider text-graphite/60">
                      Secciones Adicionales
                    </div>
                    {MORE_NAV.map((link) => {
                      const Icon = link.icon;
                      return (
                        <DropdownMenuItem 
                          key={link.href} 
                          asChild 
                          className={cn(
                            "group/item cursor-pointer rounded-xl p-2 outline-none transition-colors",
                            active === link.href ? "hover:bg-turquoise-ink/10 focus:bg-turquoise-ink/10" : "hover:bg-lavender-light focus:bg-lavender-light"
                          )}
                        >
                          <a
                            href={link.href}
                            className={cn(
                              "flex items-start gap-3 rounded-xl transition-colors",
                              active === link.href ? "bg-turquoise-ink/10 border-l-[3px] border-turquoise-ink pl-2" : "border-l-[3px] border-transparent pl-2"
                            )}
                          >
                            <div className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                              active === link.href
                                ? "bg-turquoise-ink shadow-sm"
                                : "bg-lavender-light group-hover/item:bg-violet-brand group-hover/item:shadow-sm"
                            )}>
                              <Icon 
                                className={cn(
                                  "h-4 w-4 transition-colors",
                                  active === link.href ? "text-white" : "text-violet-ink group-hover/item:text-white"
                                )} 
                                aria-hidden="true" 
                              />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[13px] font-bold text-ink">
                                {link.label}
                              </span>
                              <span className="text-[11px] font-medium leading-snug text-graphite/70">
                                {link.description}
                              </span>
                            </div>
                          </a>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <div className="mx-1 h-4 w-px bg-lavender/50 dark:bg-white/10" aria-hidden="true" />
              <li>
                <button
                  type="button"
                  onClick={openSearchPalette}
                  aria-label="Abrir buscador del sitio (Ctrl+K)"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-graphite/80 transition-colors hover:bg-black/5 hover:text-turquoise-ink dark:text-white/80 dark:hover:bg-white/10"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            </ul>
          </nav>

          {/* CTAs: Buscar + Expositor + Entradas */}
          <div className="flex items-center gap-2">
            {/* Selector de idioma circular visible en desktop */}
            <LanguageToggle
              variant="nav"
              className="hidden md:inline-flex"
              currentCode={lang}
              onSelect={setLang}
            />
            {/* Toggle de tema siempre visible en desktop (la barra superior se oculta al scrollear) */}
            <ThemeToggle variant="nav" className="hidden md:inline-flex" />
            {/* Buscador global (Ctrl+K) movido a la barra de navegación */}
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
                    <div className="flex flex-wrap gap-2 px-4">
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => setLang(l.code)}
                          className={cn(
                            "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                            lang === l.code
                              ? "border-turquoise bg-turquoise-light text-turquoise-ink font-bold shadow-sm"
                              : "border-lavender/40 text-graphite hover:border-turquoise/50"
                          )}
                        >
                          <span className="text-base leading-none">{l.flag}</span>
                          <span>{l.label}</span>
                          <span className="rounded bg-black/5 px-1 py-0.5 font-mono text-[10px] font-bold uppercase dark:bg-white/10">
                            {l.short}
                          </span>
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
