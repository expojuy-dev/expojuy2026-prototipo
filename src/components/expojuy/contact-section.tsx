"use client";

import * as React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Loader2,
  Send,
  Building2,
  Ruler,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { EVENT, SOCIALS, INQUIRY_TYPES } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { MeetingLookupCard } from "./meeting-lookup";

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
};

export function ContactSection() {
  const [inquiry, setInquiry] = React.useState<string>("general");
  const [loading, setLoading] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      inquiryType: inquiry,
      company: String(fd.get("company") ?? ""),
      industry: String(fd.get("industry") ?? ""),
      spaceSize: String(fd.get("spaceSize") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al enviar");
      toast.success("¡Consulta enviada!", {
        description: "Nuestro equipo te va a responder dentro de las próximas 24 hs hábiles.",
      });
      formRef.current?.reset();
      setInquiry("general");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos enviar tu consulta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="bg-lavender-light/60 py-20 sm:py-24" aria-label="Contacto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos de tu"
          highlight="próximo negocio"
          description="Comercial, prensa, sponsors o consultas generales: el equipo de ExpoJuy 2026 está para ayudarte."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Columna izquierda: info */}
          <ScrollReveal>
            <div className="flex h-full flex-col gap-5">
              <div className="rounded-3xl border border-lavender/50 bg-surface p-7 shadow-sm">
                <h3 className="font-display text-lg font-extrabold text-ink">
                  Secretaría Organizadora
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Cámara de Comercio Exterior de Jujuy
                </p>
                <ul className="mt-5 flex flex-col gap-4">
                  {[
                    { icon: MapPin, label: "Dirección", value: `${EVENT.address}`, href: "https://maps.google.com/?q=Ciudad+Cultural+Jujuy" },
                    { icon: Phone, label: "Teléfono / WhatsApp", value: EVENT.phone, href: "tel:+543884221000" },
                    { icon: Mail, label: "Email", value: EVENT.email, href: `mailto:${EVENT.email}` },
                    { icon: Clock, label: "Atención", value: "Lun a Vie de 9 a 18 hs" },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-turquoise-light text-turquoise-ink">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-ink transition hover:text-violet-ink"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-ink">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mapa embebido */}
              <div className="relative flex-1 overflow-hidden rounded-3xl border border-lavender/50 shadow-sm">
                <iframe
                  title="Mapa de ubicación del Predio Ferial ExpoJuy 2026 — Ciudad Cultural, San Salvador de Jujuy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-65.3340%2C-24.2100%2C-65.2740%2C-24.1600&layer=mapnik&marker=-24.1850%2C-65.3040"
                  className="h-full min-h-[280px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/70 to-transparent p-4 pt-10">
                  <p className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-deep backdrop-blur">
                    <MapPin className="h-3.5 w-3.5 text-turquoise-ink" aria-hidden="true" />
                    Predio Ferial · Ciudad Cultural
                  </p>
                </div>
              </div>

              {/* Redes */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 rounded-3xl border border-lavender/50 bg-surface p-5 shadow-sm sm:justify-start">
                <span className="mr-2 text-sm font-bold text-ink">Seguinos:</span>
                {SOCIALS.map((s) => {
                  const Icon = SOCIAL_ICONS[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-lavender/50 text-violet-ink transition hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-brand hover:text-white hover:shadow-lg"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Columna derecha: formulario */}
          <ScrollReveal delay={0.1}>
            <form
              ref={formRef}
              onSubmit={submit}
              className="flex h-full flex-col gap-4 rounded-3xl border border-lavender/50 bg-surface p-7 shadow-sm sm:p-8"
              aria-label="Formulario de contacto"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lead-name">Nombre completo *</Label>
                  <Input id="lead-name" name="name" required minLength={3} placeholder="Tu nombre" className="h-11 rounded-xl" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lead-email">Email *</Label>
                  <Input id="lead-email" name="email" type="email" required placeholder="tu@email.com" className="h-11 rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lead-phone">Teléfono</Label>
                  <Input id="lead-phone" name="phone" type="tel" placeholder="+54 388 ..." className="h-11 rounded-xl" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lead-type">Tipo de consulta *</Label>
                  <Select value={inquiry} onValueChange={setInquiry} required>
                    <SelectTrigger id="lead-type" className="h-11 w-full rounded-xl data-[placeholder]:text-muted-foreground">
                      <SelectValue placeholder="Seleccioná una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      {INQUIRY_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Campos condicionales expositor */}
              {inquiry === "expositor" ? (
                <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-violet-brand/40 bg-violet-brand/5 p-4">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-ink">
                    <Building2 className="h-4 w-4" aria-hidden="true" />
                    Datos para cotización de stand
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="lead-company">Empresa *</Label>
                      <Input id="lead-company" name="company" required placeholder="Razón social" className="h-11 rounded-xl" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="lead-industry">Rubro *</Label>
                      <Input id="lead-industry" name="industry" required placeholder="Ej: Agroindustria" className="h-11 rounded-xl" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lead-space" className="flex items-center gap-1.5">
                      <Ruler className="h-3.5 w-3.5" aria-hidden="true" />
                      Tamaño de espacio requerido *
                    </Label>
                    <Select name="spaceSize" required defaultValue="9-18 m²">
                      <SelectTrigger className="h-11 w-full rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9-18 m²">Island 9 a 18 m² (2x módulos)</SelectItem>
                        <SelectItem value="18-36 m²">18 a 36 m² (4 módulos)</SelectItem>
                        <SelectItem value="36-72 m²">36 a 72 m² (grandes superficies)</SelectItem>
                        <SelectItem value="+72 m²">Más de 72 m² (pabellón propio)</SelectItem>
                        <SelectItem value="a definir">Aún no lo definí</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : null}

              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor="lead-message">Mensaje *</Label>
                <Textarea
                  id="lead-message"
                  name="message"
                  required
                  minLength={10}
                  rows={5}
                  placeholder="Contanos en qué podemos ayudarte..."
                  className="flex-1 resize-none rounded-xl"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-brand h-13 rounded-full text-base font-bold text-white shadow-lg shadow-turquoise/25 transition hover:shadow-xl hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                    Enviar consulta
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Al enviar aceptás nuestra política de privacidad. No compartimos tus datos con terceros.
              </p>
            </form>
          </ScrollReveal>
        </div>

        {/* Consulta de estado de solicitud de reunión B2B */}
        <ScrollReveal delay={0.05}>
          <div className="mt-6">
            <MeetingLookupCard />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
