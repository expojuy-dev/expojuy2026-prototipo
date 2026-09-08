"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { EVENT } from "@/lib/data";

type Remaining = { days: number; hours: number; minutes: number; seconds: number } | null;

function getRemaining(): Remaining {
  const target = new Date(EVENT.startDate).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = React.useState<Remaining>(null);

  React.useEffect(() => {
    setTime(getRemaining());
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Días", value: time?.days },
    { label: "Horas", value: time?.hours },
    { label: "Minutos", value: time?.minutes },
    { label: "Segundos", value: time?.seconds },
  ];

  return (
    <div
      className="flex items-stretch justify-center gap-2.5 sm:gap-4"
      role="timer"
      aria-label="Cuenta regresiva para el inicio de ExpoJuy 2026"
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
          className="glass relative flex min-w-[72px] flex-col items-center rounded-2xl px-3 py-3.5 shadow-lg shadow-deep/30 sm:min-w-[92px] sm:px-5 sm:py-5"
        >
          <span
            className="font-display text-3xl font-extrabold tabular-nums text-white sm:text-5xl"
            aria-label={`${item.value ?? "--"} ${item.label}`}
          >
            {item.value === undefined ? "--" : String(item.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-turquoise sm:text-xs">
            {item.label}
          </span>
          {i < items.length - 1 ? (
            <span
              className="absolute -right-[7px] top-1/2 z-10 hidden -translate-y-1/2 text-lg font-bold text-lavender/80 sm:block"
              aria-hidden="true"
            >
              :
            </span>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}
