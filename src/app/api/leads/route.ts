import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const leadSchema = z.object({
  name: z.string().trim().min(3, "El nombre debe tener al menos 3 caracteres").max(120),
  email: z.string().trim().email("Email inválido"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  inquiryType: z.enum(["expositor", "general", "prensa", "sponsoreo", "otro"]),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  industry: z.string().trim().max(120).optional().or(z.literal("")),
  spaceSize: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Datos inválidos";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;
    const isExpositor = data.inquiryType === "expositor";
    if (isExpositor && (!data.company || !data.industry)) {
      return NextResponse.json(
        { error: "Para expositores, completá empresa y rubro" },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        inquiryType: data.inquiryType,
        company: data.company || null,
        industry: data.industry || null,
        spaceSize: data.spaceSize || null,
        message: data.message,
      },
    });

    return NextResponse.json(
      { ok: true, id: lead.id, message: "Consulta recibida. Te contactaremos a la brevedad." },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API /api/leads] Error:", error);
    return NextResponse.json(
      { error: "No pudimos procesar tu consulta. Intentá nuevamente." },
      { status: 500 }
    );
  }
}
