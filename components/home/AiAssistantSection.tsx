"use client";

import { useState } from "react";
import { Sparkles, Send, Bot, User, HelpCircle, Loader2 } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  text: string;
}

const PRESET_QUERIES = [
  "¿Dónde están los stands de minería y litio?",
  "¿Cómo me anoto en las rondas de negocios?",
  "¿Cuáles son los horarios y días del evento?",
  "¿Qué accesibilidad tiene el predio para movilidad reducida?",
];

export function AiAssistantSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "¡Hola! Soy JuyBot, el Asistente Inteligente de ExpoJuy 2026. Estoy aquí para orientarte sobre la agenda de conferencias, ubicación de expositores, acreditaciones y pabellones. ¿En qué te puedo ayudar hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "Con gusto. En ExpoJuy 2026 disponemos de acreditaciones online y presenciales en Ciudad Cultural. Te invitamos a recorrer el Pabellón correspondiente o consultar en Informes de la Cámara de Comercio Exterior.";

      const lower = textToSend.toLowerCase();
      if (lower.includes("litio") || lower.includes("mineria") || lower.includes("minería")) {
        botReply = "Los principales referentes de Minería y Litio Sustentable se encuentran concentrados en el Pabellón A (Internacional) y en las conferencias del Auditorio Central sobre el futuro del Triángulo del Litio.";
      } else if (lower.includes("negocio") || lower.includes("ronda") || lower.includes("b2b")) {
        botReply = "Las Rondas de Negocios B2B del Corredor Bioceánico se realizarán en la Sala Internacional con coordinación directa de la Cámara de Comercio Exterior de Jujuy. Podés solicitar acreditación empresarial en la sección de Contacto.";
      } else if (lower.includes("horario") || lower.includes("fecha") || lower.includes("dias") || lower.includes("días")) {
        botReply = "ExpoJuy 2026 tendrá lugar del 9 al 18 de Octubre de 2026 en la Ciudad Cultural de San Salvador de Jujuy, abierto diariamente de 10:00 a 22:00 hs.";
      } else if (lower.includes("accesibilidad") || lower.includes("silla") || lower.includes("reducida") || lower.includes("rampa")) {
        botReply = "El predio Ciudad Cultural cuenta con total accesibilidad: rampas homologadas en todos los pabellones, sanitarios adaptados, señalética podotáctil e intérpretes de LSA en los paneles magistrales.";
      } else if (lower.includes("entrada") || lower.includes("ticket") || lower.includes("precio") || lower.includes("costo")) {
        botReply = "Las entradas pueden comprarse anticipadas con descuento y código QR rápido desde este portal, o en las boleterías del predio durante los días del evento.";
      }

      setMessages((prev) => [...prev, { role: "assistant", text: botReply }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <section id="asistente-ia" className="py-24 relative bg-slate-900/40 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Innovación en Experiencia de Usuario
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Asistente Virtual ExpoJuy (AI)
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Consultá en lenguaje natural sobre conferencias, stands, accesibilidad y actividades del evento.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
          {/* Header del Chatbot */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
                <Bot className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  JuyBot • Asistente Inteligente
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-xs text-slate-400">Entrenado con la guía técnica oficial de ExpoJuy 2026</p>
              </div>
            </div>
            <span className="text-[11px] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-full hidden sm:inline-block">
              IA Interactiva
            </span>
          </div>

          {/* Área de Mensajes */}
          <div className="h-80 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin scrollbar-thumb-slate-800">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-cyan-400">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-cyan-500 text-slate-950 font-medium rounded-tr-none shadow-md"
                      : "bg-slate-950/80 text-slate-200 border border-slate-800 rounded-tl-none font-light"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center shrink-0 text-slate-950">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center text-slate-400 text-xs">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>JuyBot está consultando la guía...</span>
                </div>
              </div>
            )}
          </div>

          {/* Consultas Sugeridas Rápidas */}
          <div className="mb-4">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-cyan-400" />
              Consultas Frecuentes Sugeridas:
            </p>
            <div className="flex flex-wrap gap-2">
              {PRESET_QUERIES.map((query, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(query)}
                  className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 px-3 py-1.5 rounded-full transition-all text-left"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          {/* Formulario de Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Preguntale a JuyBot sobre actividades, stands, accesibilidad..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Enviar mensaje"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-bold transition-all flex items-center justify-center shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
