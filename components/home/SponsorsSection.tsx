"use client";

import Image from "next/image";
import { Award, ArrowRight, ShieldCheck, Building2 } from "lucide-react";

export function SponsorsSection() {
  const organizers = [
    {
      name: "Cámara de Comercio Exterior de Jujuy",
      role: "Organizador Principal",
      desc: "Liderazgo e integración comercial",
      logo: "/images/brand/logo_camcomext.png",
    },
    {
      name: "Gobierno de la Provincia de Jujuy",
      role: "Auspicio Institucional",
      desc: "Ministerio de Desarrollo Económico y Producción",
      logo: null,
    },
    {
      name: "Dirección de Servicios Basados en el Conocimiento",
      role: "Co-Organizador Tech",
      desc: "Ecosistema de innovación y talento",
      logo: null,
    },
    {
      name: "ClusteAR • Cámara TICs",
      role: "Aliado Tecnológico",
      desc: "Empresas de tecnología y software",
      logo: null,
    },
  ];

  const platinumSponsors = [
    { name: "Minera EXAR", file: "/images/sponsors/exar.svg", alt: "Minera EXAR Cauchari Olaroz" },
    { name: "Banco Macro", file: "/images/sponsors/banco-macro.svg", alt: "Banco Macro" },
    { name: "Cauchari Solar", file: "/images/sponsors/cauchari-solar.svg", alt: "Cauchari Solar Park" },
  ];

  const goldSponsors = [
    { name: "Telecom 5G", file: "/images/sponsors/telecom-5g.svg", alt: "Telecom 5G" },
    { name: "Ledesma", file: "/images/sponsors/ledesma.svg", alt: "Ledesma Jujuy" },
    { name: "Sales de Jujuy", file: "/images/sponsors/sales-de-jujuy.svg", alt: "Sales de Jujuy" },
    { name: "Toyota NOA", file: "/images/sponsors/toyota-noa.svg", alt: "Toyota NOA" },
  ];

  const institutionalSupport = [
    "Gobierno de la Provincia de Jujuy",
    "Cámara de Comercio Exterior de Jujuy",
    "Ministerio de Desarrollo Económico y Producción",
    "ZICOSUR (Secretaría Pro Témpore)",
    "CAME (Confederación Argentina de la Mediana Empresa)",
    "CAC (Cámara Argentina de Comercio)",
    "CAEM (Cámara Argentina de Empresarios Mineros)",
    "Universidad Nacional de Jujuy (UNJu)",
    "Unión Industrial de Jujuy (UIJ)",
  ];

  return (
    <section className="py-space-4xl bg-surface-container-low" id="sponsors">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop text-center">
        {/* Badge & Title */}
        <div className="inline-flex items-center gap-space-xs bg-secondary/10 px-space-sm py-space-2xs rounded-full mb-space-xs">
          <Award className="w-4 h-4 text-secondary shrink-0" />
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Organización & Sponsors Oficiales
          </span>
        </div>
        <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
          Liderazgo Institucional y Marcas Aliadas
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mt-space-2xs">
          El respaldo del sector público y privado impulsando la muestra multisectorial más relevante del Norte Argentino.
        </p>

        {/* SECTION 1: Organizadores & Auspiciantes Principales */}
        <div className="mt-space-2xl bg-surface-container-lowest p-space-xl rounded-3xl shadow-sm border border-slate-100 text-left">
          <div className="flex items-center gap-2 mb-space-md pb-space-xs border-b border-slate-100">
            <Building2 className="w-5 h-5 text-primary shrink-0" />
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Organizan & Auspician Oficialmente
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {organizers.map((org, idx) => (
              <div
                key={idx}
                className="p-space-md rounded-2xl bg-surface-container-low/70 border border-slate-200/80 flex flex-col justify-between hover:bg-surface-container transition-all"
              >
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                    {org.role}
                  </div>
                  <h4 className="font-headline-sm text-sm text-on-surface font-bold leading-snug">
                    {org.name}
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {org.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/50 flex items-center gap-1.5 text-[11px] text-secondary font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Respaldo Oficial</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Patrocinadores Platino */}
        <div className="mt-space-2xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold mb-space-md block">
            Patrocinadores Platino
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg max-w-4xl mx-auto">
            {platinumSponsors.map((sponsor, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-md flex items-center justify-center h-28 hover:shadow-xl transition-all border border-slate-100"
              >
                <div className="relative w-full h-14">
                  <Image
                    src={sponsor.file}
                    alt={sponsor.alt}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Patrocinadores Oro */}
        <div className="mt-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline font-bold mb-space-md block">
            Patrocinadores Oro
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md max-w-4xl mx-auto">
            {goldSponsors.map((sponsor, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-center h-20 hover:shadow-md transition-all border border-slate-100"
              >
                <div className="relative w-full h-10">
                  <Image
                    src={sponsor.file}
                    alt={sponsor.alt}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: Red Institucional & Adheridas */}
        <div className="mt-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline font-bold mb-space-md block">
            Red Institucional y Cámaras Adheridas
          </span>
          <div className="flex flex-wrap items-center justify-center gap-space-sm max-w-5xl mx-auto">
            {institutionalSupport.map((item, idx) => (
              <span
                key={idx}
                className="px-space-md py-space-xs rounded-full bg-surface-container font-label-md text-label-md text-on-surface-variant font-medium text-xs sm:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Lead Capture Card for Sponsors */}
        <div className="mt-space-3xl max-w-3xl mx-auto bg-gradient-to-r from-primary to-secondary p-space-xl rounded-3xl text-on-primary shadow-xl flex flex-col sm:flex-row items-center justify-between gap-space-lg text-left">
          <div>
            <h3 className="font-headline-md text-headline-md font-bold">
              ¿Querés que tu marca lidere en el Norte Argentino?
            </h3>
            <p className="font-body-sm text-body-sm text-surface-variant/90 mt-1">
              Sumate como Sponsor Oficial de ExpoJuy 2026 y accedé a espacios exclusivos de alta visibilidad.
            </p>
          </div>
          <a
            href="#contacto"
            className="shrink-0 inline-flex items-center gap-space-xs px-space-xl py-space-sm rounded-full bg-surface-container-lowest text-on-surface font-label-lg text-label-lg hover:bg-surface-container transition-all shadow-md font-semibold"
          >
            <span>Solicitar Dossier Comercial</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
