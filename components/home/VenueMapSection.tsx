"use client";

import { useState } from "react";
import { Navigation, Layers, Eye } from "lucide-react";

interface SectorInfo {
  id: string;
  name: string;
  code: string;
  color: string;
  standsCount: number;
  description: string;
  highlight: string;
}

const SECTORS: SectorInfo[] = [
  {
    id: "pab-a",
    name: "Pabellón A - Internacional & Minería",
    code: "PAB-A",
    color: "bg-cyan-500/20 border-cyan-500 text-cyan-400",
    standsCount: 48,
    description: "Grandes empresas mineras de litio, delegaciones consulares del Corredor Bioceánico y corporaciones energéticas.",
    highlight: "Lithium Andes, Cauchari Solar, Cámaras Binacionales",
  },
  {
    id: "pab-b",
    name: "Pabellón B - Innovación, Tech & PyMEs",
    code: "PAB-B",
    color: "bg-purple-500/20 border-purple-500 text-purple-400",
    standsCount: 64,
    description: "Startups de software, soluciones con Inteligencia Artificial, laboratorios biotecnológicos y servicios al sector productivo.",
    highlight: "Polo Tecnológico Jujuy, NeuralJuy AI, AgTech Labs",
  },
  {
    id: "pab-c",
    name: "Pabellón C - Agroindustria & Alimentos",
    code: "PAB-C",
    color: "bg-emerald-500/20 border-emerald-500 text-emerald-400",
    standsCount: 42,
    description: "Productores de tabaco, caña de azúcar, cítricos, legumbres de exportación y proveedores de maquinaria de precisión.",
    highlight: "Cámara del Tabaco, Ingenios de Jujuy, EcoMaq Vial",
  },
  {
    id: "ext-1",
    name: "Explanada Exterior & Maquinaria Pesada",
    code: "EXT",
    color: "bg-amber-500/20 border-amber-500 text-amber-400",
    standsCount: 26,
    description: "Exhibición a cielo abierto de camiones mineros, maquinarias agrícolas, equipos viales e infraestructura solar a gran escala.",
    highlight: "Flotas pesadas, Maquinaria Vial, Demostraciones en vivo",
  },
  {
    id: "aud",
    name: "Auditorio Central & Sala B2B",
    code: "AUD",
    color: "bg-rose-500/20 border-rose-500 text-rose-400",
    standsCount: 3,
    description: "Espacio para conferencias magistrales, firmas de acuerdos de inversión y mesas de rondas bilaterales de negocios.",
    highlight: "Capacidad para 850 asistentes sentados, traducción simultánea",
  },
];

export function VenueMapSection() {
  const [activeSector, setActiveSector] = useState<SectorInfo>(SECTORS[0]);

  return (
    <section id="predio" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-3">
            Plano Interactivo
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mapa del Predio Ferial Ciudad Cultural
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Explorá la distribución estratégica de pabellones, salas de conferencias y accesos de la muestra.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Mapa Visual Interactivo (Esquemático SVG responsivo y moderno) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Superficie Total: 15.000 m²</span>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-medium">
                Haz clic en una zona para inspeccionar
              </span>
            </div>

            {/* Representación interactiva SVG estilizada del Predio */}
            <div className="relative aspect-[16/10] w-full bg-slate-950/80 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between">
              {/* Acceso Principal */}
              <div className="flex justify-between items-center px-4 py-2 bg-slate-900 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-200">Acceso Principal & Acreditaciones QR</span>
                </div>
                <span className="text-[10px] text-slate-500">Av. de los Estudiantes</span>
              </div>

              {/* Layout de Pabellones en cuadrícula interactiva */}
              <div className="grid grid-cols-2 gap-3 my-3 h-full">
                {/* Pabellón A */}
                <button
                  onClick={() => setActiveSector(SECTORS[0])}
                  className={`rounded-xl p-3.5 border text-left transition-all flex flex-col justify-between ${
                    activeSector.id === "pab-a"
                      ? "bg-cyan-950/70 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-cyan-400">PABELLÓN A</span>
                    <span className="text-[10px] text-slate-400">48 Stands</span>
                  </div>
                  <span className="text-sm font-semibold text-white">Internacional & Minería</span>
                  <span className="text-[10px] text-cyan-300/80">Sector Litio y Comercio Exterior</span>
                </button>

                {/* Pabellón B */}
                <button
                  onClick={() => setActiveSector(SECTORS[1])}
                  className={`rounded-xl p-3.5 border text-left transition-all flex flex-col justify-between ${
                    activeSector.id === "pab-b"
                      ? "bg-purple-950/70 border-purple-400 shadow-lg shadow-purple-500/20 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-purple-400">PABELLÓN B</span>
                    <span className="text-[10px] text-slate-400">64 Stands</span>
                  </div>
                  <span className="text-sm font-semibold text-white">Innovación & Tech</span>
                  <span className="text-[10px] text-purple-300/80">Economía del Conocimiento y PyMEs</span>
                </button>

                {/* Pabellón C */}
                <button
                  onClick={() => setActiveSector(SECTORS[2])}
                  className={`rounded-xl p-3.5 border text-left transition-all flex flex-col justify-between ${
                    activeSector.id === "pab-c"
                      ? "bg-emerald-950/70 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-400">PABELLÓN C</span>
                    <span className="text-[10px] text-slate-400">42 Stands</span>
                  </div>
                  <span className="text-sm font-semibold text-white">Agroindustria & Alimentos</span>
                  <span className="text-[10px] text-emerald-300/80">Cadenas de Valor Regionales</span>
                </button>

                {/* Auditorio & Explanada */}
                <div className="grid grid-rows-2 gap-2">
                  <button
                    onClick={() => setActiveSector(SECTORS[3])}
                    className={`rounded-lg p-2 border text-left transition-all flex items-center justify-between ${
                      activeSector.id === "ext-1"
                        ? "bg-amber-950/70 border-amber-400 scale-[1.01]"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <p className="text-[11px] font-bold text-amber-400">Explanada Maquinaria</p>
                      <p className="text-[9px] text-slate-400">Equipos de gran porte</p>
                    </div>
                    <span className="text-[10px] text-slate-400">26 Stands</span>
                  </button>

                  <button
                    onClick={() => setActiveSector(SECTORS[4])}
                    className={`rounded-lg p-2 border text-left transition-all flex items-center justify-between ${
                      activeSector.id === "aud"
                        ? "bg-rose-950/70 border-rose-400 scale-[1.01]"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <p className="text-[11px] font-bold text-rose-400">Auditorio & Rondas B2B</p>
                      <p className="text-[9px] text-slate-400">850 personas</p>
                    </div>
                    <span className="text-[10px] text-slate-400">Cap. Max</span>
                  </button>
                </div>
              </div>

              {/* Barra inferior de Servicios */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-3 py-1.5 bg-slate-900/90 rounded-lg border border-slate-800">
                <span>📍 Patio Gastronómico & Foodtrucks</span>
                <span>♿ Rampas de Accesibilidad</span>
                <span>🩺 Puesto Sanitario & Primeros Auxilios</span>
              </div>
            </div>
          </div>

          {/* Panel de Información del Sector Seleccionado */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-7 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${activeSector.color}`}>
                  {activeSector.code}
                </span>
                <span className="text-xs text-slate-400 font-medium">{activeSector.standsCount} Stands asignados</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{activeSector.name}</h3>

              <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                {activeSector.description}
              </p>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  Empresas y referentes clave en esta zona:
                </p>
                <p className="text-sm font-medium text-cyan-300">{activeSector.highlight}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <a
                href="#expositores"
                className="flex-1 text-center text-xs font-semibold py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all font-bold"
              >
                Ver Expositores de este Pabellón
              </a>
              <a
                href="#contacto"
                className="flex-1 text-center text-xs font-semibold py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
              >
                Solicitar Reserva de Stand
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
