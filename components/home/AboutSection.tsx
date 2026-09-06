import Image from "next/image";
import { Lightbulb, Cpu, Factory, TrendingUp, Handshake, Brain, CheckCircle2, Globe } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      num: "01",
      title: "Innovación",
      desc: "Vanguardia en tecnologías emergentes, modelos de transición energética y bioeconomía circular.",
      icon: Lightbulb,
      bgColor: "bg-[#2ec4b6]/15",
      textColor: "text-[#006a62]",
    },
    {
      num: "02",
      title: "Tecnología",
      desc: "Industria 4.0, sensorización de procesos mineros, automatización agrícola y computación en la nube.",
      icon: Cpu,
      bgColor: "bg-[#8b3d9e]/10",
      textColor: "text-[#8b3d9e]",
    },
    {
      num: "03",
      title: "Producción",
      desc: "Cadena de valor agroindustrial, tabaco, caña de azúcar, manufacturas andinas y litio de alta pureza.",
      icon: Factory,
      bgColor: "bg-[#2ec4b6]/15",
      textColor: "text-[#006a62]",
    },
    {
      num: "04",
      title: "Desarrollo",
      desc: "Atracción de inversiones de capital, ampliación de infraestructura logística y sostenibilidad territorial.",
      icon: TrendingUp,
      bgColor: "bg-[#8b3d9e]/10",
      textColor: "text-[#8b3d9e]",
    },
    {
      num: "05",
      title: "Vinculación Empresarial",
      desc: "Rondas de negocios multisectoriales internacionales con delegaciones del Cono Sur y mercados globales.",
      icon: Handshake,
      bgColor: "bg-[#2ec4b6]/15",
      textColor: "text-[#006a62]",
    },
    {
      num: "06",
      title: "Economía del Conocimiento",
      desc: "Incubación de startups regionales, factorías de software, fintech y exportación de talento jujeño.",
      icon: Brain,
      bgColor: "bg-[#8b3d9e]/10",
      textColor: "text-[#8b3d9e]",
    },
  ];

  return (
    <section id="sobre-expojuy" className="py-24 bg-[#fcf9f8] text-slate-900">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 w-fit bg-[#8b3d9e]/10 px-3.5 py-1 rounded-full border border-[#8b3d9e]/20">
              <Globe className="w-4 h-4 text-[#8b3d9e]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#8b3d9e]">
                Vidriera del Desarrollo Regional
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Sobre ExpoJuy 2026
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Consagrada como la mayor muestra multisectorial del Norte Argentino, ExpoJuy reúne la potencia productiva, la riqueza minera y el ecosistema científico-tecnológico en un diálogo directo con delegaciones de Latinoamérica y el mundo.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Impulsada con el liderazgo institucional de la <strong className="text-slate-900 font-bold">Cámara de Comercio Exterior de Jujuy</strong>, esta edición fortalece la integración logística y económica del <em className="text-[#006a62] font-semibold not-italic">Corredor Bioceánico</em>, creando alianzas estratégicas sostenibles y flujos comerciales de alto impacto.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#f0eded] p-6 border border-slate-200">
              <div className="relative w-full h-64 rounded-xl overflow-hidden bg-white p-6 flex items-center justify-center border border-slate-100 shadow-sm">
                <Image
                  src="/images/brand/logo_camcomext.png"
                  alt="Cámara de Comercio Exterior de Jujuy"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-2 text-xs">
                <div className="flex items-center gap-2 text-slate-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#006a62]" />
                  <span>Cámara de Comercio Exterior de Jujuy</span>
                </div>
                <span className="text-slate-500 font-medium">Fundada 1988</span>
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
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`h-12 w-12 rounded-xl ${item.bgColor} flex items-center justify-center ${item.textColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Pilar {item.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#006a62] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Metrics Band */}
        <div className="mt-16 bg-gradient-to-r from-[#006a62] to-[#8b3d9e] p-8 sm:p-12 rounded-3xl text-white shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#70f8e8] leading-none">+300</span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider mt-2">Expositores Confirmados</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#fdd6ff] leading-none">+100k</span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider mt-2">Visitantes Esperados</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#70f8e8] leading-none">10</span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider mt-2">Países Participantes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#fdd6ff] leading-none">+15</span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider mt-2">Sectores Productivos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
