import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";
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
    <footer className="relative mt-auto leading-none" aria-label="Pie de página">
      {/* Waves decorativas montadas exactamente sobre el límite superior del footer */}
      <div className="absolute bottom-full left-0 right-0 w-full h-16 sm:h-24 pointer-events-none overflow-hidden bg-transparent" aria-hidden="true">
        <svg
          className="absolute bottom-0 w-full h-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,58.7C840,64,960,96,1080,96C1200,96,1320,64,1380,48L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            className="fill-violet-600/[0.06] dark:fill-violet-600/[0.20]"
          />
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L1380,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            className="fill-cyan-500/[0.08] dark:fill-cyan-500/[0.30]"
          />
          <path
            d="M0,96L60,90.7C120,85,240,75,360,80C480,85,600,107,720,106.7C840,107,960,85,1080,80C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            className="fill-[#ffffff] dark:fill-[#080811]"
          />
        </svg>
      </div>

      {/* Cuerpo principal del footer */}
      <div className="relative bg-white dark:bg-[#080811] py-12 lg:py-16 leading-relaxed">
        <div className="dots-pattern-light absolute inset-0 opacity-20 dark:opacity-10" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1520px] px-6 sm:px-10 xl:px-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Columna 1: marca */}
            <div className="flex flex-col gap-4">
              <ExpoJuyLogo />
              <p className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
                La feria multisectorial de producción, tecnología e innovación más destacada del Norte Argentino. Promoviendo el desarrollo regional e internacional.
              </p>
              <div className="flex items-center space-x-3 pt-2">
                {SOCIALS.map((s) => {
                  const Icon = SOCIAL_ICONS[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/70 transition-all hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-400 shadow-sm"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Columna 2: links rápidos */}
            <nav aria-label="Links rápidos">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-cyan-400 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Navegación
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-white/70">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 transition hover:text-cyan-600 dark:hover:text-cyan-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-white/30 transition group-hover:w-2 group-hover:bg-cyan-500" aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Columna 3: institucional */}
            <nav aria-label="Links institucionales">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-cyan-400 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-600"></span> Participación
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-white/70">
                {INSTITUTIONAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 transition hover:text-cyan-600 dark:hover:text-cyan-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-white/30 transition group-hover:w-2 group-hover:bg-cyan-500" aria-hidden="true" />
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
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-cyan-400 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Contacto y Sede
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-white/70">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" aria-hidden="true" />
                  <span>{EVENT.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  <a href={`mailto:${EVENT.email}`} className="transition hover:text-cyan-600 dark:hover:text-cyan-400">
                    {EVENT.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  <a href={`tel:${EVENT.phone.replace(/\\s/g, '')}`} className="transition hover:text-cyan-600 dark:hover:text-cyan-400">
                    {EVENT.phone}
                  </a>
                </div>
              </div>

              {/* Newsletter Band */}
              <NewsletterBand />
            </div>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="relative border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#04050a] py-5 px-4">
        <div className="mx-auto flex max-w-[1520px] flex-col items-center justify-between gap-3 px-2 sm:px-6 xl:px-10 text-xs text-slate-500 dark:text-white/60 sm:flex-row text-center sm:text-left">
          <p>
            © 2026 ExpoJuy. Todos los derechos reservados. San Salvador de Jujuy, Argentina.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#sobre" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Sobre ExpoJuy</a>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <a href="#terminos" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Términos y Condiciones</a>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <a href="#prensa" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Acreditaciones de Prensa</a>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <a href="#contacto" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Contacto</a>
            <span className="text-slate-300 dark:text-white/20 ml-2">•</span>
            <a
              href="#inicio"
              aria-label="Volver arriba"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-white/15 text-slate-500 dark:text-white/70 transition hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 bg-white dark:bg-transparent shadow-sm"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
