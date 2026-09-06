"use client";

import Link from "next/link";
import { BadgeCheck, MapPin, Mail, Phone, Building2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-inverse-surface text-inverse-on-surface pt-space-3xl pb-space-xl">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-2xl border-b border-surface-variant/20">
          {/* Column 1: Brand & Org */}
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-inverse-on-surface tracking-tight font-extrabold">
                  EXPOJUY<span className="text-primary-fixed font-headline-sm text-headline-sm">2026</span>
                </span>
                <span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider font-semibold">
                  Edición Internacional
                </span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-surface-dim leading-relaxed">
              La mayor muestra multisectorial del Norte Argentino y el Corredor Bioceánico. Conectando industrias, minería, tecnología y comercio global.
            </p>
            <div className="flex items-center gap-space-xs text-primary-fixed">
              <BadgeCheck className="w-4 h-4 shrink-0" />
              <span className="font-label-sm text-label-sm font-semibold">
                Organiza: Cámara de Comercio Exterior de Jujuy
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-space-sm">
            <h3 className="font-headline-sm text-headline-sm text-inverse-on-surface font-bold">
              Navegación Rápida
            </h3>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-surface-dim">
              <li className="hover:text-primary-fixed transition-colors">
                <a href="#inicio">Inicio</a>
              </li>
              <li className="hover:text-primary-fixed transition-colors">
                <a href="#sobre-expojuy">Sobre ExpoJuy</a>
              </li>
              <li className="hover:text-primary-fixed transition-colors">
                <a href="#expositores">Directorio de Expositores</a>
              </li>
              <li className="hover:text-primary-fixed transition-colors">
                <a href="#agenda">Cronograma de Conferencias</a>
              </li>
              <li className="hover:text-primary-fixed transition-colors">
                <a href="#mapa">Plano y Distribución de Pabellones</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Participation */}
          <div className="flex flex-col gap-space-sm">
            <h3 className="font-headline-sm text-headline-sm text-inverse-on-surface font-bold">
              Participación & Delegaciones
            </h3>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-surface-dim">
              <li className="hover:text-primary-fixed transition-colors">
                <a href="#contacto">Contratación de Stands</a>
              </li>
              <li className="hover:text-primary-fixed transition-colors">
                <a href="#contacto">Rondas Internacionales de Negocios</a>
              </li>
              <li className="hover:text-primary-fixed transition-colors">
                <a href="#entradas">Pases Profesionales y Público General</a>
              </li>
              <li className="hover:text-primary-fixed transition-colors">
                <a href="#sponsors">Paquetes de Patrocinio</a>
              </li>
              <li className="hover:text-primary-fixed transition-colors">
                <a href="#entradas">Acreditación de Prensa</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Sede & Contacto */}
          <div className="flex flex-col gap-space-sm">
            <h3 className="font-headline-sm text-headline-sm text-inverse-on-surface font-bold">
              Sede & Contacto Institucional
            </h3>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-surface-dim">
              <p className="flex items-start gap-space-2xs">
                <MapPin className="w-4 h-4 text-primary-fixed shrink-0 mt-0.5" />
                <span>Predio Ferial Ciudad Cultural, San Salvador de Jujuy, Argentina</span>
              </p>
              <p className="flex items-center gap-space-2xs">
                <Mail className="w-4 h-4 text-primary-fixed shrink-0" />
                <span>institucional@expojuy.com.ar</span>
              </p>
              <p className="flex items-center gap-space-2xs">
                <Phone className="w-4 h-4 text-primary-fixed shrink-0" />
                <span>+54 (388) 423-3333</span>
              </p>
            </div>
            <div className="pt-space-2xs flex items-center gap-space-xs">
              <Building2 className="w-4 h-4 text-primary-fixed shrink-0" />
              <span className="font-label-sm text-label-sm text-surface-dim font-medium">
                Personería Jurídica CCEJ N° 1248/88
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-surface-dim">
          <p>© 2026 Cámara de Comercio Exterior de Jujuy. Todos los derechos reservados.</p>
          <div className="flex items-center gap-space-md">
            <Link href="#" className="hover:text-primary-fixed transition-colors">
              Términos & Condiciones
            </Link>
            <span className="text-outline-variant">•</span>
            <Link href="#" className="hover:text-primary-fixed transition-colors">
              Política de Privacidad
            </Link>
            <span className="text-outline-variant">•</span>
            <Link href="#" className="hover:text-primary-fixed transition-colors">
              Protocolo del Predio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
