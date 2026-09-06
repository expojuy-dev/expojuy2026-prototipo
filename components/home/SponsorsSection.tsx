"use client";

import Image from "next/image";
import { Award, ArrowRight } from "lucide-react";

export function SponsorsSection() {
  const platinumSponsors = [
    { name: "Minera EXAR", file: "/images/sponsors/exar.svg", alt: "Minera EXAR Cauchari Olaroz" },
    { name: "Banco Macro", file: "/images/sponsors/banco-macro.svg", alt: "Banco Macro" },
    { name: "Cauchari Solar", file: "/images/sponsors/cauchari-solar.svg", alt: "Cauchari Solar Park" },
  ];

  const goldSponsors = [
    { name: "Ledesma", file: "/images/sponsors/ledesma.svg", alt: "Ledesma Jujuy" },
    { name: "Sales de Jujuy", file: "/images/sponsors/sales-de-jujuy.svg", alt: "Sales de Jujuy" },
    { name: "Telecom 5G", file: "/images/sponsors/telecom-5g.svg", alt: "Telecom 5G" },
    { name: "Toyota NOA", file: "/images/sponsors/toyota-noa.svg", alt: "Toyota NOA" },
  ];

  const institutionalSupport = [
    "Gobierno de la Provincia de Jujuy",
    "Cámara de Comercio Exterior de Jujuy",
    "ZICOSUR (Secretaría Pro Témpore)",
    "Universidad Nacional de Jujuy (UNJu)",
    "Unión Industrial de Jujuy (UIJ)",
  ];

  return (
    <section id="sponsors" className="py-24 bg-white border-t border-slate-200 text-center">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-1.5 bg-[#8b3d9e]/10 px-3.5 py-1 rounded-full mb-3 border border-[#8b3d9e]/20">
          <Award className="w-3.5 h-3.5 text-[#8b3d9e]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#8b3d9e]">
            Alianzas de Prestigio
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Sponsors Oficiales
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-2 font-light">
          Empresas y entidades que potencian la competitividad regional y hacen posible este encuentro bioceánico.
        </p>

        {/* Tier 1: Platinum Sponsors */}
        <div className="mt-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8b3d9e] mb-6 block">
            Patrocinadores Platino
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {platinumSponsors.map((sp) => (
              <div
                key={sp.name}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-center h-28 hover:shadow-md hover:border-slate-300 transition-all"
              >
                <div className="relative w-full h-16">
                  <Image
                    src={sp.file}
                    alt={sp.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: Gold Sponsors */}
        <div className="mt-12">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 block">
            Patrocinadores Oro
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {goldSponsors.map((sp) => (
              <div
                key={sp.name}
                className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center justify-center h-20 hover:shadow-md transition-all"
              >
                <div className="relative w-full h-10">
                  <Image
                    src={sp.file}
                    alt={sp.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 3: Institutional Support */}
        <div className="mt-12">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block">
            Apoyo Institucional
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {institutionalSupport.map((inst) => (
              <span
                key={inst}
                className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
              >
                {inst}
              </span>
            ))}
          </div>
        </div>

        {/* Lead Capture Card for Sponsors */}
        <div className="mt-16 max-w-3xl mx-auto bg-gradient-to-r from-[#006a62] to-[#8b3d9e] p-8 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h3 className="text-xl font-bold">¿Querés que tu marca lidere en el Norte Argentino?</h3>
            <p className="text-xs sm:text-sm text-white/90 mt-1 font-light">
              Sumate como Sponsor Oficial de ExpoJuy 2026 y accedé a espacios exclusivos de alta visibilidad.
            </p>
          </div>
          <a
            href="#contacto"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-all shadow-md"
          >
            <span>Solicitar Dossier</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
