"use client";

import { EXPO_PILLARS } from "@/data/expo-data";
import { Pickaxe, SunMedium, Sprout, Cpu, Globe2, Mountain, ArrowUpRight } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Pickaxe,
  SunMedium,
  Sprout,
  Cpu,
  Globe2,
  Mountain,
};

export function PillarsSection() {
  return (
    <section id="sobre-expo" className="py-24 relative overflow-hidden bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-3">
            Ejes Estratégicos
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Los Motores Productivos de la Región
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            ExpoJuy 2026 reúne a los actores clave de la minería sustentable, las energías limpias, la agroindustria y la economía del conocimiento en el corazón del Norte Argentino.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPO_PILLARS.map((pillar) => {
            const IconComponent = ICON_MAP[pillar.icon] || Cpu;

            return (
              <div
                key={pillar.id}
                className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between"
              >
                {/* Gradiente en hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-cyan-300 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700 text-slate-300">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mb-3 uppercase tracking-wider">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="relative pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-400">{pillar.stats}</span>
                  <div className="flex items-center text-xs text-slate-400 group-hover:text-white transition-colors">
                    <span>Conocer más</span>
                    <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
