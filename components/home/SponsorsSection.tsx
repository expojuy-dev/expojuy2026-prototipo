import { Award, ArrowRight } from "lucide-react";

export function SponsorsSection() {
  const platinumSponsors = [
    { name: "LITHIUM", suffix: "CORP", color: "text-[#2ec4b6]" },
    { name: "BANCO", suffix: "MACRO", color: "text-[#ed95fd]" },
    { name: "YPF", suffix: "SOLAR", color: "text-[#70f8e8]" },
  ];

  const goldSponsors = ["TELECOM 5G", "LEDESMA", "AEROLÍNEAS", "TOYOTA NOA"];

  const institutionalSupport = [
    "Gobierno de la Provincia de Jujuy",
    "Cámara de Comercio Exterior de Jujuy",
    "ZICOSUR (Secretaría Pro Témpore)",
    "Universidad Nacional de Jujuy (UNJu)",
    "Unión Industrial de Jujuy (UIJ)",
  ];

  return (
    <section id="sponsors" className="py-24 bg-[#0b0f17] border-t border-slate-800 text-center">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-1.5 bg-[#8b3d9e]/15 px-3.5 py-1 rounded-full mb-3 border border-[#8b3d9e]/30">
          <Award className="w-3.5 h-3.5 text-[#ed95fd]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#ed95fd]">
            Alianzas de Prestigio
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Sponsors Oficiales
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-2 font-light">
          Empresas y entidades que potencian la competitividad regional y hacen posible este encuentro bioceánico.
        </p>

        {/* Tier 1: Platinum Sponsors */}
        <div className="mt-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ed95fd] mb-6 block">
            Patrocinadores Platino
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {platinumSponsors.map((sp) => (
              <div
                key={sp.name}
                className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-lg flex items-center justify-center h-28 hover:border-slate-700 hover:scale-105 transition-all"
              >
                <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white">
                  {sp.name}
                  <span className={`${sp.color} font-light ml-1`}>{sp.suffix}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: Gold Sponsors */}
        <div className="mt-12">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 block">
            Patrocinadores Oro
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {goldSponsors.map((name) => (
              <div
                key={name}
                className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-center h-20 hover:border-slate-700 transition-all"
              >
                <span className="text-sm sm:text-base font-bold text-slate-300 tracking-wide">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 3: Institutional Support */}
        <div className="mt-12">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 block">
            Apoyo Institucional
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {institutionalSupport.map((inst) => (
              <span
                key={inst}
                className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300"
              >
                {inst}
              </span>
            ))}
          </div>
        </div>

        {/* Lead Capture Card for Sponsors */}
        <div className="mt-16 max-w-3xl mx-auto bg-gradient-to-r from-[#006a62] to-[#8b3d9e] p-8 rounded-3xl text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h3 className="text-xl font-bold">¿Querés que tu marca lidere en el Norte Argentino?</h3>
            <p className="text-xs sm:text-sm text-white/90 mt-1 font-light">
              Sumate como Sponsor Oficial de ExpoJuy 2026 y accedé a espacios exclusivos de alta visibilidad.
            </p>
          </div>
          <a
            href="#contacto"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-slate-100 transition-all shadow-lg"
          >
            <span>Solicitar Dossier</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
