import { cn } from "@/lib/utils";

export function ExpoJuyLogo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      {/* Isologotipo EJ */}
      <svg
        viewBox="0 0 64 64"
        className="h-10 w-10 shrink-0 drop-shadow-sm"
        role="img"
        aria-label="Isologotipo ExpoJuy 2026"
      >
        <defs>
          <linearGradient id="ej-g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2EC4B6" />
            <stop offset="100%" stopColor="#29ABE2" />
          </linearGradient>
          <linearGradient id="ej-g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C4A1D4" />
            <stop offset="100%" stopColor="#7B2D8E" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="#2A1745" />
        <path d="M14 18h16v6H21v5h8v6h-8v5h9v6H14z" fill="url(#ej-g1)" />
        <path
          d="M34 18h7l6 10 6-10h7L49 32l11 14h-7l-6-9.5L41 46h-7l11-14z"
          fill="url(#ej-g2)"
        />
        <rect x="10" y="52" width="44" height="4" rx="2" fill="#2EC4B6" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-extrabold tracking-tight",
            variant === "dark" ? "text-ink" : "text-white"
          )}
        >
          Expo<span className="text-gradient">Juy</span>{" "}
          <span className="text-turquoise">2026</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[9px] font-semibold uppercase tracking-[0.18em]",
            variant === "dark" ? "text-violet-ink/70" : "text-lavender"
          )}
        >
          Conectando Países
        </span>
      </span>
    </span>
  );
}

export function CamaraLogo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 bg-[#ffffff] shadow-sm",
          light ? "border-turquoise/60" : "border-violet-brand/30"
        )}
      >
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <circle cx="20" cy="20" r="17" fill="none" stroke="#7B2D8E" strokeWidth="2" strokeDasharray="4 3" />
          <path
            d="M11 24l5-5 4 3 8-8"
            fill="none"
            stroke="#2EC4B6"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="14" r="2.4" fill="#C4A1D4" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className={cn("font-display text-sm font-bold", light ? "text-white" : "text-ink")}>
          Cámara de Comercio
        </span>
        <span className="font-display text-sm font-bold text-turquoise">Exterior de Jujuy</span>
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-widest",
            light ? "text-white/60" : "text-muted-foreground"
          )}
        >
          Organizador oficial
        </span>
      </span>
    </span>
  );
}
