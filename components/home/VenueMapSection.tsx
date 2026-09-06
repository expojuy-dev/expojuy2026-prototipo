"use client";

import { useState } from "react";
import {
  Map,
  Download,
  Box,
  Wifi,
  Tv,
  Coffee,
  Wrench,
  Leaf,
  Handshake,
  Languages,
  Briefcase,
  FileText,
  Utensils,
  Music,
  Sun,
} from "lucide-react";

interface FeatureItem {
  icon: React.ElementType;
  text: string;
}

interface PavilionInfo {
  tag: string;
  title: string;
  desc: string;
  features: FeatureItem[];
  capacity: string;
  occupancy: string;
}

const PAVILION_DATA: Record<string, PavilionInfo> = {
  tech: {
    tag: "Pabellón 01 • Turquesa",
    title: "Pabellón Tech e Innovación",
    desc: "Ecosistema de economía del conocimiento, robótica industrial, conectividad satelital y soluciones de software predictivo para minería y agro.",
    features: [
      { icon: Wifi, text: "Conectividad Starlink alta velocidad" },
      { icon: Tv, text: "Espacio Tech para demos y pitcheos" },
      { icon: Coffee, text: "Coffee lounge para acuerdos ágiles" },
    ],
    capacity: "64 Stands Activos",
    occupancy: "100% Ocupado",
  },
  mineria: {
    tag: "Pabellón 02 • Violeta",
    title: "Pabellón de Minería e Industria",
    desc: "Sede de las mayores compañías mineras internacionales de litio, plata, zinc y proveedores de maquinaria pesada con sello verde.",
    features: [
      { icon: Wrench, text: "Simuladores de maquinaria pesada" },
      { icon: Leaf, text: "Muestra de remediación hídrica sustentable" },
      { icon: Handshake, text: "Mesa de proveedores mineros del NOA" },
    ],
    capacity: "82 Stands Activos",
    occupancy: "100% Ocupado",
  },
  inter: {
    tag: "Pabellón 03 • Grafito",
    title: "Pabellón Internacional & ZICOSUR",
    desc: "Espacio diplomático y comercial que alberga a comitivas y embajadas de Chile, Bolivia, Paraguay, Brasil, Perú y misiones multilaterales.",
    features: [
      { icon: Languages, text: "Servicio de traducción e intérpretes" },
      { icon: Briefcase, text: "12 Boxes privados para rondas B2B" },
      { icon: FileText, text: "Asesoramiento aduanero y arancelario" },
    ],
    capacity: "45 Stands Consulares",
    occupancy: "Cupo Completo",
  },
  food: {
    tag: "Sector 04 • Lavanda",
    title: "Plaza Gastronómica & Escenario Mayor",
    desc: "El corazón festivo de ExpoJuy. Degustación de cocina andina de autor, bodegas de extrema altura y espectáculos folclóricos y de rock.",
    features: [
      { icon: Utensils, text: "Más de 20 food trucks y restós locales" },
      { icon: Music, text: "Escenario principal con shows diarios" },
      { icon: Sun, text: "Sector de descanso al aire libre" },
    ],
    capacity: "Capacidad para 5.000 personas",
    occupancy: "Acceso Libre",
  },
};

export function VenueMapSection() {
  const [selectedKey, setSelectedKey] = useState<string>("tech");
  const activePavilion = PAVILION_DATA[selectedKey];

  return (
    <section className="py-space-4xl bg-surface-container-low" id="mapa">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-2xl">
          <div>
            <div className="inline-flex items-center gap-space-xs bg-primary/10 px-space-sm py-space-2xs rounded-full mb-space-xs">
              <Map className="w-4 h-4 text-primary shrink-0" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                Plano Interactivo
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
              Distribución del Predio Ferial
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
              Ciudad Cultural, San Salvador de Jujuy. Seleccioná cada pabellón para conocer su oferta.
            </p>
          </div>
          <div className="flex items-center gap-space-sm">
            <button className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md shadow-sm transition-all font-semibold">
              <Download className="w-4 h-4 shrink-0 text-primary" />
              <span>Descargar Plano PDF</span>
            </button>
            <button className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-secondary hover:bg-secondary-container hover:text-on-secondary-container text-on-secondary font-label-md text-label-md shadow-sm transition-all font-semibold">
              <Box className="w-4 h-4 shrink-0" />
              <span>Vista 360°</span>
            </button>
          </div>
        </div>

        {/* Interactive Layout Scheme */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Interactive Pavilion Diagram (SVG Canvas) */}
          <div className="lg:col-span-8 bg-surface-container-lowest p-space-lg rounded-3xl shadow-sm">
            <div className="relative w-full aspect-[16/10] bg-surface-container-low rounded-2xl overflow-hidden p-space-md flex flex-col justify-between">
              <svg className="w-full h-full" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-surface-variant/40"
                    />
                  </pattern>
                </defs>
                <rect width="800" height="500" fill="url(#grid)" />

                {/* Entrance & Parking */}
                <rect x="30" y="420" width="740" height="60" rx="12" fill="#eae7e7" />
                <text
                  x="400"
                  y="455"
                  textAnchor="middle"
                  className="fill-on-surface-variant font-bold text-sm tracking-wider"
                >
                  ACCESO PRINCIPAL • ACREDITACIONES • ESTACIONAMIENTO VIP • PRENSA
                </text>

                {/* Pavilion Tech */}
                <g
                  className={`cursor-pointer transition-all hover:opacity-90 ${selectedKey === "tech" ? "opacity-100 ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedKey("tech")}
                >
                  <rect x="50" y="60" width="220" height="150" rx="16" fill="#2EC4B6" opacity="0.9" />
                  <text x="160" y="130" textAnchor="middle" fill="#004c46" fontSize="18" fontWeight="bold">
                    Pabellón Tech
                  </text>
                  <text x="160" y="155" textAnchor="middle" fill="#004c46" fontSize="12">
                    Innovación & Software
                  </text>
                  <circle cx="240" cy="85" r="14" fill="#ffffff" />
                  <text x="240" y="90" textAnchor="middle" fill="#006a62" fontSize="12" fontWeight="bold">
                    01
                  </text>
                </g>

                {/* Pavilion Minería */}
                <g
                  className={`cursor-pointer transition-all hover:opacity-90 ${selectedKey === "mineria" ? "opacity-100 ring-2 ring-secondary" : ""}`}
                  onClick={() => setSelectedKey("mineria")}
                >
                  <rect x="300" y="60" width="220" height="150" rx="16" fill="#7B2D8E" opacity="0.9" />
                  <text x="410" y="130" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">
                    Pabellón Minería
                  </text>
                  <text x="410" y="155" textAnchor="middle" fill="#fdd6ff" fontSize="12">
                    Litio e Industria Pesada
                  </text>
                  <circle cx="490" cy="85" r="14" fill="#ffffff" />
                  <text x="490" y="90" textAnchor="middle" fill="#7B2D8E" fontSize="12" fontWeight="bold">
                    02
                  </text>
                </g>

                {/* Pavilion Internacional */}
                <g
                  className={`cursor-pointer transition-all hover:opacity-90 ${selectedKey === "inter" ? "opacity-100 ring-2 ring-slate-700" : ""}`}
                  onClick={() => setSelectedKey("inter")}
                >
                  <rect x="550" y="60" width="200" height="150" rx="16" fill="#303030" opacity="0.95" />
                  <text x="650" y="130" textAnchor="middle" fill="#f3f0f0" fontSize="18" fontWeight="bold">
                    Pab. Internacional
                  </text>
                  <text x="650" y="155" textAnchor="middle" fill="#4fdbcc" fontSize="12">
                    ZICOSUR & Rondas B2B
                  </text>
                  <circle cx="720" cy="85" r="14" fill="#ffffff" />
                  <text x="720" y="90" textAnchor="middle" fill="#303030" fontSize="12" fontWeight="bold">
                    03
                  </text>
                </g>

                {/* Central Plaza & Food Area */}
                <g
                  className={`cursor-pointer transition-all hover:opacity-90 ${selectedKey === "food" ? "opacity-100 ring-2 ring-purple-400" : ""}`}
                  onClick={() => setSelectedKey("food")}
                >
                  <rect x="180" y="240" width="440" height="150" rx="18" fill="#c7a4d7" opacity="0.9" />
                  <text x="400" y="310" textAnchor="middle" fill="#2a0f39" fontSize="18" fontWeight="bold">
                    Plaza Gastronómica & Escenario Mayor
                  </text>
                  <text x="400" y="335" textAnchor="middle" fill="#583b67" fontSize="13">
                    Shows en vivo • Sabores Andinos • Networking Abierto
                  </text>
                  <circle cx="590" cy="265" r="14" fill="#ffffff" />
                  <text x="590" y="270" textAnchor="middle" fill="#715381" fontSize="12" fontWeight="bold">
                    04
                  </text>
                </g>

                {/* Circulation Paths */}
                <path
                  d="M 160 210 L 160 240 M 410 210 L 410 240 M 650 210 L 650 240"
                  stroke="#6c7a77"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Map Legend */}
              <div className="flex flex-wrap items-center justify-between gap-space-xs pt-space-sm border-t border-surface-variant/40">
                <div className="flex items-center gap-space-2xs text-body-sm font-body-sm text-on-surface-variant">
                  <span className="h-3 w-3 rounded-full bg-primary-container inline-block" /> Pabellón Tech
                </div>
                <div className="flex items-center gap-space-2xs text-body-sm font-body-sm text-on-surface-variant">
                  <span className="h-3 w-3 rounded-full bg-secondary inline-block" /> Pabellón Minería
                </div>
                <div className="flex items-center gap-space-2xs text-body-sm font-body-sm text-on-surface-variant">
                  <span className="h-3 w-3 rounded-full bg-inverse-surface inline-block" /> Pab. Internacional
                </div>
                <div className="flex items-center gap-space-2xs text-body-sm font-body-sm text-on-surface-variant">
                  <span className="h-3 w-3 rounded-full bg-tertiary-container inline-block" /> Escenario & Gastro
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Side Detail Panel */}
          <div className="lg:col-span-4 bg-surface-container-lowest p-space-xl rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <span className="px-space-sm py-space-2xs rounded-full bg-primary-container/20 text-on-primary-container font-label-sm text-label-sm uppercase tracking-wider font-bold">
                {activePavilion.tag}
              </span>
              <h3 className="font-headline-lg text-headline-lg text-on-surface mt-space-sm font-bold">
                {activePavilion.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm leading-relaxed">
                {activePavilion.desc}
              </p>
              <div className="mt-space-lg">
                <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider block mb-space-xs font-bold">
                  Servicios en este sector:
                </span>
                <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                  {activePavilion.features.map((feat, idx) => {
                    const IconComponent = feat.icon;
                    return (
                      <li key={idx} className="flex items-center gap-space-xs">
                        <IconComponent className="w-4 h-4 text-primary shrink-0" />
                        <span>{feat.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="mt-space-xl p-space-md rounded-2xl bg-surface-container-low">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1 font-semibold">
                Capacidad y Espacios:
              </span>
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  {activePavilion.capacity}
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-bold">
                  {activePavilion.occupancy}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
