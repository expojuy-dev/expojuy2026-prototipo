"use client";

import { useState } from "react";
import { ACTIVITIES_SCHEDULE } from "@/data/expo-data";
import { Calendar, Clock, MapPin, UserCheck } from "lucide-react";

export function ScheduleSection() {
  const [selectedDay, setSelectedDay] = useState<string>("Todos");

  const days = ["Todos", "Viernes 10 Octubre", "Sábado 11 Octubre", "Domingo 12 Octubre"];

  const filteredActivities = ACTIVITIES_SCHEDULE.filter((act) =>
    selectedDay === "Todos" ? true : act.date === selectedDay
  );

  return (
    <section id="agenda" className="py-24 bg-slate-900/30 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-3">
            Programa de Conferencias & Negocios
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Agenda Oficial de Actividades
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Simposios internacionales, paneles técnicos, rondas de negocios B2B y demostraciones en vivo.
          </p>
        </div>

        {/* Selector de días */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedDay === day
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Lista de Actividades */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-700 transition-all hover:bg-slate-850"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    {activity.time}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {activity.date}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                    {activity.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {activity.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-slate-200 font-medium">{activity.speaker}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-400">{activity.role}</span>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-800 shrink-0 gap-3">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {activity.stage}
                </div>
                <button className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 transition-all border border-slate-700 hover:border-cyan-400">
                  Añadir al Calendario
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
