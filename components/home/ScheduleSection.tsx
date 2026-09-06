"use client";

import { useState } from "react";
import { CalendarDays, Clock, DoorOpen, Check, CalendarPlus } from "lucide-react";

interface Session {
  timeStart: string;
  timeEnd: string;
  categoryBg: string;
  categoryText: string;
  categoryLabel: string;
  room: string;
  title: string;
  desc: string;
  speakerAvatar: string;
  speakerBg: string;
  speakerName: string;
}

const SESSIONS_DAY_1: Session[] = [
  {
    timeStart: "09:30",
    timeEnd: "11:00 hs",
    categoryBg: "bg-secondary/10",
    categoryText: "text-secondary",
    categoryLabel: "Comercio Exterior",
    room: "Auditorio Principal Manuel Belgrano",
    title: "Acto de Apertura: Desafíos del Corredor Bioceánico 2030",
    desc: "Conferencia inaugural con ministros de producción, autoridades consulares y directores de aduanas del Cono Sur.",
    speakerAvatar: "JR",
    speakerBg: "bg-secondary text-on-secondary",
    speakerName: "Dr. Jorge Rodríguez • Pte. Cámara Comex Jujuy",
  },
  {
    timeStart: "11:30",
    timeEnd: "13:00 hs",
    categoryBg: "bg-primary-container/20",
    categoryText: "text-on-primary-container",
    categoryLabel: "Litio & Energías",
    room: "Sala de Negocios ZICOSUR",
    title: "El Triángulo del Litio: Agregado de Valor y Fabricación de Celdas",
    desc: "Análisis técnico de proyectos de refinación de sales, baterías de última generación y sustentabilidad comunitaria.",
    speakerAvatar: "EL",
    speakerBg: "bg-primary text-on-primary",
    speakerName: "Dra. Elena Larrea • Investigadora en Materiales Avanzados",
  },
  {
    timeStart: "15:00",
    timeEnd: "16:30 hs",
    categoryBg: "bg-secondary/10",
    categoryText: "text-secondary",
    categoryLabel: "Innovación & IA",
    room: "Espacio Tech Innovación",
    title: "IA Generativa y Agentes Autónomos en Cadenas Productivas",
    desc: "Cómo la inteligencia artificial automatiza la gestión aduanera, la previsión climática y la inspección de procesos.",
    speakerAvatar: "MA",
    speakerBg: "bg-secondary text-on-primary",
    speakerName: "Ing. Martín Abalos • CTO Andean Cloud AI",
  },
  {
    timeStart: "17:00",
    timeEnd: "18:30 hs",
    categoryBg: "bg-primary-container/20",
    categoryText: "text-on-primary-container",
    categoryLabel: "Rondas B2B",
    room: "Foyer de Negociaciones",
    title: "Pitching de Exportadores del NOA a Compradores de Chile, Bolivia y Brasil",
    desc: "Reuniones de 15 minutos cronometradas para acuerdos comerciales y contratos de suministro directo.",
    speakerAvatar: "SM",
    speakerBg: "bg-primary text-on-primary",
    speakerName: "Lic. Silvina Morales • Coordinadora Rondas Internacionales",
  },
];

export function ScheduleSection() {
  const [activeDay, setActiveDay] = useState(1);
  const [addedIds, setAddedIds] = useState<Record<number, boolean>>({});

  const toggleCalendar = (index: number) => {
    setAddedIds((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [index]: false }));
    }, 2500);
  };

  return (
    <section className="py-space-4xl bg-surface" id="agenda">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-2xl">
          <div>
            <div className="inline-flex items-center gap-space-xs bg-secondary/10 px-space-sm py-space-2xs rounded-full mb-space-xs">
              <CalendarDays className="w-4 h-4 text-secondary shrink-0" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                Programa de Conferencias
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
              Agenda Oficial ExpoJuy 2026
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
              Disertaciones magistrales, paneles binacionales y talleres de industria 4.0.
            </p>
          </div>
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span>Horario Oficial: UTC-3 (Argentina)</span>
          </div>
        </div>

        {/* Day Switcher Pills */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-space-sm no-scrollbar">
          <button
            onClick={() => setActiveDay(1)}
            className={`px-space-lg py-space-xs rounded-full font-label-md text-label-md shrink-0 transition-all font-semibold ${
              activeDay === 1
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
            }`}
          >
            Día 1 • 10 Oct • Apertura Institucional
          </button>
          <button
            onClick={() => setActiveDay(2)}
            className={`px-space-lg py-space-xs rounded-full font-label-md text-label-md shrink-0 transition-all font-semibold ${
              activeDay === 2
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
            }`}
          >
            Día 2 • 11 Oct • Tech & IA Aplicada
          </button>
          <button
            onClick={() => setActiveDay(3)}
            className={`px-space-lg py-space-xs rounded-full font-label-md text-label-md shrink-0 transition-all font-semibold ${
              activeDay === 3
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
            }`}
          >
            Día 3 • 12 Oct • Litio & Transición Energética
          </button>
          <button
            onClick={() => setActiveDay(4)}
            className={`px-space-lg py-space-xs rounded-full font-label-md text-label-md shrink-0 transition-all font-semibold ${
              activeDay === 4
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
            }`}
          >
            Día 4 • 13 Oct • Rondas B2B Bioceánicas
          </button>
          <button
            onClick={() => setActiveDay(5)}
            className={`px-space-lg py-space-xs rounded-full font-label-md text-label-md shrink-0 transition-all font-semibold ${
              activeDay === 5
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
            }`}
          >
            Día 5 • 14 Oct • Agroindustria Sustentable
          </button>
        </div>

        {/* Timeline Schedule Items */}
        <div className="mt-space-xl flex flex-col gap-space-md">
          {SESSIONS_DAY_1.map((session, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg"
            >
              <div className="flex items-start gap-space-lg">
                <div className="flex flex-col items-center justify-center p-space-sm rounded-xl bg-primary-container/15 text-primary min-w-28 text-center shrink-0">
                  <span className="font-headline-sm text-headline-sm font-bold">{session.timeStart}</span>
                  <span className="font-label-sm text-label-sm">{session.timeEnd}</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-space-xs mb-space-2xs">
                    <span
                      className={`px-space-xs py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${session.categoryBg} ${session.categoryText}`}
                    >
                      {session.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                      <DoorOpen className="w-3.5 h-3.5 text-outline shrink-0" />
                      <span>{session.room}</span>
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {session.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {session.desc}
                  </p>
                  <div className="mt-space-sm flex items-center gap-space-sm">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${session.speakerBg}`}
                    >
                      {session.speakerAvatar}
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                      {session.speakerName}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleCalendar(idx)}
                className={`shrink-0 inline-flex items-center justify-center gap-space-xs px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all font-semibold ${
                  addedIds[idx]
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container hover:bg-primary hover:text-on-primary"
                }`}
              >
                {addedIds[idx] ? (
                  <Check className="w-4 h-4 shrink-0" />
                ) : (
                  <CalendarPlus className="w-4 h-4 shrink-0" />
                )}
                <span>{addedIds[idx] ? "Agendado" : "Añadir a mi calendario"}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
