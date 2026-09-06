import { ArrowRight, Newspaper, CloudDownload } from "lucide-react";

export function NewsSection() {
  return (
    <section id="noticias" className="py-24 bg-[#0e1420] border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#2ec4b6]/10 px-3.5 py-1 rounded-full mb-2">
              <Newspaper className="w-3.5 h-3.5 text-[#2ec4b6]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#2ec4b6]">
                Actualidad & Sala de Prensa
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Últimas Noticias
            </h2>
          </div>
          <button className="inline-flex items-center gap-1.5 text-[#ed95fd] hover:text-white text-xs sm:text-sm font-semibold transition-colors">
            <span>Ver todas las publicaciones</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Noticia Principal Grande */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div className="relative h-64 sm:h-72 w-full bg-slate-950 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
              <div className="absolute top-4 left-4 z-20 bg-[#8b3d9e] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                Comercio Internacional
              </div>
              <div className="w-full h-full flex items-center justify-center p-8 text-center text-slate-500 bg-[radial-gradient(ellipse_at_center,rgba(46,196,182,0.2),transparent_70%)]">
                <span className="text-sm font-medium text-slate-400">
                  Firma Protocolo Aduanero Corredor Bioceánico • Salón Belgrano
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <span className="text-xs text-slate-400">14 de Octubre, 2025 • Por Cámara Comex</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 group-hover:text-[#2ec4b6] transition-colors leading-snug">
                  Histórico acuerdo de integración logística entre Jujuy, Tarapacá y Potosí para el Corredor Bioceánico
                </h3>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed font-light">
                  Las comitivas gubernamentales y cámaras de comercio rubricaron el protocolo aduanero simplificado que reducirá hasta un 35% los tiempos de tránsito de cargas hacia el Pacífico.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[#2ec4b6] font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer">
                  Leer artículo completo <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-slate-500">Lectura: 4 min</span>
              </div>
            </div>
          </div>

          {/* 2 Noticias Secundarias + Media Kit */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-4 group">
              <div className="h-16 w-16 rounded-xl bg-[#2ec4b6]/15 text-[#2ec4b6] flex items-center justify-center font-bold text-sm shrink-0">
                01
              </div>
              <div>
                <span className="text-[11px] text-[#2ec4b6] uppercase font-bold">Minería & Innovación</span>
                <h4 className="text-sm font-bold text-white group-hover:text-[#ed95fd] transition-colors line-clamp-2 mt-1">
                  Presentan nueva patente jujeña de extracción directa de litio con emisión cero de agua
                </h4>
                <span className="text-xs text-slate-500 mt-1 block">02 Octubre, 2025</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-4 group">
              <div className="h-16 w-16 rounded-xl bg-[#8b3d9e]/15 text-[#ed95fd] flex items-center justify-center font-bold text-sm shrink-0">
                02
              </div>
              <div>
                <span className="text-[11px] text-[#ed95fd] uppercase font-bold">Startups NOA</span>
                <h4 className="text-sm font-bold text-white group-hover:text-[#ed95fd] transition-colors line-clamp-2 mt-1">
                  Convocatoria abierta para el concurso de innovación tecnológica y capital semilla regional
                </h4>
                <span className="text-xs text-slate-500 mt-1 block">28 Septiembre, 2025</span>
              </div>
            </div>

            {/* Media Kit Direct Download Banner */}
            <div className="bg-gradient-to-br from-[#2ec4b6]/20 via-[#006a62]/20 to-[#8b3d9e]/20 border border-[#2ec4b6]/30 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2ec4b6] block mb-1">
                  Sala de Prensa & Acreditados
                </span>
                <h4 className="text-lg font-bold text-white">Media Kit Oficial ExpoJuy 2026</h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-light">
                  Descargá isologotipos vectoriales, manual de marca, imágenes oficiales en alta resolución y gacetillas institucionales.
                </p>
              </div>

              <a
                href="/images/brand/expojuy26_horizontal.png"
                download
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                <CloudDownload className="w-4 h-4 text-[#006a62]" />
                Descargar Kit de Prensa Oficial
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
