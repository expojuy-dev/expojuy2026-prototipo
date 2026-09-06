"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Ticket } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
          ? "bg-[#0b0f17]/90 backdrop-blur-xl border-b border-slate-800 shadow-[0_4px_25px_-4px_rgba(139,61,158,0.15)] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logos & Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative h-10 w-40 sm:h-11 sm:w-48 transition-transform group-hover:scale-105 duration-200">
            <Image
              src="/images/brand/expojuy26_horizontal.png"
              alt="ExpoJuy 2026"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1.5 text-xs font-semibold">
          <a
            href="#inicio"
            className="px-3.5 py-1.5 rounded-full bg-[#2ec4b6]/20 text-[#2ec4b6] font-bold transition-all"
          >
            Inicio
          </a>
          <a
            href="#sobre-expojuy"
            className="px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            Sobre ExpoJuy
          </a>
          <a
            href="#expositores"
            className="px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            Expositores
          </a>
          <a
            href="#agenda"
            className="px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            Agenda
          </a>
          <a
            href="#mapa"
            className="px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            Mapa del Predio
          </a>
          <a
            href="#noticias"
            className="px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            Noticias
          </a>
          <a
            href="#sponsors"
            className="px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            Sponsors
          </a>
          <a
            href="#entradas"
            className="px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            Entradas
          </a>
          <a
            href="#contacto"
            className="px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            Contacto
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="#contacto"
            className="text-xs font-semibold px-4 py-2.5 rounded-full border border-[#8b3d9e] text-[#ed95fd] hover:bg-[#8b3d9e]/15 transition-all shadow-[0_2px_10px_-2px_rgba(139,61,158,0.25)]"
          >
            Quiero ser Expositor
          </a>
          <a
            href="#entradas"
            className="text-xs font-bold px-4 py-2.5 rounded-full bg-gradient-to-r from-[#2ec4b6] via-[#006a62] to-[#8b3d9e] hover:opacity-95 text-white flex items-center gap-1.5 shadow-[0_6px_20px_-2px_rgba(46,196,182,0.45)] transition-all hover:scale-105"
          >
            <Ticket className="w-3.5 h-3.5" />
            Comprar Entradas
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
          className="xl:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-[#0b0f17]/98 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {[
              { label: "Inicio", href: "#inicio" },
              { label: "Sobre ExpoJuy", href: "#sobre-expojuy" },
              { label: "Expositores", href: "#expositores" },
              { label: "Agenda", href: "#agenda" },
              { label: "Mapa del Predio", href: "#mapa" },
              { label: "Noticias", href: "#noticias" },
              { label: "Sponsors", href: "#sponsors" },
              { label: "Entradas", href: "#entradas" },
              { label: "Contacto", href: "#contacto" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-[#2ec4b6] py-1.5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <a
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-xs font-semibold py-2.5 rounded-full border border-[#8b3d9e] text-[#ed95fd]"
            >
              Quiero ser Expositor
            </a>
            <a
              href="#entradas"
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-xs font-bold py-2.5 rounded-full bg-gradient-to-r from-[#2ec4b6] via-[#006a62] to-[#8b3d9e] text-white flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              Comprar Entradas
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
