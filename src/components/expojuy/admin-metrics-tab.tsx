"use client";

import * as React from "react";
import {
  TrendingUp,
  Users,
  Handshake,
  Ticket as TicketIcon,
  CalendarClock,
  Activity,
  Building2,
  PieChart,
  Download,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { downloadCsv } from "@/lib/csv";
import type { CheckinTicket } from "./admin-checkin-tab";

type MetricLead = {
  status: string;
  inquiryType: string;
  createdAt: string;
};
type MetricMeeting = {
  exhibitorName: string;
  preferredSlot: string;
  status: string;
  createdAt: string;
};
type MetricSubscriber = { createdAt: string };
type MetricVote = { exhibitorId: string; exhibitorName: string; count: number };

const LEAD_STATUS_META: Record<string, { label: string; bar: string; chip: string }> = {
  nuevo: { label: "Nuevo", bar: "from-violet-brand to-violet-dark", chip: "bg-violet-brand/10 text-violet-ink" },
  contactado: { label: "Contactado", bar: "from-amber-400 to-amber-500", chip: "bg-amber-100 text-amber-700" },
  calificado: { label: "Calificado", bar: "from-turquoise to-turquoise-dark", chip: "bg-turquoise-light text-turquoise-ink" },
  cerrado: { label: "Cerrado", bar: "from-graphite to-deep", chip: "bg-muted text-muted-foreground" },
};

const MEETING_STATUS_META: Record<string, { label: string; bar: string }> = {
  pendiente: { label: "Pendiente", bar: "from-amber-400 to-amber-500" },
  confirmada: { label: "Confirmada", bar: "from-turquoise to-turquoise-dark" },
  rechazada: { label: "Rechazada", bar: "from-red-400 to-red-500" },
};

const INQUIRY_META: Record<string, { label: string; bar: string }> = {
  expositor: { label: "Expositor", bar: "from-violet-brand to-violet-dark" },
  general: { label: "Consulta general", bar: "from-blue-bright to-sky-500" },
  prensa: { label: "Prensa", bar: "from-turquoise to-turquoise-dark" },
  sponsoreo: { label: "Sponsoreo", bar: "from-amber-400 to-orange-500" },
  otro: { label: "Otro", bar: "from-graphite to-deep" },
};

const TICKET_TYPE_META: Record<string, string> = {
  visitante: "Visitante",
  prensa: "Prensa",
  b2b: "Empresarial B2B",
};

function ChartCard({
  icon: Icon,
  title,
  hint,
  children,
  className,
}: {
  icon: React.ElementType;
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-lavender/40 bg-surface p-4 shadow-sm transition hover:border-turquoise/40 hover:shadow-md",
        className
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-lavender-light/80">
          <Icon className="h-4 w-4 text-violet-ink" aria-hidden="true" />
        </span>
        <div>
          <h4 className="font-display text-[13px] font-extrabold leading-tight text-ink">{title}</h4>
          {hint ? <p className="text-[10px] text-muted-foreground">{hint}</p> : null}
        </div>
      </div>
      {children}
    </div>
  );
}

function Bar({
  label,
  value,
  max,
  display,
  gradient,
}: {
  label: string;
  value: number;
  max: number;
  display: string;
  gradient: string;
}) {
  const pct = max > 0 ? Math.max((value / max) * 100, 4) : 0;
  return (
    <div className="group/bar" title={`${label}: ${display}`}>
      <div className="mb-1 flex items-center justify-between gap-2 text-[11px]">
        <span className="truncate font-semibold text-graphite">{label}</span>
        <span className="shrink-0 font-mono font-bold text-violet-dark">{display}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-lavender-light/80">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out group-hover/bar:brightness-110", gradient)}
          style={{ width: `${pct}%` }}
          role="presentation"
        />
      </div>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  extra,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  extra: string;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-lavender/40 bg-surface p-3.5 shadow-sm transition hover:border-turquoise/40 hover:shadow-md">
      <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", tone)}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-display truncate text-xl font-black leading-none text-ink">{value}</p>
        <p className="mt-1 line-clamp-2 text-[10px] font-bold uppercase leading-tight tracking-wide text-muted-foreground">
          {label} · <span className="normal-case">{extra}</span>
        </p>
      </div>
    </div>
  );
}

export function AdminMetricsTab({
  leads,
  tickets,
  meetings,
  subscribers,
  votes,
}: {
  leads: MetricLead[];
  tickets: CheckinTicket[];
  meetings: MetricMeeting[];
  subscribers: MetricSubscriber[];
  votes: MetricVote[];
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // ----- KPIs -----
  const qualified = leads.filter((l) => l.status === "calificado" || l.status === "cerrado").length;
  const leadConversion = leads.length ? Math.round((qualified / leads.length) * 100) : 0;
  const confirmed = meetings.filter((m) => m.status === "confirmada").length;
  const meetingRate = meetings.length ? Math.round((confirmed / meetings.length) * 100) : 0;
  const paid = tickets.filter((t) => t.price > 0);
  const revenue = paid.reduce((s, t) => s + t.price, 0);
  const avgTicket = paid.length ? Math.round(revenue / paid.length) : 0;
  const checkedIn = tickets.filter((t) => t.used).length;
  const checkinRate = tickets.length ? Math.round((checkedIn / tickets.length) * 100) : 0;
  const voteTotal = votes.reduce((s, v) => s + v.count, 0);
  const voteLeader = votes[0];

  // ----- Pipeline leads -----
  const leadCounts = Object.keys(LEAD_STATUS_META).map((s) => ({
    key: s,
    count: leads.filter((l) => l.status === s).length,
  }));
  const maxLead = Math.max(...leadCounts.map((c) => c.count), 1);

  // ----- Reuniones por estado -----
  const meetingCounts = Object.keys(MEETING_STATUS_META).map((s) => ({
    key: s,
    count: meetings.filter((m) => m.status === s).length,
  }));
  const maxMeeting = Math.max(...meetingCounts.map((c) => c.count), 1);

  // ----- Top expositores -----
  const byExhibitor = new Map<string, number>();
  meetings.forEach((m) => byExhibitor.set(m.exhibitorName, (byExhibitor.get(m.exhibitorName) ?? 0) + 1));
  const topExhibitors = [...byExhibitor.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxExhibitor = Math.max(...topExhibitors.map(([, c]) => c), 1);

  // ----- Franjas más pedidas -----
  const bySlot = new Map<string, number>();
  meetings.forEach((m) => bySlot.set(m.preferredSlot, (bySlot.get(m.preferredSlot) ?? 0) + 1));
  const topSlots = [...bySlot.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4);
  const maxSlot = Math.max(...topSlots.map(([, c]) => c), 1);

  // ----- Leads por tipo -----
  const inquiryCounts = Object.keys(INQUIRY_META).map((k) => ({
    key: k,
    count: leads.filter((l) => l.inquiryType === k).length,
  })).filter((c) => c.count > 0);
  const maxInquiry = Math.max(...inquiryCounts.map((c) => c.count), 1);

  // ----- Actividad últimos 7 días -----
  const days = React.useMemo(() => {
    const out: { label: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const count =
        leads.filter((x) => x.createdAt.slice(0, 10) === key).length +
        tickets.filter((t) => t.createdAt.slice(0, 10) === key).length +
        meetings.filter((m) => m.createdAt.slice(0, 10) === key).length +
        subscribers.filter((s) => s.createdAt.slice(0, 10) === key).length;
      out.push({ label: d.toLocaleDateString("es-AR", { weekday: "short" }).replace(".", ""), count });
    }
    return out;
  }, [leads, tickets, meetings, subscribers]);
  const maxDay = Math.max(...days.map((d) => d.count), 1);

  // ----- Ingresos por tipo -----
  const revenueByType = Object.keys(TICKET_TYPE_META).map((t) => {
    const list = paid.filter((x) => x.type === t);
    return { type: t, sum: list.reduce((s, x) => s + x.price, 0), n: list.length };
  }).filter((r) => r.n > 0);
  const maxRev = Math.max(...revenueByType.map((r) => r.sum), 1);

  const hasData = leads.length + tickets.length + meetings.length + subscribers.length + voteTotal > 0;

  if (!hasData) {
    return (
      <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-lavender/50 bg-lavender-light/30 text-center">
        <TrendingUp className="h-8 w-8 text-lavender" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          Las métricas aparecen cuando haya registros (leads, entradas, reuniones o suscriptores).
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Barra de acciones */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          Métricas calculadas en vivo sobre los registros del panel.
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            downloadCsv("expoju-metricas-resumen", [
              { seccion: "KPI", clave: "Conversión de leads (%)", valor: leadConversion },
              { seccion: "KPI", clave: "Confirmación B2B (%)", valor: meetingRate },
              { seccion: "KPI", clave: "Ticket promedio (ARS)", valor: avgTicket },
              { seccion: "KPI", clave: "Check-in puerta (%)", valor: checkinRate },
              ...leadCounts.map((c) => ({
                seccion: "Pipeline leads",
                clave: LEAD_STATUS_META[c.key].label,
                valor: c.count,
              })),
              ...meetingCounts.map((c) => ({
                seccion: "Reuniones B2B",
                clave: MEETING_STATUS_META[c.key].label,
                valor: c.count,
              })),
              ...topExhibitors.map(([name, count]) => ({
                seccion: "Top expositores",
                clave: name,
                valor: count,
              })),
              ...topSlots.map(([slot, count]) => ({
                seccion: "Franjas pedidas",
                clave: slot,
                valor: count,
              })),
              ...revenueByType.map((r) => ({
                seccion: "Ingresos por tipo",
                clave: `${TICKET_TYPE_META[r.type]} (${r.n} entradas)`,
                valor: r.sum,
              })),
              ...votes.map((v, i) => ({
                seccion: "Votos stand favorito",
                clave: `${i + 1}º ${v.exhibitorName}`,
                valor: v.count,
              })),
              ...days.map((d, i) => ({
                seccion: `Actividad ${i === days.length - 1 ? "hoy" : `-${days.length - 1 - i}d`}`,
                clave: d.label,
                valor: d.count,
              })),
            ])
          }
          className="h-8 self-start rounded-full border-violet-brand/40 text-xs font-bold text-violet-ink hover:bg-violet-brand hover:text-white"
        >
          <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
          Exportar resumen CSV
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          icon={Users}
          label="Conversión leads"
          value={`${leadConversion}%`}
          extra={`${qualified}/${leads.length} calificados`}
          tone="bg-violet-brand/10 text-violet-ink"
        />
        <Kpi
          icon={Handshake}
          label="Confirmación B2B"
          value={`${meetingRate}%`}
          extra={`${confirmed}/${meetings.length} confirmadas`}
          tone="bg-turquoise-light text-turquoise-ink"
        />
        <Kpi
          icon={TicketIcon}
          label="Ticket promedio"
          value={`$${avgTicket.toLocaleString("es-AR")}`}
          extra={`${paid.length} pagas`}
          tone="bg-amber-100 text-amber-600"
        />
        <Kpi
          icon={Activity}
          label="Check-in puerta"
          value={`${checkinRate}%`}
          extra={`${checkedIn}/${tickets.length} ingresados`}
          tone="bg-blue-bright/10 text-sky-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Pipeline de leads */}
        <ChartCard icon={Users} title="Pipeline de leads" hint="Estado comercial de cada consulta">
          <div className="flex flex-col gap-3">
            {leadCounts.map((c) => {
              const meta = LEAD_STATUS_META[c.key];
              return (
                <div key={c.key} className={cn("flex items-center gap-2.5", !mounted && "opacity-0")}>
                  <Badge variant="outline" className={cn("w-24 shrink-0 justify-center rounded-full border-0 text-[10px] font-bold", meta.chip)}>
                    {meta.label}
                  </Badge>
                  <div className="flex-1">
                    <Bar
                      label=""
                      value={mounted ? c.count : 0}
                      max={maxLead}
                      display={`${c.count} · ${leads.length ? Math.round((c.count / leads.length) * 100) : 0}%`}
                      gradient={meta.bar}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>

        {/* Reuniones por estado */}
        <ChartCard icon={Handshake} title="Ronda B2B por estado" hint="Solicitudes de reunión gestionadas">
          <div className="flex flex-col gap-3">
            {meetingCounts.map((c) => (
              <Bar
                key={c.key}
                label={MEETING_STATUS_META[c.key].label}
                value={mounted ? c.count : 0}
                max={maxMeeting}
                display={`${c.count}`}
                gradient={MEETING_STATUS_META[c.key].bar}
              />
            ))}
            <p className="mt-1 rounded-xl bg-turquoise-light/60 px-3 py-2 text-[11px] font-semibold text-turquoise-ink">
              {confirmed} confirmada/s de {meetings.length} solicitudes · franja top:{" "}
              <strong>{topSlots[0]?.[0] ?? "—"}</strong>
            </p>
          </div>
        </ChartCard>

        {/* Top expositores */}
        <ChartCard icon={Building2} title="Expositores más solicitados" hint="Ranking por reuniones pedidas">
          {topExhibitors.length === 0 ? (
            <p className="py-4 text-center text-xs text-muted-foreground">Sin solicitudes todavía.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {topExhibitors.map(([name, count], i) => (
                <div key={name} className="flex items-center gap-2.5">
                  <span className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-black text-white",
                    i === 0 ? "bg-gradient-brand" : "bg-lavender"
                  )}>
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Bar
                      label={name}
                      value={mounted ? count : 0}
                      max={maxExhibitor}
                      display={`${count}`}
                      gradient={i === 0 ? "from-violet-brand to-violet-dark" : "from-lavender to-violet-brand"}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </ChartCard>

        {/* Franjas horarias */}
        <ChartCard icon={CalendarClock} title="Franjas horarias más pedidas" hint="Slots de la ronda de negocios">
          {topSlots.length === 0 ? (
            <p className="py-4 text-center text-xs text-muted-foreground">Sin solicitudes todavía.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {topSlots.map(([slot, count]) => (
                <Bar
                  key={slot}
                  label={slot}
                  value={mounted ? count : 0}
                  max={maxSlot}
                  display={`${count}`}
                  gradient="from-blue-bright to-turquoise"
                />
              ))}
            </div>
          )}
        </ChartCard>

        {/* Leads por tipo */}
        <ChartCard icon={PieChart} title="Consultas por tipo" hint="Origen de cada lead del formulario">
          {inquiryCounts.length === 0 ? (
            <p className="py-4 text-center text-xs text-muted-foreground">Sin consultas todavía.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {inquiryCounts.map((c) => (
                <Bar
                  key={c.key}
                  label={INQUIRY_META[c.key].label}
                  value={mounted ? c.count : 0}
                  max={maxInquiry}
                  display={`${c.count}`}
                  gradient={INQUIRY_META[c.key].bar}
                />
              ))}
            </div>
          )}
        </ChartCard>

        {/* Ingresos por tipo de entrada */}
        <ChartCard icon={TicketIcon} title="Ingresos por tipo de entrada" hint={`Total: $${revenue.toLocaleString("es-AR")} ARS`}>
          {revenueByType.length === 0 ? (
            <p className="py-4 text-center text-xs text-muted-foreground">Sin entradas pagas todavía.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {revenueByType.map((r) => (
                <Bar
                  key={r.type}
                  label={`${TICKET_TYPE_META[r.type]} (${r.n})`}
                  value={mounted ? r.sum : 0}
                  max={maxRev}
                  display={`$${r.sum.toLocaleString("es-AR")}`}
                  gradient="from-turquoise to-turquoise-dark"
                />
              ))}
            </div>
          )}
        </ChartCard>

        {/* Votos del público */}
        <ChartCard icon={Trophy} title="Votos del público — stand favorito" hint={`${voteTotal} ${voteTotal === 1 ? "voto" : "votos"} anónimos · 1 por dispositivo`}>
          {votes.length === 0 ? (
            <p className="py-4 text-center text-xs text-muted-foreground">Sin votos todavía.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {votes.slice(0, 5).map((v, i) => (
                <div key={v.exhibitorId} className="flex items-center gap-2.5">
                  <span className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-black text-white",
                    i === 0 ? "bg-gradient-to-br from-amber-400 to-amber-500" : "bg-lavender"
                  )}>
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Bar
                      label={v.exhibitorName}
                      value={mounted ? v.count : 0}
                      max={Math.max(...votes.map((x) => x.count), 1)}
                      display={`${v.count} · ${voteTotal ? Math.round((v.count / voteTotal) * 100) : 0}%`}
                      gradient={i === 0 ? "from-amber-400 to-orange-500" : "from-violet-brand to-lavender"}
                    />
                  </div>
                </div>
              ))}
              {voteLeader ? (
                <p className="mt-1 rounded-xl bg-amber-50 px-3 py-2 text-[11px] font-semibold text-amber-700">
                  Líder actual: <strong>{voteLeader.exhibitorName}</strong> — se anuncia en el escenario el día de cierre.
                </p>
              ) : null}
            </div>
          )}
        </ChartCard>
      </div>

      {/* Actividad 7 días */}
      <ChartCard icon={Activity} title="Actividad de los últimos 7 días" hint="Leads + entradas + reuniones + suscriptores por día">
        <div className="flex h-28 items-end justify-between gap-2">
          {days.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5" title={`${d.label}: ${d.count} registros`}>
              <span className="text-[10px] font-bold text-violet-dark">{d.count > 0 ? d.count : ""}</span>
              <div
                className={cn(
                  "w-full rounded-t-lg bg-gradient-to-t transition-all duration-700 ease-out",
                  i === days.length - 1 ? "from-turquoise-dark to-turquoise" : "from-violet-brand/80 to-lavender"
                )}
                style={{ height: `${mounted ? Math.max((d.count / maxDay) * 88, 6) : 6}px` }}
                role="presentation"
              />
              <span className="text-[9px] font-semibold capitalize text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
