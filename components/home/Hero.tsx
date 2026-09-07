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
    const updateClock = () => {
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

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-[96vh] lg:min-h-[98vh] flex items-center justify-center overflow-hidden -mt-20 pt-28 pb-space-4xl"
    >
      {/* Live YouTube Background Video Backdrop (Starts at 0:40 to avoid big intro text slides) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#121314] pointer-events-none">
        {/* YouTube Video Wrapper centered and scaled for full cover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] opacity-60 scale-110">
          <iframe
            src="https://www.youtube.com/embed/-3c7nv9c2xc?autoplay=1&mute=1&controls=0&loop=1&playlist=-3c7nv9c2xc&start=40&end=85&playsinline=1&enablejsapi=1&rel=0&modestbranding=1"
            title="ExpoJuy Background Video"
            className="w-full h-full border-0 pointer-events-none object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Dark Gradient Scrim Overlay for Maximum Contrast & Vibrancy */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1923]/85 via-[#7B2D8E]/55 to-[#1a2332]/95 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(31,184,168,0.22),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,rgba(123,45,142,0.28),transparent_55%)]" />
      </div>

      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-gutter-mobile lg:px-gutter-desktop flex flex-col items-center text-center">
        {/* Date & Venue Pill Badge (Subtle & Compact) */}
        <div className="inline-flex items-center bg-surface-container-lowest/20 backdrop-blur-md px-4 py-1 rounded-full border border-white/10 shadow-md mb-space-md">
          <span className="text-xs uppercase tracking-widest text-primary-fixed font-semibold">
            10 al 19 de Octubre 2026 • Ciudad Cultural, Jujuy
          </span>
        </div>

        {/* Main Logo / Monogram Graphic */}
        <div className="mb-space-md flex items-center justify-center">
          <div className="relative h-24 sm:h-28 md:h-32 w-32 sm:w-40 md:w-48">
            <Image
              src="/images/brand/expojuy26_isologotipo.png"
              alt="ExpoJuy 2026 Isologotipo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Primary Title & Subtitle */}
        <h1 className="font-display-hero text-display-hero-mobile lg:text-display-hero text-on-primary tracking-tight max-w-4xl font-extrabold">
          Conectando Países,{" "}
          <span className="bg-gradient-to-r from-primary-container via-primary-fixed to-secondary-container bg-clip-text text-transparent">
            Creando Oportunidades
          </span>
        </h1>
        <p className="mt-space-md max-w-3xl font-body-lg text-body-lg text-surface-variant leading-relaxed">
          La feria de producción, tecnología, innovación y comercio exterior más trascendente del Norte Argentino. El epicentro estratégico para el NOA, ZICOSUR y el Corredor Bioceánico.
        </p>

        {/* Countdown Timer */}
        <div className="mt-space-2xl grid grid-cols-4 gap-space-xs sm:gap-space-md w-full max-w-xl">
          <div className="bg-surface-container-lowest/15 backdrop-blur-xl p-space-sm sm:p-space-md rounded-xl text-center shadow-lg">
            <span className="block font-headline-xl text-headline-xl text-primary-fixed leading-none font-bold">
              {timeLeft.days}
            </span>
            <span className="font-label-sm text-label-sm uppercase text-surface-variant tracking-wider mt-1 block">
              Días
            </span>
          </div>
          <div className="bg-surface-container-lowest/15 backdrop-blur-xl p-space-sm sm:p-space-md rounded-xl text-center shadow-lg">
            <span className="block font-headline-xl text-headline-xl text-primary-fixed-dim leading-none font-bold">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="font-label-sm text-label-sm uppercase text-surface-variant tracking-wider mt-1 block">
              Horas
            </span>
          </div>
          <div className="bg-surface-container-lowest/15 backdrop-blur-xl p-space-sm sm:p-space-md rounded-xl text-center shadow-lg">
            <span className="block font-headline-xl text-headline-xl text-secondary-fixed leading-none font-bold">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="font-label-sm text-label-sm uppercase text-surface-variant tracking-wider mt-1 block">
              Min
            </span>
          </div>
          <div className="bg-surface-container-lowest/15 backdrop-blur-xl p-space-sm sm:p-space-md rounded-xl text-center shadow-lg">
            <span className="block font-headline-xl text-headline-xl text-secondary-fixed-dim leading-none font-bold">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="font-label-sm text-label-sm uppercase text-surface-variant tracking-wider mt-1 block">
              Seg
            </span>
          </div>
        </div>

        {/* Hero Actions Trio CTA */}
        <div className="mt-space-xl flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto">
          <a
            href="#contacto"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs rounded-full px-space-xl py-space-sm font-label-lg text-label-lg text-on-primary bg-secondary hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-[0_8px_20px_-4px_rgba(139,61,158,0.5)] font-semibold"
          >
            <Store className="w-5 h-5 shrink-0" />
            <span>Quiero ser Expositor</span>
          </a>

          <a
            href="#entradas"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs rounded-full px-space-xl py-space-sm font-label-lg text-label-lg text-on-primary bg-gradient-to-r from-primary-container via-primary to-secondary hover:opacity-95 transition-all shadow-[0_10px_24px_-4px_rgba(46,196,182,0.45)] font-semibold"
          >
            <Ticket className="w-5 h-5 shrink-0" />
            <span>Comprar Entradas</span>
          </a>
        </div>

        {/* Indicator Scroll */}
        <a
          href="#sobre-expojuy"
          className="mt-space-2xl inline-flex flex-col items-center gap-space-2xs text-surface-variant hover:text-primary-fixed transition-colors"
        >
          <span className="font-label-sm text-label-sm tracking-wider uppercase font-semibold">
            Descubrí más
          </span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
