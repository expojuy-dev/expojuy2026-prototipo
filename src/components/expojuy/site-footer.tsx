import { MapPin, Phone, Mail, ArrowUp, Send, Loader2, BellRing } from "lucide-react";
import { ExpoJuyLogo, CamaraLogo } from "./logo";
import { SOCIALS, EVENT } from "@/lib/data";
import { Instagram, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { NewsletterBand } from "./newsletter-band";
import { AdminPanel } from "./admin-panel";
import { InstallAppButton } from "./install-app";

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
};

const QUICK_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Expositores", href: "#expositores" },
  { label: "Agenda", href: "#agenda" },
  { label: "Mapa del Predio", href: "#mapa" },
  { label: "Noticias", href: "#noticias" },
  { label: "Entradas", href: "#entradas" },
];

const INSTITUTIONAL_LINKS = [
  { label: "Bases y Condiciones", href: "#faq" },
  { label: "Política de Privacidad", href: "#contacto" },
  { label: "Accesibilidad", href: "#faq" },
  { label: "Sala de Prensa", href: "#noticias" },
  { label: "Trabajá con nosotros", href: "#contacto" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-auto bg-deep dark:bg-[#080811] text-white" aria-label="Pie de página">
      {/* Línea arcoíris */}
      <div className="rainbow-line h-1.5 w-full dark:opacity-40" aria-hidden="true" />
      <div className="dots-pattern-light absolute inset-0 opacity-20" aria-hidden="true" />

      {/* Newsletter */}
      <NewsletterBand />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: marca */}
          <div className="flex flex-col gap-5">
            <ExpoJuyLogo variant="dark" />
            <p className="text-sm leading-relaxed text-white/65">
              La feria de producción, tecnología, innovación y comercio exterior más importante
              del Norte Argentino. Un punto de encuentro entre países, empresas y personas.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-turquoise">
                Organiza
              </p>
              <CamaraLogo light />
            </div>
          </div>

          {/* Columna 2: links rápidos */}
          <nav aria-label="Links rápidos">
            <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-turquoise">
              Links rápidos
            </h3>
            <ul className="mt-5 flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-turquoise dark:hover:text-cyan-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-lavender transition group-hover:w-3 group-hover:bg-turquoise" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Columna 3: institucional */}
          <nav aria-label="Links institucionales">
            <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-turquoise">
              Institucional
            </h3>
            <ul className="mt-5 flex flex-col gap-2.5">
              {INSTITUTIONAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-turquoise dark:hover:text-cyan-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-lavender transition group-hover:w-3 group-hover:bg-turquoise" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <AdminPanel />
              </li>
              <li>
                <InstallAppButton />
              </li>
            </ul>
          </nav>

          {/* Columna 4: contacto */}
          <div>
            <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-turquoise">
              Contacto
            </h3>
            <ul className="mt-5 flex flex-col gap-3.5 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lavender" aria-hidden="true" />
                {EVENT.address}
              </li>
              <li>
                <a href={`mailto:${EVENT.email}`} className="flex items-center gap-2.5 transition hover:text-turquoise">
                  <Mail className="h-4 w-4 shrink-0 text-lavender" aria-hidden="true" />
                  {EVENT.email}
                </a>
              </li>
              <li>
                <a href="tel:+543884221000" className="flex items-center gap-2.5 transition hover:text-turquoise">
                  <Phone className="h-4 w-4 shrink-0 text-lavender" aria-hidden="true" />
                  {EVENT.phone}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:-translate-y-0.5 hover:border-turquoise hover:bg-turquoise hover:text-deep dark:hover:border-cyan-400 dark:hover:bg-cyan-400"
                  >
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Waves decorativas (Modelo 2) */}
      <div className="relative w-full h-16 sm:h-24 pointer-events-none" aria-hidden="true">
        <svg className="absolute bottom-0 w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,58.7C840,64,960,96,1080,96C1200,96,1320,64,1380,48L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" fill="#7c3aed" fillOpacity="0.15" />
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#06b6d4" fillOpacity="0.25" />
          <path d="M0,96L60,90.7C120,85,240,75,360,80C480,85,600,107,720,106.7C840,107,960,85,1080,80C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" fill="#04050a" fillOpacity="0.9" />
        </svg>
      </div>

      {/* Línea inferior */}
      <div className="relative border-t border-white/10 dark:border-white/5 dark:bg-[#04050a]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-xs text-white/50 sm:flex-row sm:px-6 sm:text-left">
          <p>
            © 2026 ExpoJuy — Cámara de Comercio Exterior de Jujuy. Todos los derechos reservados.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Hecho con ❤️ en San Salvador de Jujuy
            <a
              href="#inicio"
              aria-label="Volver arriba"
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-turquoise hover:text-turquoise dark:hover:border-cyan-400 dark:hover:text-cyan-400"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
