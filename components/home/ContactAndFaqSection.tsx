"use client";

import { useState } from "react";
import { FAQS_DATA } from "@/data/expo-data";
import { ChevronDown, Send, Check } from "lucide-react";

export function ContactAndFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    tipo: "expositor",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        nombre: "",
        empresa: "",
        email: "",
        tipo: "expositor",
        mensaje: "",
      });
    }, 4000);
  };

  return (
    <section id="contacto" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Preguntas Frecuentes */}
          <div id="preguntas" className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold tracking-wide uppercase mb-3">
                Información al Visitante
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Preguntas Frecuentes
              </h2>
              <p className="mt-2 text-slate-400 text-sm">
                Todo lo que necesitás saber antes de tu visita a ExpoJuy 2026.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {FAQS_DATA.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-200 hover:text-cyan-400 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-cyan-400" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-slate-800/60 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Formulario de Contacto & Reserva de Stand */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-3">
                  Contacto Institucional
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Formá Parte de ExpoJuy 2026
                </h3>
                <p className="mt-1 text-slate-400 text-sm">
                  Consultá por reserva de espacios, rondas internacionales o patrocinios oficiales.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">¡Mensaje Enviado con Éxito!</h4>
                  <p className="text-xs text-slate-300">
                    La Cámara de Comercio Exterior de Jujuy se pondrá en contacto con tu empresa a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Nombre completo
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej. Martín Morales"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Empresa u Organización
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        placeholder="Ej. Andes Mining S.A."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Correo Electrónico
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contacto@empresa.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Motivo de consulta
                      </label>
                      <select
                        value={formData.tipo}
                        onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition-all"
                      >
                        <option value="expositor">Quiero reservar un Stand</option>
                        <option value="ronda">Acreditación Rondas B2B</option>
                        <option value="sponsor">Propuesta de Patrocinio</option>
                        <option value="prensa">Prensa y Medios</option>
                        <option value="general">Información General</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Detalle de su requerimiento
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder="Indique metros cuadrados deseados, sector de interés o temática de negocio..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Consulta a la Organización
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
