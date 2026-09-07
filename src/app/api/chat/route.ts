import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import ZAI from "z-ai-web-dev-sdk";
import { EVENT, EXHIBITORS, FAQS, TICKET_TYPES } from "@/lib/data";

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(1000),
      })
    )
    .min(1)
    .max(12),
});

// Contexto del evento inyectado al modelo
const EVENT_CONTEXT = `
Sos "Juy", el asistente virtual oficial de ExpoJuy 2026, la feria de producción, tecnología,
innovación y comercio exterior más importante del Norte Argentino, organizada por la Cámara de
Comercio Exterior de Jujuy.

DATOS OFICIALES DEL EVENTO:
- Slogan: "${EVENT.slogan}"
- Fechas: del 25 de septiembre al 4 de octubre de 2026 (${EVENT.daysLabel}).
- Lugar: ${EVENT.venue}, ${EVENT.address}.
- Horarios: ${EVENT.schedule}.
- Contacto: ${EVENT.email} · ${EVENT.phone}

ENTRADAS:
${TICKET_TYPES.map(
  (t) => `- ${t.title}: ${t.priceLabel} (${t.per}). ${t.description} Incluye QR digital.`
).join("\n")}

ZONAS DEL PREDIO:
- Pabellón A · Tecnología e Innovación (turquesa): IA, software, startups.
- Pabellón B · Industria y Minería (violeta): litio, agroindustria, energías renovables.
- Pabellón C · Internacional y Negocios (oscuro): rondas B2B, delegaciones internacionales, salas VIP.
- Pabellón D · Gastronomía y Escenario Principal (lavanda): cocina regional, shows.
- Servicios: estacionamiento (1.200 vehículos, Puerta Sur), enfermería, prensa, combis gratuitas desde el centro cada 20 minutos.

EXPOSITORES DESTACADOS (stand exacto si lo sabés):
${EXHIBITORS.slice(0, 14)
  .map((e) => `- ${e.name} (${e.category}) → ${e.stand}`)
  .join("\n")}

PREGUNTAS FRECUENTES OFICIALES:
${FAQS.map((f) => `P: ${f.q}\nR: ${f.a}`).join("\n\n")}

INSTRUCCIONES:
- Respondé SIEMPRE en español rioplatense, cercano y profesional (voseo: "vos", "tenés", "podés").
- Sé breve: máximo 3-4 oraciones o una lista corta.
- Usá SOLO la información oficial de arriba; si no sabés algo, sugerí escribir a ${EVENT.email}
  o usar el formulario de contacto de la web. Nunca inventes stands, precios ni horarios.
- Si preguntan por algo no relacionado con ExpoJuy, amablemente redirigí la conversación al evento.
`.trim();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = chatSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Mensajes inválidos" }, { status: 400 });
    }

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: "assistant",
          content: EVENT_CONTEXT,
        },
        ...parsed.data.messages,
      ],
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content;
    if (!reply) {
      return NextResponse.json(
        { error: "El asistente no pudo responder. Probá de nuevo." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, reply });
  } catch (error) {
    console.error("[API /api/chat] Error:", error);
    return NextResponse.json(
      { error: "El asistente no está disponible en este momento." },
      { status: 500 }
    );
  }
}
