import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { MEETING_SLOTS } from "@/lib/data";

const meetingSchema = z.object({
  exhibitorId: z.string().trim().min(1).max(60),
  exhibitorName: z.string().trim().min(1).max(160),
  name: z.string().trim().min(3, "El nombre debe tener al menos 3 caracteres").max(120),
  email: z.string().trim().email("Email inválido"),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Contanos brevemente el interés de la reunión (mín. 10 caracteres)")
    .max(1000),
  preferredSlot: z.string().trim().min(3).max(80),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = meetingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
        { status: 400 }
      );
    }
    const data = parsed.data;
    if (!MEETING_SLOTS.includes(data.preferredSlot as (typeof MEETING_SLOTS)[number])) {
      return NextResponse.json({ error: "Franja horaria inválida" }, { status: 400 });
    }

    const meeting = await db.meetingRequest.create({
      data: {
        exhibitorId: data.exhibitorId,
        exhibitorName: data.exhibitorName,
        name: data.name,
        email: data.email,
        company: data.company || null,
        message: data.message,
        preferredSlot: data.preferredSlot,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        id: meeting.id,
        message: `¡Solicitud enviada! El equipo de ${data.exhibitorName} te va a confirmar por email.`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API /api/meetings] Error:", error);
    return NextResponse.json(
      { error: "No pudimos registrar tu solicitud. Intentá nuevamente." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Con ?email=... devuelve el estado de las solicitudes de ese email
  // (consulta pública de la ronda B2B: cada persona ve solo lo suyo).
  const email = req.nextUrl.searchParams.get("email");
  if (email !== null) {
    const clean = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }
    const requests = await db.meetingRequest.findMany({
      where: { email: clean },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        exhibitorName: true,
        preferredSlot: true,
        status: true,
        createdAt: true,
      },
      take: 20,
    });
    return NextResponse.json({ ok: true, requests });
  }

  // Sin email: listado de franjas disponibles (para poblar el select)
  return NextResponse.json({ ok: true, slots: MEETING_SLOTS });
}
