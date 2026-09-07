import Image from "next/image";
import { cn } from "@/lib/utils";

export function ExpoJuyLogo({
  className,
  variant = "auto",
}: {
  className?: string;
  variant?: "dark" | "light" | "auto";
}) {
  const whiteLogo = "/images/expojuy26_horizontal-white.png";
  const darkLogo = "/images/expojuy26_horizontal-dark2.png";

  return (
    <span className={cn("inline-flex items-center select-none", className)}>
      {/* Logo White: Para modo claro según el requerimiento, o explícitamente variant light */}
      <Image
        src={whiteLogo}
        alt="Logo ExpoJuy 2026"
        width={140}
        height={60}
        className={cn(
          "w-32 h-auto object-contain transition-transform duration-300 hover:scale-105",
          variant === "light" && "block drop-shadow-[0_2px_8px_rgba(46,196,182,0.35)]",
          variant === "dark" && "hidden",
          variant === "auto" && "block dark:hidden"
        )}
        priority
      />
      {/* Logo Dark2: Para modo oscuro, o explícitamente variant dark */}
      <Image
        src={darkLogo}
        alt="Logo ExpoJuy 2026"
        width={140}
        height={60}
        className={cn(
          "w-32 h-auto object-contain transition-transform duration-300 hover:scale-105",
          variant === "dark" && "block",
          variant === "light" && "hidden",
          variant === "auto" && "hidden dark:block"
        )}
        priority
      />
    </span>
  );
}

/** Logo compacto solo el isologotipo (para favicon-style o badges) */
export function ExpoJuyIcon({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/images/expojuy-isologotipo.png"
      alt="ExpoJuy 2026"
      width={size}
      height={size}
      className={cn("object-contain drop-shadow-sm", className)}
    />
  );
}

/** Logo grande vertical con slogan (para hero / about) */
export function ExpoJuyFullLogo({
  className,
  maxWidth = 360,
}: {
  className?: string;
  maxWidth?: number;
}) {
  return (
    <Image
      src="/images/expojuy-vertical.png"
      alt="ExpoJuy 2026 — Conectando Países, Creando Oportunidades"
      width={maxWidth}
      height={Math.round(maxWidth * 0.75)}
      className={cn(
        "w-full object-contain drop-shadow-lg",
        className
      )}
      style={{ maxWidth }}
      priority
    />
  );
}

export function CamaraLogo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 bg-white shadow-sm overflow-hidden transition-transform duration-300 hover:scale-105",
          light ? "border-turquoise/60" : "border-violet-brand/30"
        )}
      >
        <Image
          src="/images/logo-camcomext.png"
          alt="Cámara de Comercio Exterior de Jujuy"
          width={48}
          height={48}
          className="h-10 w-10 object-contain"
        />
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
