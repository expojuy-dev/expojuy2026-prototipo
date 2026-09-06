"use client";

import { useState } from "react";
import { Building2, Search, ArrowRight, Grid3X3 } from "lucide-react";

interface Exhibitor {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  stand: string;
  categoryKey: string;
  categoryLabel: string;
  tagBg: string;
  tagText: string;
  description: string;
  location: string;
}

const EXHIBITORS: Exhibitor[] = [
  {
    id: "ex-1",
    name: "Jujuy Lithium Energy",
    avatar: "JL",
    avatarBg: "bg-secondary/15 text-secondary",
    stand: "Pabellón Minería • Stand 08",
    categoryKey: "mineria",
    categoryLabel: "Minería",
    tagBg: "bg-secondary/10",
    tagText: "text-secondary",
    description:
      "Procesamiento de carbonato de litio grado batería con tecnología de evaporación sustentable y trazabilidad ambiental.",
    location: "San Salvador de Jujuy",
  },
  {
    id: "ex-2",
    name: "Andean Cloud Solutions",
    avatar: "AC",
    avatarBg: "bg-primary/15 text-primary",
    stand: "Pabellón Tech • Stand 14",
    categoryKey: "tech",
    categoryLabel: "Tecnología",
    tagBg: "bg-primary-container/20",
    tagText: "text-on-primary-container",
    description:
      "Desarrollo de algoritmos predictivos e IA aplicada al monitoreo logístico del Corredor Bioceánico y control de flota.",
    location: "Palpalá, Jujuy",
  },
  {
    id: "ex-3",
    name: "AgroAndina Las Yungas",
    avatar: "AY",
    avatarBg: "bg-secondary/15 text-secondary",
    stand: "Pabellón Agro • Stand 22",
    categoryKey: "agro",
    categoryLabel: "Agro",
    tagBg: "bg-secondary/10",
    tagText: "text-secondary",
    description:
      "Cooperativa exportadora de frutos subtropicales, legumbres premium y biocombustibles derivados de caña azucarera.",
    location: "San Pedro, Jujuy",
  },
  {
    id: "ex-4",
    name: "Cauchari Solar Park",
    avatar: "CS",
    avatarBg: "bg-primary/15 text-primary",
    stand: "Pabellón Energía • Stand 03",
    categoryKey: "energia",
    categoryLabel: "Renovables",
    tagBg: "bg-primary-container/20",
    tagText: "text-on-primary-container",
    description:
      "Parque fotovoltaico a 4.000 msnm con capacidad de 300 MW y proyectos en expansión para almacenamiento verde.",
    location: "Puna Jujeña",
  },
  {
    id: "ex-5",
    name: "ZICOSUR Logística Global",
    avatar: "ZC",
    avatarBg: "bg-inverse-surface text-inverse-on-surface",
    stand: "Pabellón Internacional • Stand 01",
    categoryKey: "comex",
    categoryLabel: "Comex",
    tagBg: "bg-surface-container-high",
    tagText: "text-on-surface",
    description:
      "Operaciones multimodales terrestres y ferroviarias que integran el Norte Grande argentino con los puertos del Pacífico.",
    location: "Antofagasta / Jujuy",
  },
  {
    id: "ex-6",
    name: "Quebrada Heritage Wines",
    avatar: "QG",
    avatarBg: "bg-secondary/15 text-secondary",
    stand: "Pabellón Turismo • Stand 35",
    categoryKey: "turismo",
    categoryLabel: "Turismo",
    tagBg: "bg-secondary/10",
    tagText: "text-secondary",
    description:
      "Vinos de extrema altura y enoturismo en la Quebrada de Humahuaca, con reconocimientos y medallas internacionales.",
    location: "Tilcara, Jujuy",
  },
];

const CATEGORIES = [
  { key: "all", label: "Todos" },
  { key: "tech", label: "Tecnología & IA" },
  { key: "mineria", label: "Minería & Litio" },
  { key: "agro", label: "Agroindustria" },
  { key: "comex", label: "Comercio Exterior" },
  { key: "energia", label: "Energías Renovables" },
  { key: "turismo", label: "Turismo" },
];

export function ExhibitorsDirectory() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExhibitors = EXHIBITORS.filter((ex) => {
    const matchesFilter = currentFilter === "all" || ex.categoryKey === currentFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.stand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="py-space-4xl bg-surface-container-low" id="expositores">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-2xl">
          <div>
            <div className="inline-flex items-center gap-space-xs bg-primary/10 px-space-sm py-space-2xs rounded-full mb-space-xs">
              <Building2 className="w-4 h-4 text-primary shrink-0" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                Directorio Oficial
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
              Expositores Destacados
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
              Explorá las empresas líderes que impulsan el porvenir del Cono Sur.
            </p>
          </div>
          {/* Search Bar Input */}
          <div className="w-full md:w-96 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar empresa, rubro o stand..."
              className="w-full h-12 pl-11 pr-space-md rounded-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>
        </div>

        {/* Filter Pills Carousel / Track */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-space-sm no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = currentFilter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setCurrentFilter(cat.key)}
                className={`px-space-md py-space-xs rounded-full font-label-md text-label-md shrink-0 transition-colors font-semibold ${
                  isActive
                    ? "bg-secondary text-on-secondary shadow-sm"
                    : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Exhibitors Grid */}
        <div className="mt-space-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {filteredExhibitors.map((ex) => (
            <div
              key={ex.id}
              className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-space-sm mb-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center font-headline-sm text-headline-sm font-bold ${ex.avatarBg}`}
                    >
                      {ex.avatar}
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{ex.name}</h3>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">
                        {ex.stand}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-space-xs py-space-2xs rounded-full font-label-sm text-label-sm shrink-0 font-semibold ${ex.tagBg} ${ex.tagText}`}
                  >
                    {ex.categoryLabel}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">
                  {ex.description}
                </p>
              </div>
              <div className="pt-space-sm flex items-center justify-between border-t border-slate-100">
                <span className="font-label-sm text-label-sm text-outline">{ex.location}</span>
                <button className="text-primary font-label-md text-label-md hover:text-primary-container inline-flex items-center gap-1 font-semibold">
                  <span>Ver perfil</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Button Explore All */}
        <div className="mt-space-2xl text-center">
          <button className="inline-flex items-center gap-space-xs rounded-full px-space-xl py-space-sm bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg shadow-md transition-all font-semibold">
            <span>Ver catálogo completo (+300 empresas)</span>
            <Grid3X3 className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
}
