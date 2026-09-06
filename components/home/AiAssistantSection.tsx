"use client";

import { useState } from "react";
import { Bot, X, Send, Sparkles, User, HelpCircle } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  text: string;
}

const PRESET_QUERIES = [
  "¿Dónde están los stands de minería y litio?",
  "¿Cómo me anoto en las rondas de negocios?",
  "¿Cuáles son los horarios y días del evento?",
  "¿Dónde comprar entradas?",
];

export function AiAssistantSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "¡Hola! Soy JuyBot, el Asistente Virtual IA de ExpoJuy 2026. ¿En qué puedo ayudarte hoy con la feria, expositores o acreditaciones?",
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
      let botReply =
        "Con gusto. En ExpoJuy 2026 disponemos de acreditaciones online y presenciales en Ciudad Cultural. Te invitamos a recorrer el Pabellón correspondiente o consultar en Informes.";

      const lower = textToSend.toLowerCase();
      if (lower.includes("litio") || lower.includes("mineria") || lower.includes("minería")) {
        botReply =
          "Los principales referentes de Minería y Litio Sustentable se encuentran concentrados en el Pabellón A (Internacional & Minería) y en las conferencias del Auditorio Central.";
      } else if (lower.includes("negocio") || lower.includes("ronda") || lower.includes("b2b")) {
        botReply =
          "Las Rondas de Negocios B2B se realizarán en la Sala B2B con coordinación de la Cámara de Comercio Exterior de Jujuy. Podés solicitar tu acreditación en el apartado de Contacto.";
      } else if (lower.includes("horario") || lower.includes("fecha") || lower.includes("dias") || lower.includes("días")) {
        botReply =
          "ExpoJuy 2026 se realizará del 12 al 15 de Octubre de 2026 en el Predio Ferial Ciudad Cultural de San Salvador de Jujuy, de 10:00 a 22:00 hs.";
      } else if (lower.includes("entrada") || lower.includes("ticket") || lower.includes("precio") || lower.includes("comprar")) {
        botReply =
          "Podés adquirir tus entradas generales ($4.000 ARS) o Pases Conferencia ($35.000 ARS) directamente en la sección 'Entradas y Acreditaciones' con código QR instantáneo.";
      }

      setMessages((prev) => [...prev, { role: "assistant", text: botReply }]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      {/* Botón Flotante Fijo Abajo a la Derecha (Idéntico a la maqueta Stitch) */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-[#8b3d9e] hover:bg-[#722d83] text-white px-5 py-3 rounded-full shadow-xl shadow-purple-900/30 hover:scale-105 transition-all font-bold text-sm"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ec4b6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2ec4b6]"></span>
            </span>
            <Bot className="w-5 h-5 text-[#70f8e8]" />
            <span>Asistente Virtual IA</span>
          </button>
        )}
      </div>

      {/* Ventana de Chat Flotante Desplegable */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-purple-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header del Chatbot */}
          <div className="bg-gradient-to-r from-[#1d1128] via-[#3a154c] to-[#006a62] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2ec4b6]/20 border border-[#2ec4b6]/40 flex items-center justify-center">
                <Bot className="w-6 h-6 text-[#70f8e8]" />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  JuyBot IA <Sparkles className="w-3.5 h-3.5 text-[#2ec4b6]" />
                </h3>
                <p className="text-[11px] text-purple-200">Asistente Oficial ExpoJuy 2026</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar asistente virtual"
              className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Historial de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#faf8f7] text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-[#8b3d9e] text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#8b3d9e] text-white rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 italic">
                <Bot className="w-4 h-4 text-[#8b3d9e]" />
                <span>JuyBot está escribiendo...</span>
              </div>
            )}
          </div>

          {/* Sugerencias rápidas */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            {PRESET_QUERIES.map((query, i) => (
              <button
                key={i}
                onClick={() => handleSend(query)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-purple-50 text-[#8b3d9e] border border-purple-100 hover:bg-purple-100 transition-colors shrink-0 font-medium"
              >
                {query}
              </button>
            ))}
          </div>

          {/* Input de Mensaje */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu consulta aquí..."
              className="flex-1 px-3.5 py-2 rounded-full border border-slate-200 text-xs focus:outline-none focus:border-[#8b3d9e]"
            />
            <button
              onClick={() => handleSend()}
              aria-label="Enviar mensaje al asistente"
              className="w-9 h-9 rounded-full bg-[#006a62] hover:bg-[#00514a] text-white flex items-center justify-center shrink-0 transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
