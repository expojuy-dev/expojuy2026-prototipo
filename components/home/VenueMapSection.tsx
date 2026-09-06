"use client";

import { useState } from "react";
import { Navigation, Layers, Compass, MapPin } from "lucide-react";

interface SectorInfo {
  id: string;
  name: string;
  code: string;
  badgeBg: string;
  standsCount: number;
  description: string;
  categories: string;
}

const SECTORS: SectorInfo[] = [
  {
    id: "pab-a",
    name: "Pabellón A - Tech e Innovación",
    code: "PAB-A",
    badgeBg: "bg-[#006a62] text-white",
    standsCount: 48,
    description:
      "Sector dedicado a empresas de tecnología, inteligencia artificial, startups de software, energías renovables y economía del conocimiento.",
    categories: "Tech, IA, Startups, Telecom, Energías Verdes",
  },
  {
    id: "pab-b",
    name: "Pabellón B - Minería & Litio",
    code: "PAB-B",
    badgeBg: "bg-[#8b3d9e] text-white",
    standsCount: 64,
    description:
      "Grandes corporaciones mineras del Triángulo del Litio, proveedores de equipamiento de alta complejidad y servicios de extracción sustentable.",
    categories: "Litio, Minería Sustentable, Maquinaria, Logística",
  },
  {
    id: "pab-c",
    name: "Pabellón C - Agroindustria & Comercio",
    code: "PAB-C",
    badgeBg: "bg-[#231b28] text-white",
    standsCount: 42,
    description:
      "Cadena de valor agroindustrial, tabacaleras, caña de azúcar, cítricos de exportación y proveedores de biotecnología agrícola.",
    categories: "Agro, Bioeconomía, Comercio Exterior, Alimentos",
  },
  {
    id: "pab-d",
    name: "Pabellón D - Desarrollo Regional",
    code: "PAB-D",
    badgeBg: "bg-[#a74bc0] text-white",
    standsCount: 56,
    description:
      "Stand institucionales de los gobiernos del ZICOSUR, municipios de Jujuy, artesanías de alta gama y PyMEs locales de exportación.",
    categories: "Gobiernos, ZICOSUR, Cultura, PyMEs Jujeñas",
  },
];

export function VenueMapSection() {
  const [activeSector, setActiveSector] = useState<SectorInfo>(SECTORS[0]);

  return (
    <section id="mapa" className="py-20 bg-[#fcf9f8] text-slate-900">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100 text-[#8b3d9e] text-xs font-bold uppercase tracking-wider">
            Mapa del Predio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Distribución del Predio Ferial
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
            Explora la distribución de pabellones, áreas exteriores y zonas de servicios en el Predio Ferial Ciudad Cultural.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Mapa Visual Esquemático (Left Side Card - Matching Stitch Mockup) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <Layers className="w-4 h-4 text-[#006a62]" />
                <span>Superficie Total: 15.000 m²</span>
              </div>
              <span className="text-[11px] font-bold text-[#8b3d9e] bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                Haz clic para explorar pabellón
              </span>
            </div>

            {/* Dibujo Esquemático de Pabellones */}
            <div className="space-y-4">
              {/* Fila 1: Pabellones A, B y C */}
              <div className="grid grid-cols-3 gap-3">
                {SECTORS.slice(0, 3).map((sector) => (
                  <button
                    key={sector.id}
                    onClick={() => setActiveSector(sector)}
                    className={`p-4 rounded-2xl text-white font-bold transition-all text-center flex flex-col items-center justify-center min-h-[110px] ${sector.badgeBg} ${
                      activeSector.id === sector.id
                        ? "ring-4 ring-[#2ec4b6]/50 scale-[1.03] shadow-lg"
                        : "opacity-90 hover:opacity-100"
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wider opacity-80">{sector.code}</span>
                    <span className="text-sm sm:text-base font-extrabold mt-1">{sector.name.split("-")[0]}</span>
                    <span className="text-[10px] font-normal opacity-90 mt-1">{sector.standsCount} Stands</span>
                  </button>
                ))}
              </div>

              {/* Fila 2: Pabellón D */}
              <button
                onClick={() => setActiveSector(SECTORS[3])}
                className={`w-full p-4 rounded-2xl text-white font-bold transition-all text-center flex flex-col items-center justify-center min-h-[90px] ${SECTORS[3].badgeBg} ${
                  activeSector.id === SECTORS[3].id
                    ? "ring-4 ring-[#2ec4b6]/50 scale-[1.01] shadow-lg"
                    : "opacity-90 hover:opacity-100"
                }`}
              >
                <span className="text-xs uppercase tracking-wider opacity-80">{SECTORS[3].code}</span>
                <span className="text-sm sm:text-base font-extrabold mt-0.5">{SECTORS[3].name}</span>
                <span className="text-[10px] font-normal opacity-90">{SECTORS[3].standsCount} Stands</span>
              </button>

              {/* Fila 3: Zonas Exteriores y Gastronomía */}
              <div className="w-full p-3 rounded-2xl bg-slate-100 text-slate-700 text-center text-xs font-bold border border-slate-200/80 flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4 text-[#006a62]" />
                <span>EXTERIORES / PATIO GASTRANÓMICO / ESCENARIO DE SHOWS</span>
              </div>
            </div>

            {/* Referencias del Mapa */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#006a62]" /> Pabellón A</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#8b3d9e]" /> Pabellón B</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#231b28]" /> Pabellón C</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#a74bc0]" /> Pabellón D</span>
            </div>
          </div>

          {/* Ficha Detallada del Pabellón (Right Side Card - Matching Stitch Mockup) */}
          <div className="lg:col-span-5 bg-[#f0faf8] rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006a62]/10 text-[#006a62] text-xs font-bold uppercase tracking-wider mb-3">
                <MapPin className="w-3.5 h-3.5" />
                Pabellón Seleccionado
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {activeSector.name}
              </h3>

              <p className="mt-4 text-slate-700 text-sm leading-relaxed">
                {activeSector.description}
              </p>

              <div className="mt-6 space-y-3 bg-white p-4 rounded-2xl border border-teal-100 text-xs">
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-medium text-slate-500">Capacidad Total de Stands:</span>
                  <span className="font-bold text-slate-900">{activeSector.standsCount} Espacios</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-medium text-slate-500">Sectores Principales:</span>
                  <span className="font-bold text-[#006a62]">{activeSector.categories}</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#8b3d9e] to-[#6b267d] hover:opacity-95 transition-all shadow-md shadow-purple-900/20">
                <Compass className="w-4 h-4" />
                Ver Plano Interactivo 3D
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
