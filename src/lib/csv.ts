import { toast } from "sonner";

export type CsvRow = Record<string, string | number | boolean | null>;

/**
 * Genera y descarga un CSV (con BOM para Excel y ";" como separador es-AR)
 * a partir de filas de objetos. Muestra toasts de feedback.
 */
export function downloadCsv(filename: string, rows: CsvRow[]) {
  if (rows.length === 0) {
    toast.info("No hay datos para exportar todavía.");
    return;
  }
  const headers = Object.keys(rows[0]);
  const escape = (v: string | number | boolean | null) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /"|;|\n/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [
    headers.join(";"),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(";")),
  ].join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast.success(`Exportado: ${filename}.csv`, { description: `${rows.length} filas` });
}
