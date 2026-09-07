"use client";

import * as React from "react";
import { BellRing, Loader2, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function NewsletterBand() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setDone(true);
      setEmail("");
      toast.success(data.message ?? "¡Suscripción confirmada!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos suscribirte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative border-b border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-8 sm:px-6 lg:flex-row">
        <div className="flex items-center gap-3.5 text-center lg:text-left">
          <span className="glass hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-turquoise sm:flex">
            <BellRing className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-base font-extrabold sm:text-lg">
              Enterate de todo antes que nadie
            </h2>
            <p className="text-sm text-white/65">
              Novedades, descargas de entradas y anuncios de disertantes directo a tu email.
            </p>
          </div>
        </div>
        {done ? (
          <p className="inline-flex items-center gap-2 rounded-full border border-turquoise/40 bg-turquoise/15 px-5 py-3 text-sm font-bold text-turquoise">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            ¡Listo! Ya estás suscripto a las novedades de ExpoJuy 2026.
          </p>
        ) : (
          <form
            onSubmit={submit}
            className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/8 p-1.5 backdrop-blur"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Tu email para recibir novedades
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="h-10 min-w-0 flex-1 rounded-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/45"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-brand inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Suscribirme</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
