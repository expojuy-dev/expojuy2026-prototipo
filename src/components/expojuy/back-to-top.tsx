"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Botón flotante "volver arriba" con anillo de progreso de scroll.
 * Aparece luego de superar el pliegue de la pantalla; se ubica a la
 * izquierda del asistente IA para no chocar con su FAB ni su panel.
 */
export function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      setVisible(window.scrollY > 640);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circumference = 2 * Math.PI * 20;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
          className={cn(
            "fixed bottom-[4.4rem] right-[4.6rem] z-50 flex h-11 w-11 items-center justify-center rounded-full",
            "border border-lavender/50 bg-surface/95 shadow-lg shadow-deep/15 backdrop-blur transition-colors",
            "hover:border-turquoise/60 hover:bg-turquoise-light sm:bottom-[4.6rem] sm:right-[5.4rem]"
          )}
        >
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 44 44"
            aria-hidden="true"
          >
            <circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              strokeWidth="2.5"
              className="stroke-lavender/30"
            />
            <circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              className="stroke-turquoise-dark transition-[stroke-dashoffset] duration-150"
            />
          </svg>
          <ArrowUp className="h-4.5 w-4.5 text-violet-ink" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
