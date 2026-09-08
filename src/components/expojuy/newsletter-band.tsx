"use client";

import * as React from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
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

  if (done) {
    return (
      <div className="pt-2">
        <p className="text-xs font-semibold text-slate-700 dark:text-cyan-400 mb-2 uppercase tracking-wide">Boletín de Novedades</p>
        <p className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-[11px] font-bold text-cyan-700 dark:text-cyan-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          ¡Ya estás suscripto!
        </p>
      </div>
    );
  }

  return (
    <div className="pt-2">
      <p className="text-xs font-semibold text-slate-700 dark:text-cyan-400 mb-2 uppercase tracking-wide">Boletín de Novedades</p>
      <form onSubmit={submit} className="flex items-center gap-1.5">
        <label htmlFor="newsletter-email" className="sr-only">
          Tu correo electrónico
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          className="w-full text-xs px-3 py-2 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-400 transition-colors placeholder:text-slate-400 dark:placeholder:text-white/40"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 shadow-sm transition-all disabled:opacity-60 flex items-center justify-center shrink-0 min-w-[76px]"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : "Unirme"}
        </button>
      </form>
    </div>
  );
}
