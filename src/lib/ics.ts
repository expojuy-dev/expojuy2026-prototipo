import { toast } from "sonner";

export type IcsEvent = {
  uid: string;
  date: string; // YYYY-MM-DD
  time: string; // "HH:MM-HH:MM"
  title: string;
  description?: string;
  location?: string;
};

/**
 * Convierte "HH:MM-HH:MM" + "YYYY-MM-DD" a formato ICS datetime con offset -03:00 (Jujuy).
 */
function icsStamp(date: string, hm: string): string {
  const [h, m] = hm.split(":");
  return `${date.replace(/-/g, "")}T${h}${m}00`;
}

function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/**
 * Arma un archivo VCALENDAR válido con los eventos dados (TZ fija UTC-3, Jujuy).
 * Line folding a 75 octetos según RFC 5545 para máxima compatibilidad.
 */
export function buildIcs(events: IcsEvent[]): string {
  const stampNow = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ExpoJuy 2026//Agenda//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:ExpoJuy 2026",
    "X-WR-TIMEZONE:America/Argentina/Jujuy",
  ];
  for (const ev of events) {
    const [start, end] = ev.time.split("-").map((s) => s.trim());
    lines.push(
      "BEGIN:VEVENT",
      `UID:${ev.uid}@expojuy.com.ar`,
      `DTSTAMP:${stampNow}`,
      `DTSTART;TZID=-03:00:${icsStamp(ev.date, start)}`,
      `DTEND;TZID=-03:00:${icsStamp(ev.date, end || start)}`,
      `SUMMARY:${escapeIcs(ev.title)}`,
      ev.description ? `DESCRIPTION:${escapeIcs(ev.description)}` : "",
      ev.location ? `LOCATION:${escapeIcs(ev.location)}` : "",
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");

  // RFC 5545: plegar líneas largas (máx 75 octetos) con CRLF + espacio
  const folded: string[] = [];
  for (const line of lines.filter(Boolean)) {
    if (line.length <= 73) {
      folded.push(line);
      continue;
    }
    let rest = line;
    folded.push(rest.slice(0, 73));
    rest = rest.slice(73);
    while (rest.length > 0) {
      folded.push(` ${rest.slice(0, 72)}`);
      rest = rest.slice(72);
    }
  }
  return folded.join("\r\n");
}

/**
 * Genera el .ics, lo descarga como archivo y muestra feedback.
 */
export function downloadIcs(filename: string, events: IcsEvent[], label?: string) {
  if (events.length === 0) {
    toast.info("No hay actividades para exportar todavía.");
    return;
  }
  const blob = new Blob([buildIcs(events)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast.success(`Calendario descargado: ${filename}.ics`, {
    description: `${events.length} actividad${events.length === 1 ? "" : "es"}${label ? ` · ${label}` : ""} — abrilo con Google Calendar, Outlook o Apple Calendar.`,
  });
}
