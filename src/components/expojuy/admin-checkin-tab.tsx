"use client";

import * as React from "react";
import {
  ScanLine,
  Camera,
  CameraOff,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Undo2,
  Keyboard,
  Ticket as TicketIcon,
  History,
  User,
  ClipboardList,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { downloadCsv } from "@/lib/csv";

export type CheckinTicket = {
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

type ResultState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ok"; ticket: CheckinTicket }
  | { status: "reverted"; ticket: CheckinTicket }
  | { status: "used"; ticket: CheckinTicket; usedAt: string | null }
  | { status: "notfound"; message: string }
  | { status: "error"; message: string };

type BarcodeDetectorLike = {
  detect: (v: HTMLVideoElement) => Promise<{ rawValue: string }[]>;
};
type BarcodeDetectorCtor = new (o: { formats: string[] }) => BarcodeDetectorLike;

type AuditLog = {
  id: string;
  code: string;
  holder: string;
  action: string; // "checkin" | "revert"
  operator: string;
  source: string; // "manual" | "camara"
  createdAt: string;
};

const TICKET_TYPE_LABELS: Record<string, string> = {
  visitante: "Visitante",
  prensa: "Prensa",
  b2b: "Empresarial B2B",
};

function fmtTime(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function AdminCheckinTab({
  passcode,
  tickets,
  onUpdated,
}: {
  passcode: string;
  tickets: CheckinTicket[];
  onUpdated: () => void;
}) {
  const [code, setCode] = React.useState("");
  const [operator, setOperator] = React.useState("");
  const [result, setResult] = React.useState<ResultState>({ status: "idle" });
  const [auditLogs, setAuditLogs] = React.useState<AuditLog[]>([]);
  const [auditTotal, setAuditTotal] = React.useState(0);
  const [scanning, setScanning] = React.useState(false);
  const [cameraError, setCameraError] = React.useState<string | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const busyRef = React.useRef(false);

  const usedTickets = React.useMemo(
    () =>
      tickets
        .filter((t) => t.used)
        .sort((a, b) => (b.usedAt ?? "").localeCompare(a.usedAt ?? "")),
    [tickets]
  );

  // Operador persistente (quién está parado en la puerta escaneando)
  React.useEffect(() => {
    const saved = window.localStorage.getItem("expojuy-operator");
    if (saved) setOperator(saved);
  }, []);

  const changeOperator = (value: string) => {
    setOperator(value);
    window.localStorage.setItem("expojuy-operator", value);
  };

  const fetchAuditLogs = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/checkin?passcode=${encodeURIComponent(passcode)}`);
      if (!res.ok) return;
      const json = await res.json();
      setAuditLogs(json.logs ?? []);
      setAuditTotal(json.total ?? 0);
    } catch {
      /* silencioso: la auditoría no bloquea la operación */
    }
  }, [passcode]);

  React.useEffect(() => {
    void fetchAuditLogs();
  }, [fetchAuditLogs]);

  const submitCode = React.useCallback(
    async (
      rawCode: string,
      action: "checkin" | "revert" = "checkin",
      source: "manual" | "camara" = "manual"
    ) => {
      const clean = rawCode.trim().toUpperCase();
      if (!clean) return;
      busyRef.current = true;
      setResult({ status: "loading" });
      try {
        const res = await fetch("/api/checkin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            passcode,
            code: clean,
            action,
            operator: operator.trim() || undefined,
            source,
          }),
        });
        const json = await res.json();
        if (!res.ok) {
          if (res.status === 404) {
            setResult({ status: "notfound", message: json.error ?? "No existe una entrada con ese código" });
            toast.error(json.error ?? "Código no encontrado");
          } else if (res.status === 409 && action === "checkin") {
            setResult({
              status: "used",
              ticket: json.ticket,
              usedAt: json.usedAt ?? json.ticket?.usedAt ?? null,
            });
            toast.warning("Entrada ya utilizada", { description: clean });
          } else {
            setResult({ status: "error", message: json.error ?? "Error en el check-in" });
            toast.error(json.error ?? "Error en el check-in");
          }
          return;
        }
        if (action === "revert") {
          setResult({ status: "reverted", ticket: json.ticket });
          toast.success("Check-in revertido", { description: json.ticket.code });
        } else {
          setResult({ status: "ok", ticket: json.ticket });
          toast.success(`¡Bienvenido/a, ${json.ticket.holder}!`, {
            description: `${json.ticket.code} · ${TICKET_TYPE_LABELS[json.ticket.type] ?? json.ticket.type}`,
          });
        }
        onUpdated();
        void fetchAuditLogs();
      } catch {
        setResult({ status: "error", message: "Error de conexión con el servidor" });
        toast.error("Error de conexión");
      } finally {
        busyRef.current = false;
      }
    },
    [passcode, operator, onUpdated, fetchAuditLogs]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCode(code);
  };

  const stopCamera = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setScanning(false);
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    const Ctor = (window as unknown as { BarcodeDetector?: BarcodeDetectorCtor }).BarcodeDetector;
    if (!Ctor) {
      setCameraError(
        "Este navegador no soporta detección de QR (BarcodeDetector). Usá el ingreso manual."
      );
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      setScanning(true);
      // Esperar al próximo frame para tener el <video> montado
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => undefined);
        }
      });
      const barcodeDetector = new Ctor({ formats: ["qr_code"] });

      intervalRef.current = setInterval(async () => {
        if (!videoRef.current || busyRef.current) return;
        if (videoRef.current.readyState < 2) return;
        try {
          const codes = await barcodeDetector.detect(videoRef.current);
          if (codes.length > 0) {
            const raw = codes[0].rawValue;
            // El QR de ExpoJuy tiene el formato "EXPOJUY2026|EJ26-XXXXXX|tipo|titular"
            const match = raw.match(/EJ26-[0-9A-F]{6}/i);
            const found = match ? match[0] : raw;
            setCode(found.toUpperCase());
            stopCamera();
            void submitCode(found, "checkin", "camara");
          }
        } catch {
          /* frame ilegible: seguimos */
        }
      }, 450);
    } catch (err) {
      setCameraError(
        err instanceof Error && err.name === "NotAllowedError"
          ? "Permiso de cámara denegado. Usá el ingreso manual."
          : "No se pudo acceder a la cámara. Usá el ingreso manual."
      );
      stopCamera();
    }
  };

  // Limpieza al desmontar / cerrar el panel
  React.useEffect(() => stopCamera, [stopCamera]);

  const stats = {
    emitidas: tickets.length,
    ingresadas: usedTickets.length,
    pendientes: tickets.length - usedTickets.length,
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Columna izquierda: escaneo / código manual */}
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-lavender/40 bg-surface p-5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-display flex items-center gap-2 text-sm font-extrabold text-ink">
              <ScanLine className="h-4 w-4 text-turquoise-ink" aria-hidden="true" />
              Control de acceso · Puerta
            </h4>
            <div className="flex gap-1.5">
              <Badge variant="outline" className="rounded-full border-lavender/50 bg-lavender-light/60 text-[10px] font-bold text-violet-dark">
                {stats.emitidas} emitidas
              </Badge>
              <Badge variant="outline" className="rounded-full border-turquoise/40 bg-turquoise-light text-[10px] font-bold text-turquoise-ink">
                {stats.ingresadas} ingresadas
              </Badge>
              <Badge variant="outline" className="rounded-full border-amber-200 bg-amber-50 text-[10px] font-bold text-amber-700">
                {stats.pendientes} pendientes
              </Badge>
            </div>
          </div>

          {/* Operador (auditoría: quién escanea) */}
          <div className="mt-4">
            <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              <User className="h-3 w-3" aria-hidden="true" />
              Operador en puerta
            </label>
            <Input
              value={operator}
              onChange={(e) => changeOperator(e.target.value)}
              placeholder="Ej.: Vale · Puerta 1"
              aria-label="Nombre del operador que escanea"
              maxLength={40}
              className="h-9 rounded-full border-lavender/50 bg-surface text-sm"
            />
            <p className="mt-1 text-[10px] text-muted-foreground">
              Se registra en cada movimiento del historial de auditoría.
            </p>
          </div>

          {/* Cámara */}
          <div className="mt-4 overflow-hidden rounded-xl border border-lavender/50">
            {scanning ? (
              <div className="relative aspect-video bg-deep">
                <video ref={videoRef} muted playsInline className="h-full w-full object-cover" aria-label="Vista de cámara para escanear QR" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-40 w-40 rounded-2xl border-4 border-turquoise/90 shadow-[0_0_0_9999px_rgba(42,23,69,0.35)]" />
                </div>
                <p className="absolute inset-x-0 bottom-0 bg-deep/70 py-1.5 text-center text-[11px] font-semibold text-turquoise">
                  Apuntá al QR de la entrada…
                </p>
              </div>
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center gap-2 bg-lavender-light/40 text-center">
                <ScanLine className="h-10 w-10 text-lavender" aria-hidden="true" />
                <p className="max-w-[240px] text-xs text-muted-foreground">
                  Escaneá el QR de la entrada con la cámara o ingresá el código a mano.
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {scanning ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={stopCamera}
                className="rounded-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <CameraOff className="mr-1.5 h-4 w-4" aria-hidden="true" /> Detener cámara
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                onClick={startCamera}
                className="bg-deep rounded-full font-bold text-white hover:bg-violet-dark"
              >
                <Camera className="mr-1.5 h-4 w-4" aria-hidden="true" /> Escanear QR
              </Button>
            )}
          </div>
          {cameraError ? (
            <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-amber-50 p-2 text-[11px] font-medium text-amber-700">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {cameraError}
            </p>
          ) : null}

          {/* Código manual */}
          <form onSubmit={onSubmit} className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <Keyboard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lavender" aria-hidden="true" />
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="EJ26-XXXXXX"
                aria-label="Código de entrada"
                className="h-11 rounded-xl pl-9 font-mono text-sm font-bold uppercase tracking-wider"
                maxLength={16}
              />
            </div>
            <Button
              type="submit"
              disabled={result.status === "loading" || code.trim().length < 4}
              className="bg-gradient-brand h-11 rounded-xl px-5 font-bold text-white disabled:opacity-60"
            >
              {result.status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                "Validar"
              )}
            </Button>
          </form>
        </div>

        {/* Resultado */}
        <ResultPanel result={result} onRevert={(c) => submitCode(c, "revert")} onReset={() => setResult({ status: "idle" })} />
      </div>

      {/* Columna derecha: últimos ingresos */}
      <div className="flex flex-col rounded-2xl border border-lavender/40 bg-surface">
        <div className="flex items-center justify-between gap-2 border-b border-lavender/30 px-4 py-3">
          <h4 className="font-display flex items-center gap-2 text-sm font-extrabold text-ink">
            <History className="h-4 w-4 text-violet-ink" aria-hidden="true" />
            Últimos ingresos
          </h4>
          <span className="text-[11px] font-semibold text-muted-foreground">
            {usedTickets.length} de {tickets.length}
          </span>
        </div>
        <div className="max-h-[380px] min-h-[200px] overflow-y-auto p-2 custom-scrollbar">
          {usedTickets.length === 0 ? (
            <div className="flex h-full min-h-[160px] flex-col items-center justify-center gap-2 text-center">
              <TicketIcon className="h-8 w-8 text-lavender" aria-hidden="true" />
              <p className="text-xs text-muted-foreground">
                Todavía no hay ingresos registrados en puerta.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {usedTickets.map((t) => (
                <li
                  key={t.code}
                  className="flex items-center justify-between gap-2 rounded-xl border border-transparent px-2.5 py-2 transition hover:border-lavender/40 hover:bg-lavender-light/40"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink">{t.holder}</p>
                    <p className="font-mono text-[11px] font-semibold text-violet-ink">{t.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-turquoise-ink">{fmtTime(t.usedAt)}</p>
                    <p className="text-[10px] uppercase text-muted-foreground">
                      {TICKET_TYPE_LABELS[t.type] ?? t.type}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Historial de auditoría (quién escaneó, cuándo y cómo) */}
      <div className="rounded-2xl border border-lavender/40 bg-surface lg:col-span-2">
        <div className="flex items-center justify-between gap-2 border-b border-lavender/30 px-4 py-3">
          <h4 className="font-display flex items-center gap-2 text-sm font-extrabold text-ink">
            <ClipboardList className="h-4 w-4 text-turquoise-ink" aria-hidden="true" />
            Historial de auditoría
          </h4>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-full border-turquoise/40 bg-turquoise-light text-[10px] font-bold text-turquoise-ink">
              {auditTotal} registros
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                downloadCsv(
                  "expoju-auditoria-checkin",
                  auditLogs.map((log) => ({
                    fecha: new Date(log.createdAt).toLocaleString("es-AR"),
                    accion: log.action === "checkin" ? "Ingreso" : "Revertido",
                    codigo: log.code,
                    titular: log.holder,
                    operador: log.operator,
                    origen: log.source === "camara" ? "cámara" : "manual",
                  }))
                )
              }
              disabled={auditLogs.length === 0}
              className="h-7 rounded-full px-2.5 text-[11px] font-bold text-muted-foreground hover:text-violet-ink disabled:opacity-40"
              title="Exporta los últimos 50 registros visibles"
            >
              <Download className="h-3 w-3" aria-hidden="true" />
              CSV
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => void fetchAuditLogs()}
              className="h-7 rounded-full px-2.5 text-[11px] font-bold text-muted-foreground hover:text-violet-ink"
            >
              Actualizar
            </Button>
          </div>
        </div>
        <div className="max-h-64 overflow-y-auto p-2 custom-scrollbar">
          {auditLogs.length === 0 ? (
            <p className="flex min-h-[80px] items-center justify-center text-center text-xs text-muted-foreground">
              Acá va a quedar registrado cada escaneo y reversión, con operador y hora.
            </p>
          ) : (
            <ul className="flex flex-col gap-1">
              {auditLogs.map((log) => (
                <li
                  key={log.id}
                  className="flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xl border border-transparent px-2.5 py-2 transition hover:border-lavender/40 hover:bg-lavender-light/40"
                >
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide",
                      log.action === "checkin"
                        ? "bg-turquoise/15 text-turquoise-ink"
                        : "bg-violet-brand/15 text-violet-ink"
                    )}
                  >
                    {log.action === "checkin" ? (
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <Undo2 className="h-3 w-3" aria-hidden="true" />
                    )}
                    {log.action === "checkin" ? "Ingreso" : "Revertido"}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-violet-ink">{log.code}</span>
                  <span className="min-w-0 truncate text-xs font-semibold text-ink">{log.holder}</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
                    <User className="h-3 w-3" aria-hidden="true" />
                    {log.operator}
                    <span aria-hidden="true">·</span>
                    {log.source === "camara" ? "cámara" : "manual"}
                    <span aria-hidden="true">·</span>
                    <time dateTime={log.createdAt}>{fmtTime(log.createdAt)}</time>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultPanel({
  result,
  onRevert,
  onReset,
}: {
  result: ResultState;
  onRevert: (code: string) => void;
  onReset: () => void;
}) {
  if (result.status === "idle" || result.status === "loading") {
    return (
      <div className="flex min-h-[132px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-lavender/50 bg-lavender-light/30 p-5 text-center">
        {result.status === "loading" ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin text-violet-ink" aria-hidden="true" />
            <p className="text-xs font-semibold text-violet-dark">Validando entrada…</p>
          </>
        ) : (
          <p className="text-xs text-muted-foreground">
            El resultado de la validación va a aparecer acá.
          </p>
        )}
      </div>
    );
  }

  if (result.status === "ok") {
    const t = result.ticket;
    return (
      <div className="relative overflow-hidden rounded-2xl border-2 border-turquoise/50 bg-turquoise-light/50 p-5">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-brand" aria-hidden="true" />
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-turquoise text-white shadow-md">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-extrabold text-turquoise-ink">
              ✓ Acceso permitido
            </p>
            <p className="mt-0.5 truncate text-sm font-bold text-ink">{t.holder}</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              <Badge variant="outline" className="rounded-full border-turquoise/40 bg-surface text-[10px] font-bold text-turquoise-ink">
                {TICKET_TYPE_LABELS[t.type] ?? t.type}
              </Badge>
              <Badge variant="outline" className="rounded-full border-lavender/50 bg-surface text-[10px] font-bold text-violet-dark">
                {t.days} día/s
              </Badge>
              <span className="font-mono text-[11px] font-bold leading-5 text-violet-ink">{t.code}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRevert(t.code)}
                className="h-8 rounded-full border-amber-200 text-[11px] font-bold text-amber-700 hover:bg-amber-50"
              >
                <Undo2 className="mr-1 h-3 w-3" aria-hidden="true" /> Revertir
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onReset}
                className="h-8 rounded-full text-[11px] font-bold text-muted-foreground hover:text-violet-ink"
              >
                Siguiente →
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (result.status === "used") {
    const t = result.ticket;
    return (
      <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300/70 bg-amber-50/80 p-5">
        <div className="absolute inset-x-0 top-0 h-1 bg-amber-400" aria-hidden="true" />
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-400 text-white shadow-md">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-extrabold text-amber-700">
              ⚠ Entrada ya utilizada
            </p>
            <p className="mt-0.5 truncate text-sm font-bold text-ink">{t.holder}</p>
            <p className="text-xs text-muted-foreground">
              Ingresó a las <strong>{fmtTime(result.usedAt)}</strong> ·{" "}
              <span className="font-mono font-semibold text-violet-ink">{t.code}</span>
            </p>
            <Button
              size="sm"
              variant="ghost"
              onClick={onReset}
              className="mt-2 h-8 rounded-full text-[11px] font-bold text-muted-foreground hover:text-violet-ink"
            >
              Siguiente →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (result.status === "reverted") {
    return (
      <div className="rounded-2xl border-2 border-lavender/60 bg-lavender-light/40 p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-brand text-white shadow-md">
            <Undo2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-base font-extrabold text-violet-dark">
              Check-in revertido
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-mono font-semibold text-violet-ink">{result.ticket.code}</span>{" "}
              volvió a estar disponible para ingresar.
            </p>
            <Button
              size="sm"
              variant="ghost"
              onClick={onReset}
              className="mt-2 h-8 rounded-full text-[11px] font-bold text-muted-foreground hover:text-violet-ink"
            >
              Siguiente →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // notfound | error
  return (
    <div className="rounded-2xl border-2 border-red-200 bg-red-50/80 p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-md">
          <XCircle className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-base font-extrabold text-red-600">
            {result.status === "notfound" ? "Código no encontrado" : "Error"}
          </p>
          <p className="text-xs text-red-500/90">{result.message}</p>
          <Button
            size="sm"
            variant="ghost"
            onClick={onReset}
            className="mt-2 h-8 rounded-full text-[11px] font-bold text-muted-foreground hover:text-violet-ink"
          >
            Siguiente →
          </Button>
        </div>
      </div>
    </div>
  );
}
