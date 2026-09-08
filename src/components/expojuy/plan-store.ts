"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type FavActivity = {
  key: string; // `${day}-${index}`
  dayLabel: string;
  date: string; // yyyy-mm-dd
  time: string; // "10:00 - 11:30"
  title: string;
  location: string;
};

export type FavExhibitor = {
  id: string;
  name: string;
  stand: string;
  category: string;
};

type PlanState = {
  activities: Record<string, FavActivity>;
  exhibitors: Record<string, FavExhibitor>;
  toggleActivity: (a: FavActivity) => void;
  toggleExhibitor: (e: FavExhibitor) => void;
  clearAll: () => void;
};

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      activities: {},
      exhibitors: {},
      toggleActivity: (a) =>
        set((state) => {
          const next = { ...state.activities };
          if (next[a.key]) delete next[a.key];
          else next[a.key] = a;
          return { activities: next };
        }),
      toggleExhibitor: (e) =>
        set((state) => {
          const next = { ...state.exhibitors };
          if (next[e.id]) delete next[e.id];
          else next[e.id] = e;
          return { exhibitors: next };
        }),
      clearAll: () => set({ activities: {}, exhibitors: {} }),
    }),
    {
      name: "expojuy-plan-v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/* ── Utilidades de exportación ─────────────────────────────── */

function icsEscape(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/** Genera y descarga un archivo .ics con las actividades guardadas */
export function downloadPlanIcs(activities: Record<string, FavActivity>) {
  const list = Object.values(activities);
  if (list.length === 0) return false;

  const dt = (date: string, hm: string) =>
    `${date.replace(/-/g, "")}T${hm.replace(":", "")}00`;

  const events = list
    .map((a) => {
      const [start, end] = a.time.split("-").map((s) => s.trim());
      return [
        "BEGIN:VEVENT",
        `UID:expojuy-plan-${a.key}@expojuy.com.ar`,
        `DTSTART;TZID=America/Argentina/Jujuy:${dt(a.date, start ?? "10:00")}`,
        `DTEND;TZID=America/Argentina/Jujuy:${dt(a.date, end ?? "11:00")}`,
        `SUMMARY:${icsEscape(`${a.title} — ExpoJuy 2026`)}`,
        `LOCATION:${icsEscape(`${a.location} · Predio Ferial Ciudad Cultural, San Salvador de Jujuy`)}`,
        "DESCRIPTION:" + icsEscape("Actividad guardada desde Mi ExpoJuy · expojuy.com.ar"),
        "END:VEVENT",
      ].join("\r\n");
    })
    .join("\r\n");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ExpoJuy 2026//Mi ExpoJuy//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Mi ExpoJuy 2026",
    "X-WR-TIMEZONE:America/Argentina/Jujuy",
    events,
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mi-expojuy-2026.ics";
  a.click();
  URL.revokeObjectURL(url);
  return true;
}
