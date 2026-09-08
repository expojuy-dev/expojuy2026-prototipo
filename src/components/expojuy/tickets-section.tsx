"use client";

import * as React from "react";
import { Ticket, Mic, Briefcase, Check, QrCode, Loader2, Download, Copy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { TICKET_TYPES } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { ScrollReveal, StaggerContainer, staggerItem } from "./scroll-reveal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  ticket: Ticket,
  microphone: Mic,
  briefcase: Briefcase,
};

const CARD_STYLES: Record<string, string> = {
  visitante: "hover:border-turquoise/70",
  prensa: "hover:border-lavender/80",
  b2b: "hover:border-violet-brand/70",
};

type PurchaseResult = {
  code: string;
  qrDataUrl: string;
  type: string;
  holder: string;
  price: number;
};

type LookupResult = PurchaseResult & { used: boolean; days: string };

const TYPE_LABELS: Record<string, string> = {
  visitante: "Entrada General Visitante",
  prensa: "Acreditación de Prensa y Medios",
  b2b: "Acreditación Empresarial · Ronda B2B",
};

export function TicketsSection() {
  const [openType, setOpenType] = React.useState<string | null>(null);
  const [holder, setHolder] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [days, setDays] = React.useState("1");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<PurchaseResult | null>(null);

  // Consulta "Mi entrada" por código
  const [lookupOpen, setLookupOpen] = React.useState(false);
  const [lookupCode, setLookupCode] = React.useState("");
  const [lookupLoading, setLookupLoading] = React.useState(false);
  const [lookupResult, setLookupResult] = React.useState<LookupResult | null>(null);
  const [lookupError, setLookupError] = React.useState("");

  const typeInfo = TICKET_TYPES.find((t) => t.type === openType);

  const openDialog = (type: string) => {
    setOpenType(type);
    setResult(null);
    setHolder("");
    setEmail("");
    setDays("1");
  };

  const price = React.useMemo(() => {
    if (!typeInfo) return 0;
    if (typeInfo.price === 0) return 0;
    return typeInfo.price * parseInt(days, 10);
  }, [typeInfo, days]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!openType) return;
    setLoading(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: openType, holder, email, days }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al procesar");
      setResult(data as PurchaseResult);
      toast.success("¡Entrada emitida con éxito! Escaneá el QR en el predio.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ocurrió un error. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const lookupTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = lookupCode.trim().toUpperCase();
    if (!code) return;
    setLookupLoading(true);
    setLookupError("");
    try {
      const res = await fetch(`/api/tickets?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No pudimos encontrar tu entrada");
      setLookupResult(data as LookupResult);
    } catch (err) {
      setLookupResult(null);
      setLookupError(err instanceof Error ? err.message : "Ocurrió un error. Intentá de nuevo.");
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <section
      id="entradas"
      className="relative overflow-hidden bg-gradient-to-b from-background via-lavender-light/70 to-background py-20 sm:py-24"
      aria-label="Entradas y acreditaciones"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-turquoise/10 blur-[100px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Entradas & Acreditaciones"
          title="Conseguí tu acceso a"
          highlight="ExpoJuy 2026"
          description="Entradas digitales con código QR para acceso rápido al predio. Recibís la tuya por email al instante."
        />

        <StaggerContainer className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3" stagger={0.1}>
          {TICKET_TYPES.map((t) => {
            const Icon = ICONS[t.icon] ?? Ticket;
            const isFree = t.price === 0;
            return (
              <motion.div key={t.type} variants={staggerItem} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col rounded-3xl border-2 border-lavender/50 bg-surface p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
                    CARD_STYLES[t.type],
                    t.type === "b2b" && "gradient-ring shadow-violet-brand/10"
                  )}
                >
                  {t.type === "b2b" ? (
                    <Badge className="bg-gradient-brand absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border-0 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                      ★ Recomendada para empresas
                    </Badge>
                  ) : null}

                  <span
                    className={cn(
                      "inline-flex h-13 w-13 items-center justify-center rounded-2xl p-3 transition-transform duration-300 group-hover:scale-110",
                      t.type === "visitante" && "bg-turquoise/12 text-turquoise-ink",
                      t.type === "prensa" && "bg-lavender/25 text-violet-dark",
                      t.type === "b2b" && "bg-violet-brand/12 text-violet-ink"
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <h3 className="font-display mt-4 text-lg font-extrabold leading-snug text-ink">
                    {t.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{t.description}</p>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span
                      className={cn(
                        "font-display text-4xl font-black tracking-tight",
                        isFree ? "text-turquoise-ink" : "text-ink"
                      )}
                    >
                      {t.priceLabel}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">{t.per}</span>
                  </div>

                  <ul className="mt-5 flex flex-col gap-2.5">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-graphite">
                        <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-turquoise/15">
                          <Check className="h-3 w-3 text-turquoise-ink" aria-hidden="true" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => openDialog(t.type)}
                    className={cn(
                      "mt-auto w-full rounded-full py-6 text-sm font-bold shadow-lg transition-all active:scale-95",
                      t.type === "visitante" &&
                        "bg-turquoise text-white shadow-turquoise/30 hover:bg-turquoise-dark hover:shadow-turquoise/40",
                      t.type === "prensa" &&
                        "border-2 border-violet-brand bg-surface text-violet-ink shadow-violet-brand/10 hover:bg-violet-brand hover:text-white",
                      t.type === "b2b" && "bg-gradient-brand text-white shadow-violet-brand/30 hover:brightness-110"
                    )}
                    aria-label={`${t.cta} — ${t.title}`}
                  >
                    {t.cta}
                  </Button>
                </article>
              </motion.div>
            );
          })}
        </StaggerContainer>

        <ScrollReveal delay={0.15}>
          <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3">
            <p className="flex w-full items-center justify-center gap-2 rounded-2xl bg-turquoise-light px-5 py-3.5 text-center text-sm text-turquoise-ink">
              <QrCode className="h-5 w-5 shrink-0" aria-hidden="true" />
              Todas las entradas y acreditaciones incluyen un código QR digital único para un acceso rápido y sin filas al predio.
            </p>
            <button
              type="button"
              onClick={() => {
                setLookupResult(null);
                setLookupError("");
                setLookupCode("");
                setLookupOpen(true);
              }}
              className="group inline-flex items-center gap-2 rounded-full border-2 border-dashed border-violet-brand/40 px-5 py-2.5 text-sm font-bold text-violet-ink transition hover:border-violet-brand hover:bg-violet-brand/5"
            >
              <Search className="h-4 w-4 transition group-hover:scale-110" aria-hidden="true" />
              ¿Ya tenés tu entrada? Consultala o volvé a descargar tu QR
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Dialog compra/acreditación */}
      <Dialog open={!!openType} onOpenChange={(o) => !o && setOpenType(null)}>
        <DialogContent className="max-w-md rounded-3xl p-6 sm:p-8">
          {result ? (
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-turquoise/15">
                <QrCode className="h-7 w-7 text-turquoise-ink" aria-hidden="true" />
              </span>
              <DialogHeader className="items-center space-y-1.5 pt-4 text-center">
                <DialogTitle className="font-display text-xl font-extrabold text-ink">
                  ¡Listo, {result.holder.split(" ")[0]}!
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Tu {typeInfo?.title.toLowerCase()} fue emitida. Presentá este QR en el acceso del predio.
                </DialogDescription>
              </DialogHeader>
              <img
                src={result.qrDataUrl}
                alt={`Código QR de la entrada ${result.code}`}
                className="mt-5 h-52 w-52 rounded-2xl border-4 border-lavender/40 bg-surface p-2 shadow-lg"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(result.code);
                  toast.success("Código copiado al portapapeles");
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 font-mono text-sm font-bold text-ink transition hover:bg-lavender-light"
                aria-label="Copiar código de entrada"
              >
                {result.code}
                <Copy className="h-3.5 w-3.5 text-violet-ink" aria-hidden="true" />
              </button>
              <p className="mt-2 text-xs text-muted-foreground">
                También te lo enviamos a <strong>{email}</strong>
              </p>
              <Button
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = result.qrDataUrl;
                  a.download = `expojuy-2026-${result.code}.png`;
                  a.click();
                }}
                className="bg-gradient-brand mt-5 w-full rounded-full py-6 font-bold text-white"
              >
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Descargar QR
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader className="items-start space-y-1.5 text-left">
                <DialogTitle className="font-display text-lg font-extrabold text-ink">
                  {typeInfo?.title}
                </DialogTitle>
                <DialogDescription>
                  Completá tus datos para generar tu entrada digital con QR.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={submit} className="mt-5 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="ticket-holder">Nombre completo *</Label>
                  <Input
                    id="ticket-holder"
                    required
                    minLength={3}
                    value={holder}
                    onChange={(e) => setHolder(e.target.value)}
                    placeholder="Ej: María González"
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="ticket-email">Email *</Label>
                  <Input
                    id="ticket-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maria@email.com"
                    className="h-11 rounded-xl"
                  />
                </div>
                {openType === "visitante" ? (
                  <div className="flex flex-col gap-2">
                    <Label>Días de asistencia</Label>
                    <RadioGroup value={days} onValueChange={setDays} className="flex gap-2">
                      {[
                        { v: "1", l: "1 día · $5.000" },
                        { v: "3", l: "3 días · $15.000" },
                        { v: "10", l: "Abono full · $50.000" },
                      ].map((opt) => (
                        <Label
                          key={opt.v}
                          htmlFor={`days-${opt.v}`}
                          className={cn(
                            "flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 px-2 py-3 text-[11px] font-bold transition sm:text-xs",
                            days === opt.v
                              ? "border-turquoise bg-turquoise-light text-turquoise-ink"
                              : "border-lavender/50 text-muted-foreground hover:border-turquoise/50"
                          )}
                        >
                          <RadioGroupItem id={`days-${opt.v}`} value={opt.v} className="sr-only" />
                          {opt.l}
                        </Label>
                      ))}
                    </RadioGroup>
                    <p className="text-xs font-semibold text-violet-ink">
                      Total: ${price.toLocaleString("es-AR")} ARS · Se abona en puerta con este código
                    </p>
                  </div>
                ) : null}
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-brand h-12 rounded-full text-sm font-bold text-white disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      Generando QR...
                    </>
                  ) : (
                    typeInfo?.cta ?? "Confirmar"
                  )}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog consulta "Mi entrada" */}
      <Dialog
        open={lookupOpen}
        onOpenChange={(o) => {
          if (!o) {
            setLookupOpen(false);
            setLookupResult(null);
            setLookupError("");
          }
        }}
      >
        <DialogContent className="max-w-md rounded-3xl p-6 sm:p-8">
          {lookupResult ? (
            <div className="flex flex-col items-center text-center">
              <span
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full",
                  lookupResult.used ? "bg-red-100" : "bg-turquoise/15"
                )}
              >
                <QrCode
                  className={cn("h-7 w-7", lookupResult.used ? "text-red-500" : "text-turquoise-ink")}
                  aria-hidden="true"
                />
              </span>
              <DialogHeader className="items-center space-y-1.5 pt-4 text-center">
                <DialogTitle className="font-display text-xl font-extrabold text-ink">
                  ¡Ahí está, {lookupResult.holder.split(" ")[0]}!
                </DialogTitle>
                <DialogDescription className="text-sm">
                  {TYPE_LABELS[lookupResult.type] ?? lookupResult.type} · {lookupResult.days === "1" ? "1 día" : `${lookupResult.days} días`}
                </DialogDescription>
              </DialogHeader>
              <img
                src={lookupResult.qrDataUrl}
                alt={`Código QR de la entrada ${lookupResult.code}`}
                className="mt-5 h-48 w-48 rounded-2xl border-4 border-lavender/40 bg-surface p-2 shadow-lg"
              />
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(lookupResult.code);
                    toast.success("Código copiado al portapapeles");
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 font-mono text-sm font-bold text-ink transition hover:bg-lavender-light"
                  aria-label="Copiar código de entrada"
                >
                  {lookupResult.code}
                  <Copy className="h-3.5 w-3.5 text-violet-ink" aria-hidden="true" />
                </button>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full",
                    lookupResult.used
                      ? "border-red-200 bg-red-100 text-red-700"
                      : "border-turquoise/40 bg-turquoise-light text-turquoise-ink"
                  )}
                >
                  {lookupResult.used ? "Ya utilizada" : "Activa · Lista para escanear"}
                </Badge>
              </div>
              {lookupResult.used ? (
                <p className="mt-3 rounded-xl bg-red-50 px-4 py-2 text-xs text-red-700">
                  Esta entrada ya fue escaneada en el acceso. Si no fuiste vos, contactate con la organización.
                </p>
              ) : null}
              <Button
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = lookupResult.qrDataUrl;
                  a.download = `expojuy-2026-${lookupResult.code}.png`;
                  a.click();
                }}
                className="bg-gradient-brand mt-5 w-full rounded-full py-6 font-bold text-white"
              >
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Volver a descargar QR
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader className="items-start space-y-1.5 text-left">
                <DialogTitle className="font-display text-lg font-extrabold text-ink">
                  Consultar mi entrada
                </DialogTitle>
                <DialogDescription>
                  Ingresá el código que te enviamos por email (empieza con EJ26-) para ver tu QR nuevamente.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={lookupTicket} className="mt-5 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lookup-code">Código de entrada</Label>
                  <Input
                    id="lookup-code"
                    required
                    value={lookupCode}
                    onChange={(e) => setLookupCode(e.target.value.toUpperCase())}
                    placeholder="EJ26-XXXXXX"
                    className="h-11 rounded-xl text-center font-mono font-bold uppercase tracking-widest"
                    autoComplete="off"
                  />
                </div>
                {lookupError ? (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700">
                    {lookupError}
                  </p>
                ) : null}
                <Button
                  type="submit"
                  disabled={lookupLoading}
                  className="bg-gradient-brand h-12 rounded-full text-sm font-bold text-white disabled:opacity-60"
                >
                  {lookupLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      Buscando entrada...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                      Buscar mi entrada
                    </>
                  )}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
