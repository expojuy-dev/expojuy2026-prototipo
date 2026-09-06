"use client";

import { useState } from "react";
import { EXHIBITORS_DATA } from "@/data/expo-data";
import { Search, MapPin, CheckCircle2, Filter } from "lucide-react";

export function ExhibitorsDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("Todos");

  const sectors = [
    "Todos",
    "Minería & Litio",
    "Energías Renovables",
    "Agroindustria",
    "Tecnología e Innovación",
    "Institucional & Comercio",
  ];

  const filteredExhibitors = EXHIBITORS_DATA.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.stand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector = selectedSector === "Todos" || ex.sector === selectedSector;

    return matchesSearch && matchesSector;
  });

  return (
    <section id="expositores" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-400 text-xs font-semibold tracking-wide uppercase mb-3">
              Catálogo Oficial
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Buscador de Expositores & Stands
            </h2>
            <p className="mt-2 text-slate-400 text-base">
              Localizá empresas expositoras, startups y delegaciones internacionales en tiempo real.
            </p>
          </div>

          {/* Barra de búsqueda por texto */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por empresa o stand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>
        </div>

        {/* Filtros por Categoría / Rubro */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSector === sector
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Grilla de Resultados */}
        {filteredExhibitors.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-base">No se encontraron expositores con los filtros seleccionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExhibitors.map((exhibitor) => (
              <div
                key={exhibitor.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
                      Stand {exhibitor.stand}
                    </span>
                    {exhibitor.featured && (
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Destacado
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {exhibitor.name}
                  </h3>

                  <p className="text-xs font-medium text-slate-400 mt-1 mb-3">
                    {exhibitor.sector} • <span className="text-slate-300">{exhibitor.country}</span>
                  </p>

                  <p className="text-sm text-slate-300 font-light leading-relaxed mb-4">
                    {exhibitor.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exhibitor.hall}</span>
                  </div>
                  <a
                    href="#predio"
                    className="text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    Ver en plano →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
