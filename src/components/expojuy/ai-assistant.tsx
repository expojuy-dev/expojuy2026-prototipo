"use client";

import * as React from "react";
import { Bot, X, SendHorizonal, Loader2, Sparkles, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_QUESTIONS = [
  "¿Cómo llego al predio?",
  "¿Dónde está el stand de Litica Andes?",
  "¿Cuándo es la próxima charla?",
  "¿Cuánto cuestan las entradas?",
];

const WELCOME: Msg = {
  role: "assistant",
  content:
    "¡Hola! 👋 Soy Juy, el asistente virtual de ExpoJuy 2026. Preguntame sobre el evento: horarios, expositores, entradas, cómo llegar, agenda y más.",
};

export function AiAssistant() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Msg[]>([WELCOME]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [unread, setUnread] = React.useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // El buscador global (Ctrl+K) puede abrir el chat directamente
  React.useEffect(() => {
    const onOpenChat = () => {
      setOpen(true);
      setUnread(false);
    };
    window.addEventListener("expojuy:open-chat", onOpenChat);
    return () => window.removeEventListener("expojuy:open-chat", onOpenChat);
  }, []);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error del asistente");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "Uy, tuve un problema de conexión. 🛠️ Probá de nuevo en unos segundos.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => {
          setOpen((o) => !o);
          setUnread(false);
        }}
        aria-label={open ? "Cerrar asistente virtual" : "Abrir asistente virtual Juy"}
        aria-expanded={open}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 sm:bottom-6 sm:right-6",
          open
            ? "bg-deep text-white rotate-0"
            : "bg-gradient-brand text-white animate-pulse-ring"
        )}
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Bot className="h-7 w-7" aria-hidden="true" />}
        {!open && unread ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lavender opacity-75" />
            <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-violet-brand text-[9px] font-bold text-white">
              1
            </span>
          </span>
        ) : null}
      </button>

      {/* Panel */}
      <div
        className={cn(
          "fixed bottom-[88px] right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-3xl border border-lavender/50 bg-surface shadow-2xl shadow-deep/30 transition-all duration-300 sm:right-6 sm:bottom-24",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        )}
        role="dialog"
        aria-label="Asistente virtual Juy"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="bg-gradient-brand relative flex items-center gap-3 p-4 text-white">
          <span className="glass flex h-10 w-10 items-center justify-center rounded-full">
            <Bot className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">Juy · Asistente ExpoJuy</p>
            <p className="flex items-center gap-1.5 text-[11px] text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
              En línea · responde al instante
            </p>
          </div>
          <button
            onClick={() => setMessages([WELCOME])}
            aria-label="Reiniciar conversación"
            className="rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Mensajes */}
        <div
          ref={scrollRef}
          className="custom-scrollbar flex h-[320px] flex-col gap-3 overflow-y-auto bg-turquoise-light/40 p-4"
          aria-live="polite"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm whitespace-pre-line",
                m.role === "user"
                  ? "self-end rounded-br-md bg-violet-brand text-white"
                  : "self-start rounded-bl-md border border-lavender/40 bg-surface text-graphite"
              )}
            >
              {m.content}
            </div>
          ))}
          {loading ? (
            <div className="flex items-center gap-2 self-start rounded-2xl rounded-bl-md border border-lavender/40 bg-surface px-4 py-3 shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-turquoise-ink" aria-hidden="true" />
              <span className="text-xs text-muted-foreground">Juy está escribiendo...</span>
            </div>
          ) : null}
        </div>

        {/* Chips */}
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-t border-lavender/30 bg-surface px-3 py-2.5">
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              disabled={loading}
              className="flex shrink-0 items-center gap-1 rounded-full border border-turquoise/40 bg-turquoise-light px-3 py-1.5 text-[11px] font-bold text-turquoise-ink transition hover:bg-turquoise hover:text-white disabled:opacity-50"
            >
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-lavender/30 bg-surface p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribí tu pregunta..."
            aria-label="Escribí tu pregunta al asistente"
            className="h-11 flex-1 rounded-full border border-lavender/50 bg-turquoise-light/40 px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-turquoise focus:bg-surface"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Enviar mensaje"
            className="bg-gradient-brand flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-md transition hover:brightness-110 disabled:opacity-50"
          >
            <SendHorizonal className="h-4.5 w-4.5" aria-hidden="true" />
          </button>
        </form>
      </div>
    </>
  );
}
