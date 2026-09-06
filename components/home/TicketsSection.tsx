import { CheckCircle2, QrCode, ShieldCheck, User, Briefcase, Mic } from "lucide-react";

export function TicketsSection() {
  return (
    <section id="entradas" className="py-24 bg-[#0e1420] border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#2ec4b6]/10 px-4 py-1 rounded-full mb-3 border border-[#2ec4b6]/30">
            <QrCode className="w-3.5 h-3.5 text-[#2ec4b6]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#2ec4b6]">
              Acceso Seguro • Pase Digital QR
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Entradas y Acreditaciones
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 font-light">
            Adquirí tus pases con confirmación inmediata y código QR seguro directo a tu celular y correo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Entrada General */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-slate-300">
                  Público General
                </span>
                <User className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Entrada General</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Acceso por día a la feria, stands de exposición, pabellones comerciales y shows centrales.
              </p>

              <div className="mt-6 pb-6 border-b border-slate-800">
                <span className="text-4xl font-extrabold text-white font-mono">$6.500</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider ml-2">ARS / Por jornada</span>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2ec4b6] shrink-0" />
                  <span>Acceso a todos los pabellones feriales</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2ec4b6] shrink-0" />
                  <span>Recitales y espectáculos en el Escenario Mayor</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2ec4b6] shrink-0" />
                  <span>Pase QR digital directo en el smartphone</span>
                </li>
              </ul>
            </div>

            <button className="mt-8 w-full py-3 px-6 rounded-full bg-slate-800 hover:bg-[#2ec4b6] hover:text-slate-950 text-white text-xs font-bold transition-all shadow-md">
              Comprar Entrada General
            </button>
          </div>

          {/* Card 2: Pase Profesional B2B (Destacado) */}
          <div className="bg-slate-900 border-2 border-[#2ec4b6] p-8 rounded-3xl shadow-2xl relative flex flex-col justify-between scale-[1.03]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2ec4b6] via-[#006a62] to-[#8b3d9e] text-white px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-lg">
              Recomendado para Empresas
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#2ec4b6]/20 text-xs font-bold text-[#2ec4b6]">
                  Profesional B2B
                </span>
                <Briefcase className="w-4 h-4 text-[#2ec4b6]" />
              </div>
              <h3 className="text-xl font-bold text-white">Pase Ronda de Negocios</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Acceso preferencial integral, salón VIP ejecutivo, matchmaking digital y catálogo exportador.
              </p>

              <div className="mt-6 pb-6 border-b border-slate-800">
                <span className="text-4xl font-extrabold text-[#70f8e8] font-mono">$35.000</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider ml-2">ARS / Acceso Full 10 Días</span>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2ec4b6] shrink-0" />
                  <span>Acceso irrestricto todos los días de ExpoJuy</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2ec4b6] shrink-0" />
                  <span>Inscripción formal a Rondas de Negocios ZICOSUR</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2ec4b6] shrink-0" />
                  <span>Acceso exclusivo a Salón VIP y Coffee Break</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2ec4b6] shrink-0" />
                  <span>Estacionamiento preferencial asegurado</span>
                </li>
              </ul>
            </div>

            <button className="mt-8 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#2ec4b6] via-[#006a62] to-[#8b3d9e] text-white text-xs font-bold shadow-lg hover:opacity-95 transition-all">
              Inscribirme a Ronda B2B
            </button>
          </div>

          {/* Card 3: Prensa & Medios */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#8b3d9e]/20 text-xs font-bold text-[#ed95fd]">
                  Prensa Institucional
                </span>
                <Mic className="w-4 h-4 text-[#ed95fd]" />
              </div>
              <h3 className="text-xl font-bold text-white">Acreditación Medios</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Dirigido a periodistas, movileros, fotógrafos y equipos de transmisión audiovisual homologados.
              </p>

              <div className="mt-6 pb-6 border-b border-slate-800">
                <span className="text-4xl font-extrabold text-[#ed95fd] font-mono">Gratuito</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider ml-2">Validación de Credencial</span>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ed95fd] shrink-0" />
                  <span>Sala de prensa con fibra óptica dedicada</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ed95fd] shrink-0" />
                  <span>Entrevistas concertadas con autoridades y CEOs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ed95fd] shrink-0" />
                  <span>Acceso prioritario a conferencias magistrales</span>
                </li>
              </ul>
            </div>

            <button className="mt-8 w-full py-3 px-6 rounded-full bg-slate-800 hover:bg-[#8b3d9e] text-white text-xs font-bold transition-all shadow-md">
              Solicitar Acreditación Prensa
            </button>
          </div>
        </div>

        {/* Highlight de Seguridad */}
        <div className="mt-12 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#2ec4b6]/15 text-[#2ec4b6] flex items-center justify-center shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Validación de Acceso Instantánea con QR Dinámico</h4>
              <p className="text-xs text-slate-400">Evitá demoras en molinetes de Ciudad Cultural presentando tu credencial digital en pantalla.</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#ed95fd] text-xs font-semibold shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>Cifrado Antifraude</span>
          </div>
        </div>
      </div>
    </section>
  );
}
