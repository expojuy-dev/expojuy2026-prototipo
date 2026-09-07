import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { resolveRole } from "@/lib/admin-auth";

const checkinSchema = z.object({
  passcode: z.string(),
  code: z.string().trim().min(4, "Código inválido").max(24),
  action: z.enum(["checkin", "revert"]).default("checkin"),
  operator: z.string().trim().max(40).optional(),
  source: z.enum(["manual", "camara"]).default("manual"),
});

function serializeTicket(t: {
  code: string;
  type: string;
  holder: string;
  email: string;
  days: string;
  price: number;
  used: boolean;
  usedAt: Date | null;
  createdAt: Date;
}) {
  return {
    code: t.code,
    type: t.type,
    holder: t.holder,
    email: t.email,
    days: t.days,
    price: t.price,
    used: t.used,
    usedAt: t.usedAt ? t.usedAt.toISOString() : null,
    createdAt: t.createdAt.toISOString(),
  };
}

/**
 * POST — Control de acceso en puerta (check-in de entradas por QR/código).
 * - action "checkin": marca la entrada como utilizada (used + usedAt).
 *   Si ya estaba utilizada responde 409 con los datos (no duplica el ingreso).
 * - action "revert": revierte el check-in (para errores de escaneo).
 * Cada operación exitosa queda registrada en CheckinLog (auditoría: quién, cuándo, cómo).
 * Requiere passcode del Panel de Organización.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = checkinSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
        { status: 400 }
      );
    }
    const { passcode, action, operator, source } = parsed.data;
    // Ambos roles (coordinación y puerta) pueden operar el check-in
    if (!resolveRole(passcode)) {
      return NextResponse.json({ error: "Contraseña de organización incorrecta" }, { status: 401 });
    }

    const code = parsed.data.code.trim().toUpperCase();
    const ticket = await db.ticket.findUnique({ where: { code } });
    if (!ticket) {
      return NextResponse.json(
        { error: "No existe una entrada con ese código" },
        { status: 404 }
      );
    }

    if (action === "revert") {
      if (!ticket.used) {
        return NextResponse.json(
          { error: "Esa entrada no estaba marcada como utilizada" },
          { status: 409 }
        );
      }
      const reverted = await db.ticket.update({
        where: { code },
        data: { used: false, usedAt: null },
      });
      await db.checkinLog.create({
        data: {
          code,
          holder: ticket.holder,
          action: "revert",
          operator: operator?.trim() || "Puerta 1",
          source,
        },
      });
      console.log(`[CHECK-IN] ↩️ Revertido: ${code} (${ticket.holder}) por ${operator ?? "Puerta 1"}`);
      return NextResponse.json({ ok: true, action: "revert", ticket: serializeTicket(reverted) });
    }

    if (ticket.used) {
      return NextResponse.json(
        {
          error: "Esta entrada ya fue utilizada",
          usedAt: ticket.usedAt ? ticket.usedAt.toISOString() : null,
          ticket: serializeTicket(ticket),
        },
        { status: 409 }
      );
    }

    const checked = await db.ticket.update({
      where: { code },
      data: { used: true, usedAt: new Date() },
    });
    await db.checkinLog.create({
      data: {
        code,
        holder: checked.holder,
        action: "checkin",
        operator: operator?.trim() || "Puerta 1",
        source,
      },
    });
    console.log(
      `[CHECK-IN] ✅ Ingreso: ${code} · ${checked.holder} (${checked.type}, ${checked.days} día/s) por ${operator ?? "Puerta 1"} [${source}]`
    );
    return NextResponse.json({ ok: true, action: "checkin", ticket: serializeTicket(checked) });
  } catch (error) {
    console.error("[API /api/checkin] Error:", error);
    return NextResponse.json({ error: "Error interno en el check-in" }, { status: 500 });
  }
}

/**
 * GET — Historial de auditoría de accesos (últimos 50 registros).
 * Requiere passcode: /api/checkin?passcode=...
 */
export async function GET(req: NextRequest) {
  try {
    const passcode = req.nextUrl.searchParams.get("passcode");
    if (!passcode || !resolveRole(passcode)) {
      return NextResponse.json({ error: "Contraseña de organización incorrecta" }, { status: 401 });
    }
    const [logs, total] = await Promise.all([
      db.checkinLog.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
      db.checkinLog.count(),
    ]);
    return NextResponse.json({
      logs: logs.map((l) => ({
        id: l.id,
        code: l.code,
        holder: l.holder,
        action: l.action,
        operator: l.operator,
        source: l.source,
        createdAt: l.createdAt.toISOString(),
      })),
      total,
    });
  } catch (error) {
    console.error("[API /api/checkin GET] Error:", error);
    return NextResponse.json({ error: "Error al obtener el historial" }, { status: 500 });
  }
}
