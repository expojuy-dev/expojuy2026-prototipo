import Image from "next/image";
import { Lightbulb, Cpu, Factory, TrendingUp, Handshake, Brain, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      num: "01",
      title: "Innovación",
      desc: "Vanguardia en tecnologías emergentes, modelos de transición energética y bioeconomía circular.",
      icon: Lightbulb,
      color: "bg-[#2ec4b6]/15 text-[#2ec4b6]",
    },
    {
      num: "02",
      title: "Tecnología",
      desc: "Industria 4.0, sensorización de procesos mineros, automatización agrícola y computación en la nube.",
      icon: Cpu,
      color: "bg-[#8b3d9e]/15 text-[#ed95fd]",
    },
    {
      num: "03",
      title: "Producción",
      desc: "Cadena de valor agroindustrial, tabaco, caña de azúcar, manufacturas andinas y litio de alta pureza.",
      icon: Factory,
      color: "bg-[#2ec4b6]/15 text-[#2ec4b6]",
    },
    {
      num: "04",
      title: "Desarrollo",
      desc: "Atracción de inversiones de capital, ampliación de infraestructura logística y sostenibilidad territorial.",
      icon: TrendingUp,
      color: "bg-[#8b3d9e]/15 text-[#ed95fd]",
    },
    {
      num: "05",
      title: "Vinculación Empresarial",
      desc: "Rondas de negocios multisectoriales internacionales con delegaciones del Cono Sur y mercados globales.",
      icon: Handshake,
      color: "bg-[#2ec4b6]/15 text-[#2ec4b6]",
    },
    {
      num: "06",
      title: "Economía del Conocimiento",
      desc: "Incubación de startups regionales, factorías de software, fintech y exportación de talento jujeño.",
      icon: Brain,
      color: "bg-[#8b3d9e]/15 text-[#ed95fd]",
    },
  ];

  return (
    <section id="sobre-expojuy" className="py-24 bg-[#0e1420] border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 w-fit bg-[#8b3d9e]/15 px-4 py-1.5 rounded-full border border-[#8b3d9e]/30">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ed95fd]">
                Vidriera del Desarrollo Regional
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Sobre ExpoJuy 2026
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Consagrada como la mayor muestra multisectorial del Norte Argentino, ExpoJuy reúne la potencia productiva, la riqueza minera y el ecosistema científico-tecnológico en un diálogo directo con delegaciones de Latinoamérica y el mundo.
            </p>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light">
              Impulsada con el liderazgo institucional de la <strong className="text-white font-semibold">Cámara de Comercio Exterior de Jujuy</strong>, esta edición fortalece la integración logística y económica del <em className="text-[#2ec4b6]">Corredor Bioceánico</em>, creando alianzas estratégicas sostenibles y flujos comerciales de alto impacto.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-slate-950 p-6 flex items-center justify-center border border-slate-800">
                <Image
                  src="/images/brand/logo_camcomext.png"
                  alt="Cámara de Comercio Exterior de Jujuy"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="mt-5 w-full flex items-center justify-between px-2 text-xs">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#2ec4b6]" />
                  <span>Cámara de Comercio Exterior de Jujuy</span>
                </div>
                <span className="text-slate-400">Fundada 1988</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Values Bento Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-slate-900/90 border border-slate-800 p-7 rounded-2xl shadow-sm hover:shadow-xl hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`h-12 w-12 rounded-xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      Pilar {item.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#2ec4b6] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Metrics Band */}
        <div className="mt-16 bg-gradient-to-r from-[#006a62] via-[#2ec4b6]/80 to-[#8b3d9e] p-8 sm:p-12 rounded-3xl text-white shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-4xl sm:text-5xl font-extrabold text-white block">+300</span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider mt-1 block">Expositores Activos</span>
              <span className="text-[11px] text-white/80">Empresas e Instituciones</span>
            </div>
            <div>
              <span className="text-4xl sm:text-5xl font-extrabold text-white block">+100k</span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider mt-1 block">Visitantes Estimados</span>
              <span className="text-[11px] text-white/80">Profesionales y público</span>
            </div>
            <div>
              <span className="text-4xl sm:text-5xl font-extrabold text-white block">10</span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider mt-1 block">Días de Evento</span>
              <span className="text-[11px] text-white/80">Jornadas ininterrumpidas</span>
            </div>
            <div>
              <span className="text-4xl sm:text-5xl font-extrabold text-white block">+15</span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider mt-1 block">Rubros Económicos</span>
              <span className="text-[11px] text-white/80">Cadenas productivas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
