/**
 * Generación de tarjetas de contacto (vCard 3.0) para expositores.
 * Estándar RFC 2426 — compatible con iOS (Contactos), Android y Outlook.
 */

import type { Exhibitor } from "./data";

const EVENT_URL = "https://expoju2026.com.ar";
const EVENT_NAME = "ExpoJuy 2026 · Conectando Países — Creando Oportunidades";

function escapeVcf(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n");
}

/** Arma el contenido VCF de un expositor. */
export function buildVCard(ex: Exhibitor): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `ORG:${escapeVcf(ex.name)}`,
    `TITLE:${escapeVcf(ex.category)}`,
    `FN:${escapeVcf(ex.name)}`,
    `N:${escapeVcf(ex.name)};;;;`,
    `NOTE:${escapeVcf(
      `${ex.description}\nUbicación en feria: ${ex.stand}. ${EVENT_NAME}`
    )}`,
    `ITEM1.URL:${EVENT_URL}`,
    `ITEM1.X-ABLabel:Feria ExpoJuy 2026`,
    `X-EXPOJUY-STAND:${escapeVcf(ex.stand)}`,
    `X-EXPOJUY-ZONE:${escapeVcf(ex.zone)}`,
    `REV:${new Date().toISOString()}`,
    "END:VCARD",
  ];
  if (ex.country) lines.splice(9, 0, `ADR;TYPE=WORK:;;${escapeVcf(ex.country)};;;;`);
  return lines.join("\r\n");
}

/** Descarga el vCard del expositor como archivo .vcf. */
export function downloadVCard(ex: Exhibitor): void {
  const blob = new Blob([buildVCard(ex)], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `expoju2026-${ex.id}.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
