"use client";

import * as React from "react";
import { useInView } from "framer-motion";

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1800,
  delay = 0,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let raf: number;
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        if (value <= 10) {
          // Para valores pequeños (como 4), distribuimos los números a lo largo del tiempo
          // para que el último número caiga exactamente al finalizar la duración
          const currentVal = Math.min(Math.floor(progress * (value + 1)), value);
          setDisplay(currentVal);
        } else {
          // easeOutCubic para números grandes
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
        }
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [inView, value, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("es-AR")}
      {suffix}
    </span>
  );
}
