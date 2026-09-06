"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2, Globe, Radio, Ticket } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(113,83,129,0.08)] py-3"
          : "bg-white/95 py-4 border-b border-slate-100"
      }`}
    >
      <div className="h-14 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand & Isotype */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative h-9 w-9">
            <Image
              src="/images/brand/expojuy26_isologotipo.png"
              alt="ExpoJuy 2026"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-slate-900 leading-none tracking-tight">
              EXPOJUY<span className="text-[#8b3d9e]">2026</span>
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Jujuy • Argentina
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold">
          <a
            href="#inicio"
            className="bg-[#2ec4b6] text-slate-950 px-3.5 py-1.5 rounded-full font-bold shadow-sm"
          >
            Inicio
          </a>
          <a
            href="#sobre-expojuy"
            className="text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            Sobre ExpoJuy
          </a>
          <a
            href="#expositores"
            className="text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            Expositores
          </a>
          <a
            href="#agenda"
            className="text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            Agenda
          </a>
          <a
            href="#mapa"
            className="text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            Mapa del Predio
          </a>
          <a
            href="#noticias"
            className="text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            Noticias
          </a>
          <a
            href="#sponsors"
            className="text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            Sponsors
          </a>
          <a
            href="#faq"
            className="text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            FAQ
          </a>
          <a
            href="#contacto"
            className="text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            Contacto
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-1 text-slate-400">
            <button aria-label="Compartir" className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-700 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button aria-label="Sitio web" className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-700 transition-colors">
              <Globe className="w-4 h-4" />
            </button>
            <button aria-label="Transmisión" className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-700 transition-colors">
              <Radio className="w-4 h-4" />
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200 hidden md:block" />

          <a
            href="#contacto"
            className="hidden sm:inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold text-[#8b3d9e] border border-[#8b3d9e] hover:bg-purple-50 transition-all shadow-sm"
          >
            Quiero ser Expositor
          </a>

          <a
            href="#entradas"
            className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#2ec4b6] via-[#006a62] to-[#8b3d9e] hover:opacity-95 transition-all shadow-md shadow-[#2ec4b6]/25"
          >
            <Ticket className="w-3.5 h-3.5" />
            Comprar Entradas
          </a>
        </div>
      </div>
    </header>
  );
}
