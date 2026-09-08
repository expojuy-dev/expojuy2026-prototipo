import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { EXHIBITORS } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const exhibitorIds = new Set(EXHIBITORS.map((e) => e.id));

/** Ranking agregado: [{ exhibitorId, count }] + total de votos. */
async function getResults() {
  const grouped = await db.standVote.groupBy({
    by: ["exhibitorId"],
    _count: { exhibitorId: true },
    orderBy: { _count: { exhibitorId: "desc" } },
  });
  const results = grouped.map((g) => ({
    exhibitorId: g.exhibitorId,
    count: g._count.exhibitorId,
  }));
  const total = results.reduce((s, r) => s + r.count, 0);
  return { results, total };
}

/** GET /api/vote?deviceId=... → resultados + mi voto (si envié deviceId). */
export async function GET(req: NextRequest) {
  try {
    const deviceId = req.nextUrl.searchParams.get("deviceId") ?? "";
    const { results, total } = await getResults();

    let myVote: string | null = null;
    if (deviceId) {
      const mine = await db.standVote.findUnique({ where: { deviceId } });
      myVote = mine?.exhibitorId ?? null;
    }

    return NextResponse.json({ ok: true, results, total, myVote });
  } catch (err) {
    console.error("[vote][GET]", err);
    return NextResponse.json({ ok: false, error: "No se pudieron leer los resultados" }, { status: 500 });
  }
}

/** POST /api/vote { exhibitorId, deviceId } → registra o cambia mi voto. */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const exhibitorId = typeof body?.exhibitorId === "string" ? body.exhibitorId : "";
    const deviceId = typeof body?.deviceId === "string" ? body.deviceId : "";

    if (!exhibitorId || !exhibitorIds.has(exhibitorId)) {
      return NextResponse.json({ ok: false, error: "Expositor inválido" }, { status: 400 });
    }
    if (deviceId.length < 8 || deviceId.length > 64) {
      return NextResponse.json({ ok: false, error: "Identificador de dispositivo inválido" }, { status: 400 });
    }

    await db.standVote.upsert({
      where: { deviceId },
      update: { exhibitorId },
      create: { deviceId, exhibitorId },
    });

    const { results, total } = await getResults();
    return NextResponse.json({ ok: true, results, total, myVote: exhibitorId });
  } catch (err) {
    console.error("[vote][POST]", err);
    return NextResponse.json({ ok: false, error: "No se pudo registrar el voto" }, { status: 500 });
  }
}
