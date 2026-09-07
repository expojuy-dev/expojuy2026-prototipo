"use client";

import * as React from "react";
import {
  Lock,
  Loader2,
  Users,
  Ticket as TicketIcon,
  Handshake,
  Mail,
  TrendingUp,
  RefreshCw,
  LogOut,
  Inbox,
  Download,
  ScanLine,
  ShieldCheck,
  Trophy,
  Medal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { downloadCsv } from "@/lib/csv";
import { AdminCheckinTab } from "./admin-checkin-tab";
import { AdminMetricsTab } from "./admin-metrics-tab";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  industry: string | null;
  spaceSize: string | null;
  inquiryType: string;
  message: string;
  status: string;
  createdAt: string;
};

type Ticket = {
  id: string;
  code: string;
  type: string;
  holder: string;
  email: string;
  days: string;
  price: number;
  used: boolean;
  usedAt: string | null;
  createdAt: string;
};

type Meeting = {
  id: string;
  exhibitorName: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  preferredSlot: string;
  status: string;
  createdAt: string;
};

type Subscriber = { id: string; email: string; createdAt: string };

type AdminRole = "coordinacion" | "puerta";

type AdminData = {
  role: AdminRole;
  stats?: {
    leads: number;
    newLeads: number;
    tickets: number;
    meetings: number;
    pendingMeetings: number;
    subscribers: number;
    revenue: number;
    /** Solo en rol puerta */
    used?: number;
    /** Total de votos de la encuesta "Votá tu stand favorito" (solo coordinación) */
    votes?: number;
  };
  leads?: Lead[];
  tickets: Ticket[];
  meetings?: Meeting[];
  subscribers?: Subscriber[];
  /** Ranking agregado de la encuesta "Votá tu stand favorito" (solo coordinación). */
  votes?: { exhibitorId: string; exhibitorName: string; count: number }[];
};

const MEETING_STATUS_STYLES: Record<string, string> = {
  pendiente: "bg-amber-100 text-amber-800 border-amber-200",
  confirmada: "bg-turquoise-light text-turquoise-ink border-turquoise/40",
  rechazada: "bg-red-100 text-red-700 border-red-200",
};

const LEAD_STATUS_STYLES: Record<string, string> = {
  nuevo: "bg-lavender/30 text-violet-dark border-violet-brand/30",
  contactado: "bg-amber-100 text-amber-800 border-amber-200",
  calificado: "bg-turquoise-light text-turquoise-ink border-turquoise/40",
  cerrado: "bg-muted text-muted-foreground border-border",
};

const INQUIRY_LABELS: Record<string, string> = {
  expositor: "Expositor",
  general: "Consulta general",
  prensa: "Prensa",
  sponsoreo: "Sponsoreo",
  otro: "Otro",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        "sticky top-0 z-10 bg-lavender-light/95 px-3 py-2.5 text-left text-[11px] font-extrabold uppercase tracking-wider text-violet-dark backdrop-blur",
        className
      )}
    >
      {children}
    </th>
  );
}

function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn("px-3 py-2.5 align-middle text-sm text-graphite", className)}>{children}</td>;
}

function EmptyRow({ cols, label }: { cols: number; label: string }) {
  return (
    <tr>
      <td colSpan={cols} className="px-3 py-10 text-center text-sm text-muted-foreground">
        <Inbox className="mx-auto mb-2 h-8 w-8 text-lavender" aria-hidden="true" />
        {label}
      </td>
    </tr>
  );
}

/** Encabezado de cada pestaña de datos, con botón de export CSV. */
function TabToolbar({
  title,
  description,
  onExport,
}: {
  title: string;
  description: string;
  onExport: () => void;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
      <div>
        <h4 className="font-display text-sm font-extrabold text-ink">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={onExport}
        className="h-8 rounded-full border-violet-brand/40 text-xs font-bold text-violet-ink hover:bg-violet-brand hover:text-white"
      >
        <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
        Exportar CSV
      </Button>
    </div>
  );
}

export function AdminPanel() {
  const [open, setOpen] = React.useState(false);
  const [authed, setAuthed] = React.useState(false);
  const [passcode, setPasscode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<AdminData | null>(null);
  const [savingId, setSavingId] = React.useState<string | null>(null);

  const isDoor = data?.role === "puerta";

  const loadData = React.useCallback(async (code: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: code }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error de acceso");
      setData(json as AdminData);
      setAuthed(true);
      toast.success(
        json.role === "puerta"
          ? "Acceso de Puerta — check-in de entradas habilitado"
          : "Bienvenida/o al panel de organización"
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo acceder al panel");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loadData(passcode);
    } catch {
      /* toast ya mostrado */
    }
  };

  const updateStatus = async (kind: "lead" | "meeting", id: string, status: string) => {
    setSavingId(id);
    try {
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode, kind, id, status }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error al actualizar");
      setData((prev) => {
        if (!prev) return prev;
        if (kind === "meeting") {
          const meetings = prev.meetings ?? [];
          return {
            ...prev,
            meetings: meetings.map((m) => (m.id === id ? { ...m, status } : m)),
            stats: prev.stats
              ? {
                  ...prev.stats,
                  pendingMeetings: meetings.filter((m) =>
                    m.id === id ? status === "pendiente" : m.status === "pendiente"
                  ).length,
                }
              : prev.stats,
          };
        }
        const leads = prev.leads ?? [];
        return {
          ...prev,
          leads: leads.map((l) => (l.id === id ? { ...l, status } : l)),
          stats: prev.stats
            ? {
                ...prev.stats,
                newLeads: leads.filter((l) => (l.id === id ? status === "nuevo" : l.status === "nuevo"))
                  .length,
              }
            : prev.stats,
        };
      });
      if (kind === "meeting" && json.emailSimulated) {
        toast.success(`Estado actualizado a "${status}" · Email de aviso enviado (simulado)`);
      } else {
        toast.success(`Estado actualizado a "${status}"`);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al actualizar");
    } finally {
      setSavingId(null);
    }
  };

  const close = (o: boolean) => {
    setOpen(o);
    if (!o) {
      setAuthed(false);
      setPasscode("");
      setData(null);
    }
  };

  const refresh = () => loadData(passcode).catch(() => undefined);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex cursor-pointer items-center gap-2 text-sm text-white/70 transition hover:text-turquoise"
      >
        <span
          className="h-1 w-1 rounded-full bg-lavender transition-all group-hover:w-3 group-hover:bg-turquoise"
          aria-hidden="true"
        />
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Panel de Organización
      </button>

      <Dialog open={open} onOpenChange={close}>
        <DialogContent className="max-w-5xl overflow-hidden rounded-3xl p-0 sm:max-w-5xl">
          {authed && data ? (
            <div className="max-h-[85vh] overflow-y-auto">
              {/* Header del panel */}
              <div className="relative overflow-hidden bg-gradient-to-br from-deep via-violet-dark to-violet-brand px-6 py-6 text-white">
                <div className="dots-pattern-light absolute inset-0 opacity-20" aria-hidden="true" />
                <div className="relative flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-turquoise">
                      ExpoJuy 2026 · Uso interno
                    </p>
                    <DialogHeader className="mt-1 space-y-0">
                      <DialogTitle className="font-display text-xl font-extrabold text-white">
                        {isDoor ? "Acceso · Check-in en Puerta" : "Panel de Organización"}
                      </DialogTitle>
                      <DialogDescription className="text-sm text-white/70">
                        {isDoor
                          ? "Escaneo y validación de entradas en el ingreso al predio."
                          : "Leads comerciales, ticketing, ronda B2B y newsletter en un solo lugar."}
                      </DialogDescription>
                    </DialogHeader>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider",
                        isDoor
                          ? "border-turquoise/50 bg-turquoise/15 text-turquoise"
                          : "border-lavender/50 bg-white/10 text-lavender"
                      )}
                    >
                      {isDoor ? (
                        <ScanLine className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      Rol: {isDoor ? "Puerta" : "Coordinación"}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={refresh}
                      disabled={loading}
                      className="rounded-full border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    >
                      <RefreshCw className={cn("mr-1.5 h-3.5 w-3.5", loading && "animate-spin")} aria-hidden="true" />
                      Actualizar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => close(false)}
                      className="rounded-full border-white/25 bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      <LogOut className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                      Salir
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                {isDoor ? (
                  <div className="relative mt-6 grid grid-cols-2 gap-3">
                    {[
                      { icon: TicketIcon, label: "Entradas emitidas", value: data.stats?.tickets ?? data.tickets.length, cls: "text-lavender" },
                      { icon: ScanLine, label: "Ingresos registrados", value: data.stats?.used ?? data.tickets.filter((t) => t.used).length, cls: "text-turquoise" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur transition hover:bg-white/15"
                      >
                        <s.icon className={cn("h-5 w-5", s.cls)} aria-hidden="true" />
                        <p className="font-display mt-2 text-2xl font-black leading-none">{s.value}</p>
                        <p className="mt-1 text-[11px] font-semibold text-white/80">{s.label}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {[
                    { icon: Users, label: "Leads", value: data.stats?.leads ?? 0, extra: `${data.stats?.newLeads ?? 0} nuevos`, cls: "text-turquoise" },
                    { icon: TicketIcon, label: "Entradas", value: data.stats?.tickets ?? 0, extra: "emitidas", cls: "text-lavender" },
                    { icon: Handshake, label: "Reuniones B2B", value: data.stats?.meetings ?? 0, extra: `${data.stats?.pendingMeetings ?? 0} pendientes`, cls: "text-blue-bright" },
                    { icon: Mail, label: "Suscriptores", value: data.stats?.subscribers ?? 0, extra: "newsletter", cls: "text-turquoise" },
                    { icon: TrendingUp, label: "Facturación", value: `$${((data.stats?.revenue ?? 0) / 1000).toFixed(0)}k`, extra: "ARS estimada", cls: "text-lavender" },
                    { icon: Trophy, label: "Votos público", value: data.stats?.votes ?? 0, extra: "stand favorito", cls: "text-amber-300" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur transition hover:bg-white/15"
                    >
                      <s.icon className={cn("h-5 w-5", s.cls)} aria-hidden="true" />
                      <p className="font-display mt-2 text-2xl font-black leading-none">{s.value}</p>
                      <p className="mt-1 text-[11px] font-semibold text-white/80">{s.label}</p>
                      <p className="text-[10px] text-white/55">{s.extra}</p>
                    </div>
                  ))}
                </div>
                )}
              </div>

              {/* Tabs de datos */}
              <div className="px-4 pb-6 pt-4 sm:px-6">
                <Tabs defaultValue={isDoor ? "checkin" : "meetings"}>
                  <TabsList className="mb-4 flex h-auto w-full flex-wrap gap-1 rounded-2xl bg-lavender-light/70 p-1.5">
                    {!isDoor ? (
                      <>
                        <TabsTrigger value="meetings" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-violet-dark">
                          Reuniones B2B ({data.meetings?.length ?? 0})
                        </TabsTrigger>
                        <TabsTrigger value="leads" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-violet-dark">
                          Leads ({data.leads?.length ?? 0})
                        </TabsTrigger>
                      </>
                    ) : null}
                    <TabsTrigger value="checkin" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-violet-dark">
                      <ScanLine className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                      {isDoor ? "Check-in" : "Check-in · Puerta"} ({data.tickets.filter((t) => t.used).length})
                    </TabsTrigger>
                    {!isDoor ? (
                      <>
                        <TabsTrigger value="tickets" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-violet-dark">
                          Entradas ({data.tickets.length})
                        </TabsTrigger>
                        <TabsTrigger value="subs" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-violet-dark">
                          Suscriptores ({data.subscribers?.length ?? 0})
                        </TabsTrigger>
                        <TabsTrigger value="votes" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-violet-dark">
                          <Trophy className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                          Votos ({data.stats?.votes ?? 0})
                        </TabsTrigger>
                        <TabsTrigger value="metrics" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-violet-dark">
                          <TrendingUp className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                          Métricas
                        </TabsTrigger>
                      </>
                    ) : null}
                  </TabsList>

                  {/* Reuniones B2B */}
                  <TabsContent value="meetings">
                    <TabToolbar
                      title="Ronda de negocios digital"
                      description="Solicitudes de reunión B2B con expositores."
                      onExport={() =>
                        downloadCsv(
                          "expoju-reuniones-b2b",
                          (data.meetings ?? []).map((m) => ({
                            expositor: m.exhibitorName,
                            solicitante: m.name,
                            email: m.email,
                            empresa: m.company ?? "",
                            franja: m.preferredSlot,
                            estado: m.status,
                            mensaje: m.message,
                            fecha: m.createdAt,
                          }))
                        )
                      }
                    />
                    <div className="max-h-[46vh] overflow-auto rounded-2xl border border-lavender/40">
                      <table className="w-full min-w-[760px] border-collapse">
                        <thead>
                          <tr>
                            <Th>Expositor</Th>
                            <Th>Solicitante</Th>
                            <Th>Franja propuesta</Th>
                            <Th>Estado</Th>
                            <Th>Gestionar</Th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-lavender/30">
                          {!(data.meetings ?? []).length ? (
                            <EmptyRow cols={5} label="Todavía no hay solicitudes de reunión B2B." />
                          ) : (
                            (data.meetings ?? []).map((m) => (
                              <tr key={m.id} className="transition hover:bg-lavender-light/40">
                                <Td>
                                  <p className="font-bold text-ink">{m.exhibitorName}</p>
                                  <p className="text-xs text-muted-foreground">{fmtDate(m.createdAt)}</p>
                                </Td>
                                <Td>
                                  <p className="font-semibold">{m.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {m.company ? `${m.company} · ` : ""}
                                    {m.email}
                                  </p>
                                </Td>
                                <Td className="whitespace-nowrap text-xs">{m.preferredSlot}</Td>
                                <Td>
                                  <Badge variant="outline" className={cn("rounded-full", MEETING_STATUS_STYLES[m.status])}>
                                    {m.status}
                                  </Badge>
                                </Td>
                                <Td>
                                  <Select
                                    value={m.status}
                                    onValueChange={(v) => updateStatus("meeting", m.id, v)}
                                    disabled={savingId === m.id}
                                  >
                                    <SelectTrigger className="h-8 w-[140px] rounded-full border-lavender/50 text-xs">
                                      {savingId === m.id ? (
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                                      ) : (
                                        <SelectValue />
                                      )}
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pendiente">Pendiente</SelectItem>
                                      <SelectItem value="confirmada">Confirmada</SelectItem>
                                      <SelectItem value="rechazada">Rechazada</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </Td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  {/* Leads */}
                  <TabsContent value="leads">
                    <TabToolbar
                      title="Leads comerciales"
                      description="Consultas del formulario de contacto con pipeline de gestión."
                      onExport={() =>
                        downloadCsv(
                          "expoju-leads",
                          (data.leads ?? []).map((l) => ({
                            nombre: l.name,
                            email: l.email,
                            telefono: l.phone ?? "",
                            empresa: l.company ?? "",
                            rubro: l.industry ?? "",
                            espacio: l.spaceSize ?? "",
                            tipo: INQUIRY_LABELS[l.inquiryType] ?? l.inquiryType,
                            estado: l.status,
                            mensaje: l.message,
                            fecha: l.createdAt,
                          }))
                        )
                      }
                    />
                    <div className="max-h-[46vh] overflow-auto rounded-2xl border border-lavender/40">
                      <table className="w-full min-w-[820px] border-collapse">
                        <thead>
                          <tr>
                            <Th>Contacto</Th>
                            <Th>Tipo</Th>
                            <Th>Empresa / Rubro</Th>
                            <Th>Mensaje</Th>
                            <Th>Estado</Th>
                            <Th>Gestionar</Th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-lavender/30">
                          {!(data.leads ?? []).length ? (
                            <EmptyRow cols={6} label="Todavía no hay consultas del formulario de contacto." />
                          ) : (
                            (data.leads ?? []).map((l) => (
                              <tr key={l.id} className="transition hover:bg-lavender-light/40">
                                <Td>
                                  <p className="font-bold text-ink">{l.name}</p>
                                  <p className="text-xs text-muted-foreground">{l.email}</p>
                                  {l.phone ? <p className="text-xs text-muted-foreground">{l.phone}</p> : null}
                                  <p className="text-[10px] text-muted-foreground">{fmtDate(l.createdAt)}</p>
                                </Td>
                                <Td>
                                  <Badge variant="outline" className="rounded-full border-violet-brand/30 bg-violet-brand/10 text-violet-ink">
                                    {INQUIRY_LABELS[l.inquiryType] ?? l.inquiryType}
                                  </Badge>
                                </Td>
                                <Td className="text-xs">
                                  {l.company ? <p className="font-semibold">{l.company}</p> : null}
                                  {l.industry ? <p className="text-muted-foreground">{l.industry}</p> : null}
                                  {l.spaceSize ? <p className="text-muted-foreground">Espacio: {l.spaceSize}</p> : null}
                                </Td>
                                <Td className="max-w-[220px] truncate text-xs text-muted-foreground" >
                                  <span title={l.message}>{l.message}</span>
                                </Td>
                                <Td>
                                  <Badge variant="outline" className={cn("rounded-full", LEAD_STATUS_STYLES[l.status])}>
                                    {l.status}
                                  </Badge>
                                </Td>
                                <Td>
                                  <Select value={l.status} onValueChange={(v) => updateStatus("lead", l.id, v)} disabled={savingId === l.id}>
                                    <SelectTrigger className="h-8 w-[130px] rounded-full border-lavender/50 text-xs">
                                      {savingId === l.id ? (
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                                      ) : (
                                        <SelectValue />
                                      )}
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="nuevo">Nuevo</SelectItem>
                                      <SelectItem value="contactado">Contactado</SelectItem>
                                      <SelectItem value="calificado">Calificado</SelectItem>
                                      <SelectItem value="cerrado">Cerrado</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </Td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  {/* Check-in en puerta */}
                  <TabsContent value="checkin">
                    <AdminCheckinTab
                      passcode={passcode}
                      tickets={data.tickets}
                      onUpdated={() => loadData(passcode).catch(() => undefined)}
                    />
                  </TabsContent>

                  {/* Tickets */}
                  <TabsContent value="tickets">
                    <TabToolbar
                      title="Entradas emitidas"
                      description="Ticketing con QR — código, tipo y estado de uso."
                      onExport={() =>
                        downloadCsv(
                          "expoju-entradas",
                          data.tickets.map((t) => ({
                            codigo: t.code,
                            titular: t.holder,
                            email: t.email,
                            tipo: t.type,
                            dias: t.days,
                            precio_ars: t.price,
                            usada: t.used ? "sí" : "no",
                            ingreso: t.usedAt ?? "",
                            emitida: t.createdAt,
                          }))
                        )
                      }
                    />
                    <div className="max-h-[46vh] overflow-auto rounded-2xl border border-lavender/40">
                      <table className="w-full min-w-[720px] border-collapse">
                        <thead>
                          <tr>
                            <Th>Código</Th>
                            <Th>Titular</Th>
                            <Th>Tipo</Th>
                            <Th>Días</Th>
                            <Th>Precio</Th>
                            <Th>Usada</Th>
                            <Th>Emitida</Th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-lavender/30">
                          {data.tickets.length === 0 ? (
                            <EmptyRow cols={7} label="Todavía no hay entradas emitidas." />
                          ) : (
                            data.tickets.map((t) => (
                              <tr key={t.id} className="transition hover:bg-lavender-light/40">
                                <Td className="font-mono text-xs font-bold text-violet-ink">{t.code}</Td>
                                <Td>
                                  <p className="font-semibold">{t.holder}</p>
                                  <p className="text-xs text-muted-foreground">{t.email}</p>
                                </Td>
                                <Td className="text-xs uppercase">{t.type}</Td>
                                <Td className="text-center">{t.days}</Td>
                                <Td className="whitespace-nowrap text-xs">
                                  {t.price === 0 ? "Gratuita" : `$${t.price.toLocaleString("es-AR")}`}
                                </Td>
                                <Td>
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "rounded-full",
                                      t.used
                                        ? "border-red-200 bg-red-100 text-red-700"
                                        : "border-turquoise/40 bg-turquoise-light text-turquoise-ink"
                                    )}
                                  >
                                    {t.used ? "Sí" : "No"}
                                  </Badge>
                                  {t.used && t.usedAt ? (
                                    <p className="mt-0.5 text-[10px] font-semibold text-turquoise-ink">
                                      {fmtDate(t.usedAt)}
                                    </p>
                                  ) : null}
                                </Td>
                                <Td className="whitespace-nowrap text-xs text-muted-foreground">{fmtDate(t.createdAt)}</Td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  {/* Suscriptores */}
                  <TabsContent value="subs">
                    <TabToolbar
                      title="Newsletter"
                      description="Suscriptores a novedades de ExpoJuy 2026."
                      onExport={() =>
                        downloadCsv(
                          "expoju-suscriptores",
                          (data.subscribers ?? []).map((s) => ({ email: s.email, suscripto: s.createdAt }))
                        )
                      }
                    />
                    <div className="max-h-[46vh] overflow-auto rounded-2xl border border-lavender/40">
                      <table className="w-full min-w-[420px] border-collapse">
                        <thead>
                          <tr>
                            <Th>Email</Th>
                            <Th>Suscripto</Th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-lavender/30">
                          {!(data.subscribers ?? []).length ? (
                            <EmptyRow cols={2} label="Todavía no hay suscriptores al newsletter." />
                          ) : (
                            (data.subscribers ?? []).map((s) => (
                              <tr key={s.id} className="transition hover:bg-lavender-light/40">
                                <Td className="font-semibold">{s.email}</Td>
                                <Td className="whitespace-nowrap text-xs text-muted-foreground">{fmtDate(s.createdAt)}</Td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  {/* Votos "Votá tu stand favorito" */}
                  <TabsContent value="votes">
                    {(() => {
                      const votes = data.votes ?? [];
                      const total = data.stats?.votes ?? 0;
                      const max = Math.max(...votes.map((v) => v.count), 1);
                      const medal = [
                        "bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950",
                        "bg-gradient-to-br from-slate-200 to-slate-400 text-slate-800",
                        "bg-gradient-to-br from-orange-300 to-orange-500 text-orange-950",
                      ];
                      return (
                        <>
                          <TabToolbar
                            title="Encuesta del público — Votá tu stand favorito"
                            description={`Premio del público · ${total} ${total === 1 ? "voto emitido" : "votos emitidos"} · 1 voto por dispositivo (anónimo, puede cambiarlo).`}
                            onExport={() =>
                              downloadCsv(
                                "expoju-votos-stand-favorito",
                                votes.map((v, i) => ({
                                  posicion: i + 1,
                                  expositor: v.exhibitorName,
                                  votos: v.count,
                                  porcentaje: total > 0 ? `${((v.count / total) * 100).toFixed(1)}%` : "0%",
                                }))
                              )
                            }
                          />
                          {votes.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-lavender/50 bg-lavender-light/40 px-4 py-10 text-center">
                              <Trophy className="mx-auto mb-2 h-8 w-8 text-lavender" aria-hidden="true" />
                              <p className="text-sm text-muted-foreground">
                                Todavía no hay votos — la banda "Votá tu stand favorito" aparece en la sección Expositores.
                              </p>
                            </div>
                          ) : (
                            <div className="grid gap-2.5">
                              {votes.map((v, i) => (
                                <div
                                  key={v.exhibitorId}
                                  className={cn(
                                    "flex items-center gap-3 rounded-2xl border p-3 transition hover:bg-lavender-light/40",
                                    i === 0
                                      ? "border-amber-300/60 bg-gradient-to-r from-amber-50/80 to-transparent"
                                      : "border-lavender/40"
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black",
                                      medal[i] ?? "bg-lavender-light text-violet-ink"
                                    )}
                                  >
                                    {i === 0 ? <Medal className="h-4 w-4" aria-hidden="true" /> : i + 1}
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-baseline justify-between gap-2">
                                      <p className="truncate text-sm font-bold text-ink">{v.exhibitorName}</p>
                                      <p className="shrink-0 text-[11px] font-bold text-violet-ink">
                                        {total > 0 ? `${((v.count / total) * 100).toFixed(0)}%` : "0%"}
                                        <span className="ml-1 font-mono font-semibold text-muted-foreground">
                                          · {v.count} {v.count === 1 ? "voto" : "votos"}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-lavender-light">
                                      <div
                                        className={cn(
                                          "h-full rounded-full transition-all duration-700 ease-out",
                                          i === 0
                                            ? "bg-gradient-to-r from-amber-400 to-amber-500"
                                            : "bg-gradient-brand"
                                        )}
                                        style={{ width: `${Math.max((v.count / max) * 100, 8)}%` }}
                                        role="presentation"
                                      />
                                    </div>
                                  </div>
                                  {i === 0 ? (
                                    <Badge variant="outline" className="shrink-0 rounded-full border-amber-300/60 bg-amber-100 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                                      Líder
                                    </Badge>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </TabsContent>
                  {/* Métricas */}
                  <TabsContent value="metrics">
                    <AdminMetricsTab
                      leads={data.leads ?? []}
                      tickets={data.tickets}
                      meetings={data.meetings ?? []}
                      subscribers={data.subscribers ?? []}
                      votes={data.votes ?? []}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ) : (
            /* Login con contraseña */
            <div className="px-6 py-8 sm:px-10">
              <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                <span className="gradient-ring flex h-16 w-16 items-center justify-center rounded-2xl bg-lavender-light">
                  <Lock className="h-7 w-7 text-violet-ink" aria-hidden="true" />
                </span>
                <DialogHeader className="mt-5 items-center space-y-1.5 text-center">
                  <DialogTitle className="font-display text-xl font-extrabold text-ink">
                    Panel de Organización
                  </DialogTitle>
                  <DialogDescription className="text-sm">
                    Acceso exclusivo del equipo de la Cámara de Comercio Exterior de Jujuy.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitPasscode} className="mt-6 flex w-full flex-col gap-3">
                  <Input
                    type="password"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Contraseña de organización"
                    aria-label="Contraseña de organización"
                    className="h-11 rounded-xl text-center"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-brand h-11 rounded-full text-sm font-bold text-white disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        Verificando...
                      </>
                    ) : (
                      "Ingresar al panel"
                    )}
                  </Button>
                </form>
                <div className="mt-5 w-full rounded-2xl border border-lavender/40 bg-lavender-light/50 p-3.5 text-left">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-violet-ink">
                    Roles de acceso
                  </p>
                  <div className="mt-2 flex flex-col gap-1.5 text-xs text-graphite">
                    <span className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-turquoise" aria-hidden="true" />
                      <span>
                        <strong className="text-ink">Coordinación</strong> — acceso completo: leads, reuniones B2B, entradas, newsletter y métricas.
                      </span>
                    </span>
                    <span className="flex items-start gap-2">
                      <ScanLine className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-brand" aria-hidden="true" />
                      <span>
                        <strong className="text-ink">Puerta</strong> — solo check-in de entradas en el ingreso al predio.
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
