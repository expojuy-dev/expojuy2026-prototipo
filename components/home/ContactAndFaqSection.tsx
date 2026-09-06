"use client";

import { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  Headphones,
  MapPin,
  Building2,
  Mail,
  Phone,
  Navigation,
  CheckCircle2,
  Send,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "¿Cuándo y dónde se realiza exactamente ExpoJuy 2026?",
    answer:
      "ExpoJuy 2026 tendrá lugar del 10 al 19 de octubre de 2026 en el predio ferial Ciudad Cultural, ubicado en el barrio Alto Padilla, San Salvador de Jujuy, Argentina. Es un predio al aire libre y cubierto con más de 25.000 m² de exhibición.",
  },
  {
    question: "¿Cómo puedo postular mi empresa para contratar un stand?",
    answer:
      "Podés postularte a través del formulario de contacto seleccionando 'Quiero ser expositor'. Nuestro equipo comercial de la Cámara de Comercio Exterior te enviará el tarifario de stands (interiores climatizados o exteriores descubiertos), el catálogo de equipamiento y las opciones de financiamiento.",
  },
  {
    question: "¿Cómo compro las entradas y cómo recibo mi código QR?",
    answer:
      "La compra se realiza online mediante tarjetas de débito, crédito o billeteras virtuales. Una vez procesado el pago, tu comprobante y código QR dinámico se envían por correo electrónico y quedan disponibles para guardar en tu Apple Wallet o Google Wallet.",
  },
  {
    question: "¿El predio ferial cuenta con accesibilidad para personas con movilidad reducida?",
    answer:
      "Sí. Todo el predio Ciudad Cultural cuenta con rampas normalizadas, senderos continuos de circulación, baños adaptados de acceso prioritario y puntos de descanso asistidos por personal de la organización.",
  },
  {
    question: "¿Cómo funcionan las Rondas Internacionales de Negocios?",
    answer:
      "Con el Pase B2B tenés acceso al software de matchmaking previo al evento. Allí coordinás reuniones bilaterales de 20 minutos con compradores y distribuidores internacionales confirmados de los países miembros de ZICOSUR y mercados asiáticos.",
  },
  {
    question: "¿Existe estacionamiento dentro del predio?",
    answer:
      "Sí, Ciudad Cultural cuenta con una amplia playa de estacionamiento custodiada con tarifa fija por día y sectores señalizados exclusivos para expositores y prensa acreditada.",
  },
];

export function ContactAndFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [consultType, setConsultType] = useState("expositor");
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      {/* ==================== 9. PREGUNTAS FRECUENTES (FAQ) ==================== */}
      <section className="py-space-4xl bg-surface-container-low" id="faq">
        <div className="max-w-4xl mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="text-center mb-space-3xl">
            <div className="inline-flex items-center gap-space-xs bg-secondary/10 px-space-sm py-space-2xs rounded-full mb-space-xs">
              <HelpCircle className="w-4 h-4 text-secondary" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                Centro de Ayuda
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
              Preguntas Frecuentes
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
              Respuestas a las dudas más usuales sobre la expo, stands y participación.
            </p>
          </div>

          <div className="flex flex-col gap-space-md">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm transition-all border border-slate-100"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left gap-space-md font-headline-sm text-headline-sm text-on-surface focus:outline-none font-bold"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-space-md pt-space-md border-t border-slate-100 animate-in fade-in duration-200">
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 10. CONTACTO Y CAPTACIÓN B2B ==================== */}
      <section className="py-space-4xl bg-surface" id="contacto">
        <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
            {/* Left Column: Institutional Info & Map Pin */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-space-xs bg-primary/10 px-space-sm py-space-2xs rounded-full mb-space-xs">
                  <Headphones className="w-4 h-4 text-primary" />
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    Contacto Directo
                  </span>
                </div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
                  Hablemos de tus Negocios en ExpoJuy
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm leading-relaxed">
                  Contactá a nuestro comité organizador para contratación de stands, patrocinios, delegaciones consulares o acreditaciones.
                </p>

                <div className="mt-space-xl space-y-space-md">
                  <div className="flex items-start gap-space-sm">
                    <div className="h-10 w-10 rounded-xl bg-primary-container/20 text-on-primary-container flex items-center justify-center shrink-0 font-bold">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        Predio Ferial • Ciudad Cultural
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Alto Padilla, San Salvador de Jujuy, República Argentina
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-sm">
                    <div className="h-10 w-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0 font-bold">
                      <Building2 className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        Cámara de Comercio Exterior de Jujuy
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Sede Institucional: Alvear 1084, San Salvador de Jujuy
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-sm">
                    <div className="h-10 w-10 rounded-xl bg-primary-container/20 text-on-primary-container flex items-center justify-center shrink-0 font-bold">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        Correos Electrónicos
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        expositores@expojuy.com.ar • info@expojuy.com.ar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-sm">
                    <div className="h-10 w-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0 font-bold">
                      <Phone className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        Línea Telefónica Directa
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        +54 (388) 423-3333 / WhatsApp B2B: +54 (9 388) 456-7890
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Static Map Location Viewport */}
              <div
                className="mt-space-xl rounded-2xl overflow-hidden shadow-sm h-48 w-full bg-cover bg-center relative border border-slate-200"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfJbPVffKJQnsxIPwE5cHcJIeIJil0FKTXkVvItmjpj3wSFiqHlCzug7if4_Rx9QlCTYsgz6NXnBal8I5ChV2ayANhAlj1ytXZJYshjxo888ofnU_nlCHho6ENL69XyrtZooT9IwGeP4vnoXbj3vePglt7ShFpA0ODkIScprhw51trKzc3AMEJF8cqGAKxrKYCwCAoPEQl5ENgPmInHD4JRSmc6Znd99FSL9aRCqXSo8fQo4xCjxsO')",
                }}
              >
                <a
                  href="https://maps.google.com/?q=Ciudad+Cultural+Jujuy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-space-sm left-space-sm bg-surface-container-lowest/90 backdrop-blur-md px-space-sm py-1 rounded-full text-xs font-bold text-on-surface flex items-center gap-1 shadow-md hover:bg-white"
                >
                  <Navigation className="w-3.5 h-3.5 text-primary" /> Ver en Google Maps
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Lead Capture Form */}
            <div className="lg:col-span-7 bg-surface-container-low p-space-xl lg:p-space-2xl rounded-3xl shadow-sm border border-slate-200">
              <h3 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs font-bold">
                Formulario de Contacto B2B
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-xl">
                Completá los campos y un asesor comercial te responderá en menos de 24 horas.
              </p>

              {submitted ? (
                <div className="p-space-lg rounded-2xl bg-primary-container/20 text-on-primary-container flex items-center gap-space-sm font-bold animate-in fade-in">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span>¡Gracias por tu consulta! El equipo de ExpoJuy 2026 te contactará a la brevedad.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-space-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Marcela Benítez"
                        className="w-full h-12 px-space-md rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                        Correo Electrónico Corporativo *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Ej: mbenitez@empresa.com"
                        className="w-full h-12 px-space-md rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+54 9 388 ..."
                        className="w-full h-12 px-space-md rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                        Tipo de Consulta *
                      </label>
                      <select
                        value={consultType}
                        onChange={(e) => setConsultType(e.target.value)}
                        className="w-full h-12 px-space-md rounded-xl bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container border border-slate-200 font-medium"
                      >
                        <option value="expositor">Quiero ser Expositor (Stand)</option>
                        <option value="sponsor">Patrocinio / Sponsor Oficial</option>
                        <option value="rondas">Rondas de Negocios B2B</option>
                        <option value="prensa">Prensa y Acreditación</option>
                        <option value="general">Consulta General</option>
                      </select>
                    </div>
                  </div>

                  {/* Dynamic Exhibitor Fields */}
                  {(consultType === "expositor" || consultType === "sponsor") && (
                    <div className="p-space-md bg-surface-container-lowest rounded-2xl space-y-space-md border border-slate-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div>
                          <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                            Nombre de la Empresa
                          </label>
                          <input
                            type="text"
                            placeholder="Ej: AgroIndustrias del Norte S.A."
                            className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary border border-slate-200"
                          />
                        </div>
                        <div>
                          <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                            Rubro Principal
                          </label>
                          <select className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary border border-slate-200 font-medium">
                            <option>Minería & Servicios Mineros</option>
                            <option>Tecnología, Software & Telecom</option>
                            <option>Agroindustria & Alimentos</option>
                            <option>Energías Renovables</option>
                            <option>Logística & Transporte Internacional</option>
                            <option>Turismo, Gastronomía & Artesanías</option>
                            <option>Otro sector</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                          Superficie estimada que requiere (m²)
                        </label>
                        <div className="flex items-center gap-space-xs overflow-x-auto">
                          <label className="px-space-md py-1 rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm cursor-pointer hover:bg-primary-container/30 border border-slate-200 font-medium shrink-0">
                            <input type="radio" name="sqm" defaultChecked className="mr-1.5" /> Stand 9 m² (3x3)
                          </label>
                          <label className="px-space-md py-1 rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm cursor-pointer hover:bg-primary-container/30 border border-slate-200 font-medium shrink-0">
                            <input type="radio" name="sqm" className="mr-1.5" /> Stand 18 m² (6x3)
                          </label>
                          <label className="px-space-md py-1 rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm cursor-pointer hover:bg-primary-container/30 border border-slate-200 font-medium shrink-0">
                            <input type="radio" name="sqm" className="mr-1.5" /> Stand Isla +36 m²
                          </label>
                          <label className="px-space-md py-1 rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm cursor-pointer hover:bg-primary-container/30 border border-slate-200 font-medium shrink-0">
                            <input type="radio" name="sqm" className="mr-1.5" /> Espacio Exterior
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                      Mensaje o Requerimientos Específicos
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describí brevemente los objetivos de tu empresa o cualquier consulta particular..."
                      className="w-full p-space-md rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container border border-slate-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-space-sm px-space-xl rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary font-label-lg text-label-lg shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-space-xs font-semibold"
                  >
                    <Send className="w-5 h-5 shrink-0" />
                    <span>Enviar Consulta Institucional</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
