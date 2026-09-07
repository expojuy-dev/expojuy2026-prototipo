import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import QRCode from "qrcode";
import { randomBytes } from "crypto";

const ticketSchema = z.object({
  type: z.enum(["visitante", "prensa", "b2b"]),
  holder: z.string().trim().min(3, "Nombre inválido").max(120),
  email: z.string().trim().email("Email inválido"),
  days: z
    .string()
    .regex(/^(1|3|10)$/, "Cantidad de días inválida")
    .optional()
    .default("1"),
});

const PRICES: Record<string, number> = { visitante: 5000, prensa: 0, b2b: 12000 };

function generateCode() {
  return `EJ26-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ticketSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
        { status: 400 }
      );
    }

    const { type, holder, email, days } = parsed.data;
    const price = type === "visitante" ? PRICES.visitante * parseInt(days, 10) : PRICES[type];

    // Código único con reintentos por si colisiona
    let ticket;
    for (let attempt = 0; attempt < 5; attempt++) {
      const code = generateCode();
      try {
        ticket = await db.ticket.create({
          data: { code, type, holder, email, days, price },
        });
        break;
      } catch {
        if (attempt === 4) throw new Error("No se pudo generar el código de entrada");
      }
    }
    if (!ticket) throw new Error("No se pudo generar la entrada");

    // QR con la información de validación
    const qrPayload = `EXPOJUY2026|${ticket.code}|${ticket.type}|${ticket.holder}`;
    const qrDataUrl = await QRCode.toDataURL(qrPayload, {
      width: 420,
      margin: 1,
      color: { dark: "#2A1745", light: "#FFFFFF" },
      errorCorrectionLevel: "M",
    });

    // Envío de la entrada por email (simulado — en producción usar un servicio real)
    console.log(
      `[EMAIL SIMULADO] → ${ticket.email} | Entrada ${ticket.code} (${ticket.type}) · QR adjunto`
    );

    return NextResponse.json(
      {
        ok: true,
        code: ticket.code,
        type: ticket.type,
        holder: ticket.holder,
        price: ticket.price,
        qrDataUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API /api/tickets] Error:", error);
    return NextResponse.json(
      { error: "No pudimos emitir tu entrada. Intentá nuevamente." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const rawCode = req.nextUrl.searchParams.get("code");
    if (!rawCode) {
      return NextResponse.json({ error: "Falta el parámetro code" }, { status: 400 });
    }
    const code = rawCode.trim().toUpperCase();
    const ticket = await db.ticket.findUnique({ where: { code } });
    if (!ticket) {
      return NextResponse.json({ error: "No encontramos una entrada con ese código" }, { status: 404 });
    }

    // Regeneramos el QR para que el visitante pueda re-descargar su entrada
    const qrPayload = `EXPOJUY2026|${ticket.code}|${ticket.type}|${ticket.holder}`;
    const qrDataUrl = await QRCode.toDataURL(qrPayload, {
      width: 420,
      margin: 1,
      color: { dark: "#2A1745", light: "#FFFFFF" },
      errorCorrectionLevel: "M",
    });

    return NextResponse.json({
      ok: true,
      code: ticket.code,
      type: ticket.type,
      holder: ticket.holder,
      used: ticket.used,
      price: ticket.price,
      days: ticket.days,
      createdAt: ticket.createdAt,
      qrDataUrl,
    });
  } catch (error) {
    console.error("[API /api/tickets GET] Error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
