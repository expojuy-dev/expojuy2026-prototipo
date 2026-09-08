import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const subSchema = z.object({
  email: z.string().trim().email("Email inválido"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = subSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Ingresá un email válido" }, { status: 400 });
    }
    await db.subscriber.upsert({
      where: { email: parsed.data.email },
      update: {},
      create: { email: parsed.data.email },
    });
    return NextResponse.json({ ok: true, message: "¡Listo! Te vamos a avisar de todas las novedades." }, { status: 201 });
  } catch (error) {
    console.error("[API /api/newsletter] Error:", error);
    return NextResponse.json({ error: "No pudimos suscribirte. Intentá de nuevo." }, { status: 500 });
  }
}
