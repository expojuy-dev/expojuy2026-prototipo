import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { resolveRole } from "@/lib/admin-auth";
import { EXHIBITORS } from "@/lib/data";

const MEETING_STATUSES = ["pendiente", "confirmada", "rechazada"] as const;
const LEAD_STATUSES = ["nuevo", "contactado", "calificado", "cerrado"] as const;

function unauthorized() {
  return NextResponse.json({ error: "Contraseña de organización incorrecta" }, { status: 401 });
}

/**
 * POST — autenticación + datos del panel de organización.
 * Devuelve el rol resuelto y los datos según el rol:
 * - coordinacion: leads, tickets, reuniones B2B y suscriptores con métricas.
 * - puerta: solo entradas (para el check-in de acceso).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = z.object({ passcode: z.string() }).safeParse(body);
    const role = parsed.success ? resolveRole(parsed.data.passcode) : null;
    if (!role) return unauthorized();

    if (role === "puerta") {
      const tickets = await db.ticket.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
      return NextResponse.json({
        ok: true,
        role,
        tickets,
        stats: { tickets: tickets.length, used: tickets.filter((t) => t.used).length },
      });
    }

    const [leads, tickets, meetings, subscribers, voteGrouped] = await Promise.all([
      db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
      db.ticket.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
      db.meetingRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
      db.subscriber.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
      db.standVote.groupBy({
        by: ["exhibitorId"],
        _count: { exhibitorId: true },
        orderBy: { _count: { exhibitorId: "desc" } },
      }),
    ]);

    const revenue = tickets.reduce((sum, t) => sum + t.price, 0);
    const pendingMeetings = meetings.filter((m) => m.status === "pendiente").length;
    const newLeads = leads.filter((l) => l.status === "nuevo").length;

    // Ranking de la encuesta "Votá tu stand favorito"
    const voteTotal = voteGrouped.reduce((s, g) => s + g._count.exhibitorId, 0);
    const votes = voteGrouped.map((g) => ({
      exhibitorId: g.exhibitorId,
      exhibitorName: EXHIBITORS.find((e) => e.id === g.exhibitorId)?.name ?? g.exhibitorId,
      count: g._count.exhibitorId,
    }));

    return NextResponse.json({
      ok: true,
      role,
      stats: {
        leads: leads.length,
        newLeads,
        tickets: tickets.length,
        meetings: meetings.length,
        pendingMeetings,
        subscribers: subscribers.length,
        revenue,
        votes: voteTotal,
      },
      leads,
      tickets,
      meetings,
      subscribers,
      votes,
    });
  } catch (error) {
    console.error("[API /api/admin] Error:", error);
    return NextResponse.json({ error: "Error interno del panel" }, { status: 500 });
  }
}

const patchSchema = z.object({
  passcode: z.string(),
  kind: z.enum(["lead", "meeting"]),
  id: z.string().min(1),
  status: z.string().min(3).max(20),
});

/**
 * PATCH — cambia el estado de un lead o de una reunión B2B.
 * Solo el rol coordinación puede gestionar estados (el rol puerta recibe 403).
 * Al confirmar/rechazar una reunión se simula el envío de un email
 * (log en servidor) y se informa en la respuesta.
 */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    const role = resolveRole(parsed.data.passcode);
    if (!role) return unauthorized();
    if (role === "puerta") {
      return NextResponse.json(
        { error: "Tu rol de Puerta solo permite el check-in de entradas" },
        { status: 403 }
      );
    }

    const { kind, id, status } = parsed.data;

    if (kind === "meeting") {
      if (!MEETING_STATUSES.includes(status as (typeof MEETING_STATUSES)[number])) {
        return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
      }
      const meeting = await db.meetingRequest.update({
        where: { id },
        data: { status },
      });
      let emailSimulated = false;
      if (status !== "pendiente") {
        console.log(
          `[EMAIL SIMULADO] → ${meeting.email} | Reunión B2B con ${meeting.exhibitorName} (${meeting.preferredSlot}): ${status.toUpperCase()}`
        );
        emailSimulated = true;
      }
      return NextResponse.json({ ok: true, meeting, emailSimulated });
    }

    // kind === "lead"
    if (!LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }
    const lead = await db.lead.update({ where: { id }, data: { status } });
    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    console.error("[API /api/admin PATCH] Error:", error);
    return NextResponse.json({ error: "No se pudo actualizar el estado" }, { status: 500 });
  }
}
