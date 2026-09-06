"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Store, Ticket, ArrowDown } from "lucide-react";

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 240,
    hours: 14,
    minutes: 38,
    seconds: 42,
  });

  useEffect(() => {
    const targetDate = new Date("2026-10-10T09:00:00").getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#1b1c1c]"
    >
      {/* Fondo con imagen y gradientes cian & violeta de la maqueta Stitch */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b1c1c]/90 via-[#7B2D8E]/75 to-[#1b1c1c]/95 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(46,196,182,0.35),transparent_50%)] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,rgba(139,61,158,0.4),transparent_55%)] z-10" />
      </div>

      <div className="relative z-20 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Date & Venue Pill Badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-2 rounded-full shadow-lg mb-6">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ec4b6] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2ec4b6]" />
          </span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#70f8e8]">
            10 al 19 de Octubre 2026 • Ciudad Cultural, Jujuy
          </span>
        </div>

        {/* Isologotipo oficial */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-4">
          <Image
            src="/images/brand/expojuy26_isologotipo.png"
            alt="ExpoJuy 2026 Isologotipo"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
          Conectando Países,{" "}
          <span className="bg-gradient-to-r from-[#2ec4b6] via-[#70f8e8] to-[#ed95fd] bg-clip-text text-transparent">
            Creando Oportunidades
          </span>
        </h1>

        <p className="mt-5 max-w-3xl text-base sm:text-lg text-slate-200 leading-relaxed font-light">
          La feria de producción, tecnología, innovación y comercio exterior más trascendente del Norte Argentino. El epicentro estratégico para el NOA, ZICOSUR y el Corredor Bioceánico.
        </p>

        {/* Countdown Timer Grid */}
        <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-4 w-full max-w-xl">
          <div className="bg-white/15 backdrop-blur-xl p-3 sm:p-4 rounded-xl text-center shadow-lg">
            <span className="block text-3xl sm:text-4xl font-bold text-[#70f8e8] leading-none font-mono">
              {timeLeft.days}
            </span>
            <span className="text-[10px] sm:text-xs uppercase text-slate-200 tracking-wider mt-1 block">
              Días
            </span>
          </div>
          <div className="bg-white/15 backdrop-blur-xl p-3 sm:p-4 rounded-xl text-center shadow-lg">
            <span className="block text-3xl sm:text-4xl font-bold text-[#4fdbcc] leading-none font-mono">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs uppercase text-slate-200 tracking-wider mt-1 block">
              Horas
            </span>
          </div>
          <div className="bg-white/15 backdrop-blur-xl p-3 sm:p-4 rounded-xl text-center shadow-lg">
            <span className="block text-3xl sm:text-4xl font-bold text-[#fdd6ff] leading-none font-mono">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs uppercase text-slate-200 tracking-wider mt-1 block">
              Min
            </span>
          </div>
          <div className="bg-white/15 backdrop-blur-xl p-3 sm:p-4 rounded-xl text-center shadow-lg">
            <span className="block text-3xl sm:text-4xl font-bold text-[#f4aeff] leading-none font-mono">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs uppercase text-slate-200 tracking-wider mt-1 block">
              Seg
            </span>
          </div>
        </div>

        {/* Dual Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#expositores"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-[#1c1b1f] font-bold text-sm bg-gradient-to-r from-[#ed95fd] to-[#8b3d9e] text-white hover:opacity-95 transition-all shadow-[0_8px_20px_-4px_rgba(139,61,158,0.5)]"
          >
            <Store className="w-4 h-4" />
            Buscar Expositores
          </a>
          <a
            href="#mapa"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#006a62] to-[#2ec4b6] hover:opacity-95 transition-all shadow-[0_10px_24px_-4px_rgba(46,196,182,0.45)]"
          >
            <Ticket className="w-4 h-4" />
            Descargar Mapa
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#sobre-expojuy"
          className="mt-10 inline-flex flex-col items-center gap-1 text-slate-300 hover:text-[#70f8e8] transition-colors"
        >
          <span className="text-xs tracking-wider uppercase font-semibold">Descubrí más</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
