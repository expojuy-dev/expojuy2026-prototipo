"use client";

import {
  Ticket,
  User,
  Briefcase,
  Mic,
  CheckCircle2,
  XCircle,
  QrCode,
  ShieldCheck,
} from "lucide-react";

export function TicketsSection() {
  return (
    <section className="py-space-4xl bg-surface" id="entradas">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="text-center max-w-2xl mx-auto mb-space-3xl">
          <div className="inline-flex items-center gap-space-xs bg-primary/10 px-space-sm py-space-2xs rounded-full mb-space-xs">
            <Ticket className="w-4 h-4 text-primary" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              Acceso Seguro • Pase Digital QR
            </span>
          </div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
            Entradas y Acreditaciones
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
            Adquirí tus pases con confirmación inmediata y código QR seguro directo a tu celular y correo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-xl items-stretch">
          {/* Pricing Card 1: Visitante General */}
          <div className="bg-surface-container-lowest p-space-xl rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-slate-100">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="px-space-sm py-space-2xs rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface font-semibold">
                  Público General
                </span>
                <User className="w-5 h-5 text-outline" />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Entrada General</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Acceso por día a la feria, stands de exposición, pabellones comerciales y shows centrales.
              </p>
              <div className="mt-space-lg pb-space-lg">
                <span className="font-display-hero text-display-hero-mobile text-on-surface font-extrabold">$6.500</span>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider ml-2 font-medium">
                  ARS / Por jornada
                </span>
              </div>
              <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-center gap-space-xs">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Acceso a todos los pabellones feriales
                </li>
                <li className="flex items-center gap-space-xs">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Recitales y espectáculos en el Escenario Mayor
                </li>
                <li className="flex items-center gap-space-xs">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Pase QR digital directo en el smartphone
                </li>
                <li className="flex items-center gap-space-xs text-outline">
                  <XCircle className="w-4 h-4 text-outline shrink-0" /> Sin acceso a salas B2B ni auditorio VIP
                </li>
              </ul>
            </div>
            <button className="mt-space-xl w-full py-space-sm px-space-lg rounded-full bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary font-label-lg text-label-lg transition-all font-semibold">
              Comprar Entrada General
            </button>
          </div>

          {/* Pricing Card 2: Pase Empresarial B2B (Featured) */}
          <div className="bg-surface-container-lowest p-space-xl rounded-3xl shadow-2xl relative flex flex-col justify-between border-2 border-primary-container">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary px-space-md py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider font-bold shadow-md">
              Recomendado para Empresas
            </div>
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="px-space-sm py-space-2xs rounded-full bg-primary-container/20 text-on-primary-container font-label-sm text-label-sm font-bold">
                  Profesional B2B
                </span>
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Pase Ronda de Negocios</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Acceso preferencial integral, salón VIP ejecutivo, matchmaking digital y catálogo exportador.
              </p>
              <div className="mt-space-lg pb-space-lg">
                <span className="font-display-hero text-display-hero-mobile text-primary font-extrabold">$35.000</span>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider ml-2 font-medium">
                  ARS / Acceso Full 10 Días
                </span>
              </div>
              <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-center gap-space-xs">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Acceso irrestricto todos los días de ExpoJuy
                </li>
                <li className="flex items-center gap-space-xs">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Inscripción formal a Rondas de Negocios ZICOSUR
                </li>
                <li className="flex items-center gap-space-xs">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Acceso exclusivo a Salón VIP y Coffee Break
                </li>
                <li className="flex items-center gap-space-xs">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Estacionamiento preferencial asegurado
                </li>
              </ul>
            </div>
            <button className="mt-space-xl w-full py-space-sm px-space-lg rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary font-label-lg text-label-lg shadow-lg hover:opacity-95 transition-all font-semibold">
              Inscribirme a Ronda B2B
            </button>
          </div>

          {/* Pricing Card 3: Prensa & Medios */}
          <div className="bg-surface-container-lowest p-space-xl rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-slate-100">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="px-space-sm py-space-2xs rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold">
                  Prensa Institucional
                </span>
                <Mic className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Acreditación Medios</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Dirigido a periodistas, movileros, fotógrafos y equipos de transmisión audiovisual homologados.
              </p>
              <div className="mt-space-lg pb-space-lg">
                <span className="font-display-hero text-display-hero-mobile text-secondary font-extrabold">Gratuito</span>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider ml-2 font-medium">
                  Validación de Credencial
                </span>
              </div>
              <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-center gap-space-xs">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" /> Sala de prensa con fibra óptica dedicada
                </li>
                <li className="flex items-center gap-space-xs">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" /> Entrevistas concertadas con autoridades y CEOs
                </li>
                <li className="flex items-center gap-space-xs">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" /> Acceso prioritario a conferencias magistrales
                </li>
                <li className="flex items-center gap-space-xs">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" /> Entrega de gacetillas y material fotográfico RAW
                </li>
              </ul>
            </div>
            <button className="mt-space-xl w-full py-space-sm px-space-lg rounded-full bg-surface-container text-on-surface hover:bg-secondary hover:text-on-secondary font-label-lg text-label-lg transition-all font-semibold">
              Solicitar Acreditación Prensa
            </button>
          </div>
        </div>

        {/* QR Quick Security Highlight */}
        <div className="mt-space-2xl bg-surface-container-low p-space-lg rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="h-12 w-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Validación de Acceso Instantánea con QR Dinámico
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Evitá demoras en molinetes de Ciudad Cultural presentando tu credencial digital en pantalla.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md font-semibold shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>Cifrado Antifraude</span>
          </div>
        </div>
      </div>
    </section>
  );
}
