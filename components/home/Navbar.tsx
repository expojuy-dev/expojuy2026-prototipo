"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Share2,
  Globe,
  Radio,
  ChevronDown,
  Menu,
  X,
  MapPin,
  Newspaper,
  Award,
  HelpCircle,
  Mail,
  Calendar,
  Users,
  Info,
  Home,
  Ticket,
} from "lucide-react";

// Primary visible links
const MAIN_NAV_LINKS = [
  { href: "#inicio", label: "Inicio", icon: Home },
  { href: "#sobre-expojuy", label: "Sobre ExpoJuy", icon: Info },
  { href: "#expositores", label: "Expositores", icon: Users },
  { href: "#agenda", label: "Agenda", icon: Calendar },
];

// Grouped links under "Más" dropdown
const SECONDARY_NAV_LINKS = [
  {
    href: "#mapa",
    label: "Mapa del Predio",
    desc: "Ubicación de stands y pabellones",
    icon: MapPin,
  },
  {
    href: "#noticias",
    label: "Noticias",
    desc: "Novedades y comunicados oficiales",
    icon: Newspaper,
  },
  {
    href: "#sponsors",
    label: "Sponsors",
    desc: "Empresas e instituciones aliadas",
    icon: Award,
  },
  {
    href: "#faq",
    label: "Preguntas Frecuentes",
    desc: "Horarios, accesos e información útil",
    icon: HelpCircle,
  },
  {
    href: "#contacto",
    label: "Contacto",
    desc: "Mesa de ayuda y prensa",
    icon: Mail,
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scrollspy effect: Detect active section as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const allHrefIds = [
        ...MAIN_NAV_LINKS,
        ...SECONDARY_NAV_LINKS,
        { href: "#entradas" },
      ].map((link) => link.href.replace("#", ""));

      const scrollPosition = window.scrollY + 140;

      for (let i = allHrefIds.length - 1; i >= 0; i--) {
        const id = allHrefIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isSecondaryActive = SECONDARY_NAV_LINKS.some(
    (link) => link.href.replace("#", "") === activeSection
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "shadow-[0_4px_20px_-4px_rgba(113,83,129,0.12)] py-1"
          : "shadow-[0_4px_20px_-4px_rgba(113,83,129,0.06)]"
      }`}
    >
      <div className="h-16 lg:h-18 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand & Isotype */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative h-9 w-9 transition-transform group-hover:scale-105">
            <Image
              src="/images/brand/expojuy26_isologotipo.png"
              alt="ExpoJuy 2026"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg text-on-surface leading-tight tracking-tight font-extrabold">
              EXPOJUY<span className="text-secondary">2026</span>
            </span>
            <span className="text-[9px] text-on-surface-variant uppercase tracking-widest font-semibold hidden sm:block">
              Jujuy • Argentina
            </span>
          </div>
        </Link>

        {/* Clean Desktop Navigation (Scrollspy active indicators) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-surface-container/60 p-1 rounded-full border border-surface-variant/40">
          {MAIN_NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium transition-all px-3.5 py-1.5 rounded-full relative ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/60"
                }`}
              >
                {link.label}
              </a>
            );
          })}

          {/* "Más" Dropdown Button (Highlights if any secondary section is active) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              onMouseEnter={() => setMoreDropdownOpen(true)}
              className={`text-[13px] font-medium transition-all px-3 py-1.5 rounded-full flex items-center gap-1 ${
                isSecondaryActive
                  ? "bg-primary-container/20 text-on-primary-container border border-primary-container/50 font-semibold shadow-sm"
                  : moreDropdownOpen
                  ? "bg-surface-container-highest text-on-surface"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/60"
              }`}
            >
              <span>Más</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  moreDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu Popup */}
            {moreDropdownOpen && (
              <div
                onMouseLeave={() => setMoreDropdownOpen(false)}
                className="absolute top-full right-0 lg:left-0 mt-2 w-64 bg-surface-container-lowest border border-surface-variant/40 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-on-surface-variant/70 uppercase tracking-wider">
                  Secciones Adicionales
                </div>
                <div className="flex flex-col gap-0.5">
                  {SECONDARY_NAV_LINKS.map((item) => {
                    const IconComponent = item.icon;
                    const isSubActive =
                      activeSection === item.href.replace("#", "");
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors group ${
                          isSubActive
                            ? "bg-primary-container/15 text-primary border-l-2 border-primary"
                            : "hover:bg-surface-container-high/70"
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-lg shrink-0 mt-0.5 transition-colors ${
                            isSubActive
                              ? "bg-primary text-on-primary"
                              : "bg-surface-container text-secondary group-hover:bg-secondary group-hover:text-on-secondary"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-on-surface leading-tight">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-on-surface-variant/80 line-clamp-1 mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Actions & Icons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Action Icons */}
          <div className="hidden xl:flex items-center gap-1 text-on-surface-variant">
            <button
              aria-label="Compartir"
              title="Compartir"
              className="p-2 rounded-full hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              aria-label="Sitio Web"
              title="Sitio Web"
              className="p-2 rounded-full hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              aria-label="Transmisión"
              title="Transmisión en vivo"
              className="p-2 rounded-full hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              <Radio className="w-4 h-4" />
            </button>
          </div>

          <div className="h-5 w-px bg-surface-variant/60 hidden xl:block mx-1" />

          {/* Secondary Action */}
          <a
            href="#contacto"
            className={`hidden md:inline-flex items-center justify-center rounded-full px-3.5 py-1.5 text-xs transition-all font-semibold whitespace-nowrap ${
              activeSection === "contacto"
                ? "bg-secondary text-on-secondary shadow-md"
                : "text-secondary border border-secondary/80 hover:bg-secondary/10"
            }`}
          >
            Quiero ser Expositor
          </a>

          {/* Primary Action */}
          <a
            href="#entradas"
            className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-xs text-on-primary bg-gradient-to-r from-primary-container via-primary to-secondary hover:opacity-95 transition-all shadow-[0_4px_14px_-2px_rgba(46,196,182,0.4)] font-semibold whitespace-nowrap ${
              activeSection === "entradas" ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Comprar Entradas</span>
          </a>

          {/* Mobile menu hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            className="lg:hidden p-2 rounded-full text-on-surface hover:bg-surface-container-high transition-colors ml-1"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest/98 border-t border-surface-variant/40 shadow-2xl px-4 py-4 backdrop-blur-2xl max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] font-semibold text-on-surface-variant/70 uppercase tracking-wider px-3 mb-1">
            Navegación Principal
          </div>
          <nav className="flex flex-col gap-0.5 mb-4">
            {MAIN_NAV_LINKS.map((link) => {
              const IconComponent = link.icon;
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 text-sm font-medium transition-colors px-3 py-2.5 rounded-xl ${
                    isActive
                      ? "bg-primary-container text-on-primary-container font-semibold"
                      : "text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  <IconComponent className="w-4 h-4 opacity-70" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="text-[11px] font-semibold text-on-surface-variant/70 uppercase tracking-wider px-3 mb-1 pt-3 border-t border-surface-variant/30">
            Más Información
          </div>
          <div className="flex flex-col gap-0.5 mb-4">
            {SECONDARY_NAV_LINKS.map((link) => {
              const IconComponent = link.icon;
              const isSubActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 text-sm font-medium transition-colors px-3 py-2.5 rounded-xl ${
                    isSubActive
                      ? "bg-primary-container/20 text-primary font-semibold"
                      : "text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  <IconComponent className="w-4 h-4 text-secondary shrink-0" />
                  <div className="flex flex-col">
                    <span className="leading-tight">{link.label}</span>
                    <span className="text-[11px] text-on-surface-variant/75 font-normal">
                      {link.desc}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-surface-variant/40 flex flex-col gap-2">
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-full px-4 py-2.5 text-sm text-secondary border border-secondary font-semibold"
            >
              Quiero ser Expositor
            </a>
            <div className="flex items-center justify-center gap-6 pt-2 text-on-surface-variant">
              <button
                aria-label="Compartir"
                className="flex items-center gap-1.5 text-xs p-2 rounded-full hover:bg-surface-container-high"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir</span>
              </button>
              <button
                aria-label="Sitio Web"
                className="flex items-center gap-1.5 text-xs p-2 rounded-full hover:bg-surface-container-high"
              >
                <Globe className="w-4 h-4" />
                <span>Web</span>
              </button>
              <button
                aria-label="Transmisión"
                className="flex items-center gap-1.5 text-xs p-2 rounded-full hover:bg-surface-container-high"
              >
                <Radio className="w-4 h-4" />
                <span>Vivo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
