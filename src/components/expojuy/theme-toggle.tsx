"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Toggle de modo claro/oscuro. Renderiza ambos íconos con CSS para evitar
 * hydration mismatch, y aplica una transición suave de colores al cambiar.
 * variant="topbar"  → diseñado para la barra superior oscura (texto blanco).
 * variant="nav"     → para la nav principal clara (tokens que se adaptan al tema).
 */
export function ThemeToggle({
  className,
  variant = "topbar",
}: {
  className?: string;
  variant?: "topbar" | "nav";
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    setTheme(isDark ? "light" : "dark");
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      className={cn(
        "group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 hover:scale-105 active:scale-95",
        variant === "topbar"
          ? // Sobre la barra superior oscura / clara
            "h-7 w-7 border-slate-200 bg-slate-50 text-slate-500 hover:text-cyan-600 hover:border-cyan-300 dark:border-white/20 dark:bg-white/5 dark:text-white/85 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
          : // En la nav principal (fondo surface, se adapta claro/oscuro)
            "h-9 w-9 border-lavender/60 bg-turquoise-light text-violet-ink hover:border-turquoise hover:text-turquoise-ink",
        className
      )}
    >
      <Sun
        className={cn(
          "absolute h-4 w-4 rotate-0 scale-100 transition-all duration-500",
          isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-500",
          isDark ? "rotate-0 scale-100 text-turquoise" : "rotate-90 scale-0"
        )}
        aria-hidden="true"
      />
    </button>
  );
}

/** Variante para superficies claras (ej. menú mobile): mismo comportamiento, estilo adaptado al tema. */
export function ThemeToggleInline({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    setTheme(isDark ? "light" : "dark");
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
        "bg-turquoise-light text-turquoise-ink hover:bg-turquoise/15",
        className
      )}
    >
      <span className="inline-flex items-center gap-2.5">
        {isDark ? <Moon className="h-4 w-4" aria-hidden="true" /> : <Sun className="h-4 w-4" aria-hidden="true" />}
        {isDark ? "Modo oscuro activado" : "Activar modo oscuro"}
      </span>
      <span
        className={cn(
          "inline-flex h-5 w-9 items-center rounded-full p-0.5 transition-colors",
          isDark ? "bg-turquoise" : "bg-lavender"
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            "h-4 w-4 rounded-full bg-surface shadow transition-transform duration-300",
            isDark ? "translate-x-4" : "translate-x-0"
          )}
        />
      </span>
    </button>
  );
}
