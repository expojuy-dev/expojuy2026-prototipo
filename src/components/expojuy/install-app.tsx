"use client";

import * as React from "react";
import { Smartphone, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/**
 * Botón "Instalar app" (PWA). Registra el service worker /sw.js y escucha
 * beforeinstallprompt; si el navegador no lo soporta (ej. iOS Safari) o la app
 * ya está instalada, no renderiza nada.
 */
export function InstallAppButton({ className }: { className?: string }) {
  const [deferred, setDeferred] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [prompting, setPrompting] = React.useState(false);
  const swRegistered = React.useRef(false);

  React.useEffect(() => {
    // Registro del service worker (una sola vez por sesión de página)
    if (
      !swRegistered.current &&
      typeof window !== "undefined" &&
      "serviceWorker" in navigator
    ) {
      swRegistered.current = true;
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* silencioso: la instalación es un extra, no un requisito */
      });
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setDeferred(null);
      toast.success("¡ExpoJuy 2026 instalada! La encontrás en tu pantalla de inicio.");
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!deferred) return null;

  const install = async () => {
    if (!deferred) return;
    setPrompting(true);
    try {
      await deferred.prompt();
      const { outcome } = await deferred.userChoice;
      if (outcome === "accepted") {
        toast.success("Instalando ExpoJuy 2026…");
      } else {
        toast.info("Podés instalarla cuando quieras desde este botón.");
      }
      setDeferred(null);
    } catch {
      toast.error("No se pudo iniciar la instalación");
    } finally {
      setPrompting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={install}
      disabled={prompting}
      className={cn(
        "group inline-flex cursor-pointer items-center gap-2 text-sm text-white/70 transition hover:text-turquoise disabled:opacity-60",
        className
      )}
      aria-label="Instalar la app de ExpoJuy 2026 en tu dispositivo"
    >
      <span
        className="h-1 w-1 rounded-full bg-lavender transition-all group-hover:w-3 group-hover:bg-turquoise"
        aria-hidden="true"
      />
      {prompting ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
      ) : (
        <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      Instalar app
    </button>
  );
}

/**
 * Variante compacta para el menú mobile (Sheet): si hay prompt disponible
 * muestra una fila con ícono y descripción; si no, nada.
 */
export function InstallAppSheetItem({ onNavigate }: { onNavigate?: () => void }) {
  const [deferred, setDeferred] = React.useState<BeforeInstallPromptEvent | null>(null);

  React.useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setDeferred(null);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!deferred) return null;

  const install = async () => {
    if (!deferred) return;
    try {
      await deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
    } catch {
      /* noop */
    } finally {
      onNavigate?.();
    }
  };

  return (
    <button
      type="button"
      onClick={install}
      className="flex w-full items-center gap-3 rounded-xl bg-turquoise-light px-4 py-3 text-left text-sm font-semibold text-turquoise-ink transition hover:bg-turquoise/15"
      aria-label="Instalar la app de ExpoJuy 2026"
    >
      <Smartphone className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>
        Instalar app
        <span className="block text-xs font-normal text-muted-foreground">
          Accedé a la feria desde tu pantalla de inicio
        </span>
      </span>
    </button>
  );
}
