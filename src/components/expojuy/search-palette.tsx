"use client";

import * as React from "react";
import {
  Search,
  Building2,
  CalendarDays,
  Ticket,
  Store,
  MapPin,
  Newspaper,
  Home,
  Info,
  Bot,
  HelpCircle,
  Images,
  Handshake,
  Megaphone,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { EXHIBITORS, AGENDA, FAQS, NEWS } from "@/lib/data";

/**
 * Buscador global del sitio (Ctrl/Cmd + K).
 * Navega a secciones, abre el perfil de un expositor, lanza el asistente IA
 * o despliega una pregunta frecuente específica.
 * Comunicación cross-componente vía CustomEvents (expojuy:open-*).
 */

export type PaletteTriggerProps = {
  onOpen: () => void;
  className?: string;
};

/** Dispara la apertura del palette desde cualquier parte de la app. */
export function openSearchPalette() {
  window.dispatchEvent(new CustomEvent("expojuy:open-search"));
}

export function SearchPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("expojuy:open-search", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("expojuy:open-search", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const openExhibitor = (id: string) => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("expojuy:open-exhibitor", { detail: { id } }));
  };

  const openFaq = (index: number) => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("expojuy:open-faq", { detail: { index } }));
  };

  const openChat = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("expojuy:open-chat"));
  };

  const openNews = (id: string) => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("expojuy:open-news", { detail: { id } }));
  };

  const run = (fn: () => void) => () => fn();

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Buscador de ExpoJuy"
      description="Buscá secciones, expositores, actividades y preguntas frecuentes"
      className="max-w-xl rounded-3xl [&_[cmdk-group-heading]]:text-[11px]"
    >
      {/* Encabezado con marca */}
      <div className="flex items-center gap-2 border-b border-lavender/40 bg-gradient-to-r from-lavender-light/60 to-turquoise-light/50 px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-md">
          <Search className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-sm font-extrabold leading-tight text-ink">
            Buscador de ExpoJuy
          </p>
          <p className="text-[11px] text-muted-foreground">
            Secciones, expositores, agenda y respuestas rápidas
          </p>
        </div>
        <kbd className="ml-auto mr-6 hidden rounded-md border border-lavender/50 bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold text-violet-dark sm:block">
          ESC para cerrar
        </kbd>
      </div>

      <CommandInput placeholder="Buscá expositores, secciones, actividades, preguntas…" />

      <CommandList className="max-h-[380px] custom-scrollbar">
        <CommandEmpty>No encontramos resultados. Probá con otra palabra.</CommandEmpty>

        <CommandGroup heading="Acciones rápidas">
          <CommandItem onSelect={run(() => goTo("entradas"))} className="gap-2.5 rounded-xl">
            <Ticket className="h-4 w-4 text-turquoise-ink" aria-hidden="true" />
            Comprar entradas
            <CommandShortcut>Entradas</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={run(() => goTo("contacto"))} className="gap-2.5 rounded-xl">
            <Store className="h-4 w-4 text-violet-ink" aria-hidden="true" />
            Quiero ser expositor
            <CommandShortcut>Contacto</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={run(openChat)} className="gap-2.5 rounded-xl">
            <Bot className="h-4 w-4 text-blue-bright" aria-hidden="true" />
            Hablar con Juy, el asistente IA
            <CommandShortcut>IA</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Secciones del sitio">
          <CommandItem onSelect={run(() => goTo("inicio"))} className="gap-2.5 rounded-xl">
            <Home className="h-4 w-4 text-lavender" aria-hidden="true" /> Inicio
          </CommandItem>
          <CommandItem onSelect={run(() => goTo("sobre"))} className="gap-2.5 rounded-xl">
            <Info className="h-4 w-4 text-lavender" aria-hidden="true" /> Sobre ExpoJuy
          </CommandItem>
          <CommandItem onSelect={run(() => goTo("expositores"))} className="gap-2.5 rounded-xl">
            <Building2 className="h-4 w-4 text-lavender" aria-hidden="true" /> Directorio de
            expositores
          </CommandItem>
          <CommandItem onSelect={run(() => goTo("agenda"))} className="gap-2.5 rounded-xl">
            <CalendarDays className="h-4 w-4 text-lavender" aria-hidden="true" /> Agenda de
            actividades
          </CommandItem>
          <CommandItem onSelect={run(() => goTo("mapa"))} className="gap-2.5 rounded-xl">
            <MapPin className="h-4 w-4 text-lavender" aria-hidden="true" /> Mapa del predio
          </CommandItem>
          <CommandItem onSelect={run(() => goTo("noticias"))} className="gap-2.5 rounded-xl">
            <Newspaper className="h-4 w-4 text-lavender" aria-hidden="true" /> Noticias
          </CommandItem>
          <CommandItem onSelect={run(() => goTo("redes"))} className="gap-2.5 rounded-xl">
            <Images className="h-4 w-4 text-lavender" aria-hidden="true" /> Redes sociales
          </CommandItem>
          <CommandItem onSelect={run(() => goTo("sponsors"))} className="gap-2.5 rounded-xl">
            <Handshake className="h-4 w-4 text-lavender" aria-hidden="true" /> Sponsors y aliados
          </CommandItem>
          <CommandItem onSelect={run(() => goTo("testimonios"))} className="gap-2.5 rounded-xl">
            <Megaphone className="h-4 w-4 text-lavender" aria-hidden="true" /> Testimonios
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading={`Expositores (${EXHIBITORS.length})`}>
          {EXHIBITORS.map((ex) => (
            <CommandItem
              key={ex.id}
              value={`${ex.name} ${ex.category} ${ex.stand}`}
              onSelect={run(() => openExhibitor(ex.id))}
              className="gap-2.5 rounded-xl"
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[9px] font-black text-white ${ex.gradient}`}
                aria-hidden="true"
              >
                {ex.initials}
              </span>
              <span className="truncate">
                {ex.name}
                <span className="ml-1.5 text-xs text-muted-foreground">{ex.category}</span>
              </span>
              <CommandShortcut>{ex.stand}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Agenda por día">
          {AGENDA.map((d) => (
            <CommandItem
              key={d.date}
              value={`${d.label} ${d.activities.map((a) => a.title).join(" ")}`}
              onSelect={run(() => goTo("agenda"))}
              className="gap-2.5 rounded-xl"
            >
              <CalendarDays className="h-4 w-4 shrink-0 text-turquoise-ink" aria-hidden="true" />
              {d.label}
              <span className="truncate text-xs text-muted-foreground">
                · {d.activities[0]?.title ?? "Actividades"}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Sala de prensa">
          {NEWS.map((n) => (
            <CommandItem
              key={n.id}
              value={`noticia ${n.title} ${n.category} ${n.tags.join(" ")}`}
              onSelect={run(() => openNews(n.id))}
              className="gap-2.5 rounded-xl"
            >
              <Newspaper className="h-4 w-4 shrink-0 text-turquoise-ink" aria-hidden="true" />
              <span className="truncate">{n.title}</span>
              <CommandShortcut>{n.category}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Preguntas frecuentes">
          {FAQS.map((f, i) => (
            <CommandItem
              key={f.q}
              value={f.q}
              onSelect={run(() => openFaq(i))}
              className="gap-2.5 rounded-xl"
            >
              <HelpCircle className="h-4 w-4 text-violet-ink" aria-hidden="true" />
              <span className="truncate">{f.q}</span>
              <ArrowRight className="ml-auto h-3.5 w-3.5 text-lavender" aria-hidden="true" />
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />
        <div className="flex items-center justify-center gap-1.5 py-2.5 text-[10px] text-muted-foreground">
          <CornerDownLeft className="h-3 w-3" aria-hidden="true" />
          Enter para ir · Esc para cerrar
        </div>
      </CommandList>
    </CommandDialog>
  );
}
