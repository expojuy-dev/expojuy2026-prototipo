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
    // 10 al 19 de Octubre 2026 en Ciudad Cultural, Jujuy
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
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#0b0f17]"
    >
      {/* Luces y ambientación volumétrica turquesa & violeta de Stitch */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f17]/90 via-[#7B2D8E]/30 to-[#0b0f17]/95" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#2ec4b6]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#8b3d9e]/25 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,196,182,0.15),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Date & Venue Pill Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full shadow-lg mb-6 border border-white/10">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ec4b6] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2ec4b6]" />
          </span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#70f8e8]">
            10 al 19 de Octubre 2026 • Ciudad Cultural, Jujuy
          </span>
        </div>

        {/* Isologotipo Oficial */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-4 transition-transform hover:scale-105 duration-300">
          <Image
            src="/images/brand/expojuy26_isologotipo.png"
            alt="ExpoJuy 2026 Isologotipo"
            fill
            className="object-contain drop-shadow-[0_0_35px_rgba(46,196,182,0.45)]"
            priority
          />
        </div>

        {/* Título y Bajada */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-5xl leading-[1.1]">
          Conectando Países,{" "}
          <span className="bg-gradient-to-r from-[#2ec4b6] via-[#70f8e8] to-[#ed95fd] bg-clip-text text-transparent">
            Creando Oportunidades
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed font-light">
          La feria de producción, tecnología, innovación y comercio exterior más trascendente del Norte Argentino. El epicentro estratégico para el NOA, ZICOSUR y el Corredor Bioceánico.
        </p>

        {/* Countdown Timer */}
        <div className="mt-10 grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-lg">
          <div className="bg-slate-900/80 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-slate-800 text-center shadow-lg">
            <span className="block text-2xl sm:text-4xl font-extrabold text-[#70f8e8] font-mono leading-none">
              {timeLeft.days}
            </span>
            <span className="text-[10px] sm:text-xs uppercase text-slate-400 tracking-wider mt-1.5 block font-semibold">
              Días
            </span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-slate-800 text-center shadow-lg">
            <span className="block text-2xl sm:text-4xl font-extrabold text-[#4fdbcc] font-mono leading-none">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs uppercase text-slate-400 tracking-wider mt-1.5 block font-semibold">
              Horas
            </span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-slate-800 text-center shadow-lg">
            <span className="block text-2xl sm:text-4xl font-extrabold text-[#fdd6ff] font-mono leading-none">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs uppercase text-slate-400 tracking-wider mt-1.5 block font-semibold">
              Min
            </span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-slate-800 text-center shadow-lg">
            <span className="block text-2xl sm:text-4xl font-extrabold text-[#ed95fd] font-mono leading-none">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs uppercase text-slate-400 tracking-wider mt-1.5 block font-semibold">
              Seg
            </span>
          </div>
        </div>

        {/* Acciones Hero Dual CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#contacto"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white bg-[#8b3d9e] hover:bg-[#ed95fd] hover:text-[#712284] transition-all shadow-[0_8px_24px_-4px_rgba(139,61,158,0.6)]"
          >
            <Store className="w-4 h-4" />
            Quiero ser Expositor
          </a>
          <a
            href="#entradas"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#2ec4b6] via-[#006a62] to-[#8b3d9e] hover:opacity-95 transition-all shadow-[0_10px_26px_-4px_rgba(46,196,182,0.45)]"
          >
            <Ticket className="w-4 h-4" />
            Comprar Entradas
          </a>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#sobre-expojuy"
          className="mt-12 inline-flex flex-col items-center gap-1 text-slate-400 hover:text-[#70f8e8] transition-colors"
        >
          <span className="text-[11px] tracking-widest uppercase font-semibold">Descubrí más</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
