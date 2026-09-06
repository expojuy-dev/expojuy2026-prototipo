import Image from "next/image";
import { Mail, MapPin, Globe, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Columna 1: Logos oficiales */}
          <div className="space-y-5">
            <div className="relative h-10 w-48">
              <Image
                src="/images/brand/expojuy26_horizontal.png"
                alt="ExpoJuy 2026"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              La muestra multisectorial más trascendente del Norte Argentino. Un puente estratégico de integración productiva y desarrollo regional.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Plataforma Oficial del Concurso Digital 2026</span>
            </div>
          </div>

          {/* Columna 2: Organización Institucional */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Organiza
            </h4>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="relative h-12 w-28">
                <Image
                  src="/images/brand/logo_camcomext.png"
                  alt="Cámara de Comercio Exterior de Jujuy"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Cámara de Comercio Exterior de Jujuy
              </p>
              <p className="text-[11px] text-slate-500 leading-snug">
                Más de 30 años impulsando las exportaciones y la vinculación económica del NOA con el mundo.
              </p>
            </div>
          </div>

          {/* Columna 3: Enlaces de Navegación Rápida */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#sobre-expo" className="hover:text-cyan-400 transition-colors">
                  Ejes Productivos & Minería
                </a>
              </li>
              <li>
                <a href="#expositores" className="hover:text-cyan-400 transition-colors">
                  Directorio Oficial de Stands
                </a>
              </li>
              <li>
                <a href="#agenda" className="hover:text-cyan-400 transition-colors">
                  Agenda de Conferencias & B2B
                </a>
              </li>
              <li>
                <a href="#predio" className="hover:text-cyan-400 transition-colors">
                  Plano Interactivo Ciudad Cultural
                </a>
              </li>
              <li>
                <a href="#asistente-ia" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Asistente Virtual con IA (JuyBot)
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-cyan-400 transition-colors">
                  Acreditaciones y Prensa
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Ubicación y Contacto */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Sede & Contacto
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Predio Ferial Ciudad Cultural, San Salvador de Jujuy, Argentina</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>info@expojuy.com.ar</span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>www.camcomexjujuy.com.ar</span>
              </p>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">Redes Oficiales</p>
              <div className="flex gap-2">
                {["LinkedIn", "Instagram", "YouTube", "X"].map((net) => (
                  <span
                    key={net}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {net}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 ExpoJuy & Cámara de Comercio Exterior de Jujuy. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">
              Accesibilidad Web (WCAG 2.1)
            </span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">
              Términos & Privacidad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
