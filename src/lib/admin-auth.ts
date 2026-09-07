/**
 * Autenticación simple del Panel de Organización (en producción usar auth real).
 * - Coordinación: acceso completo (leads, reuniones, tickets, suscriptores, métricas).
 * - Puerta: solo check-in de entradas en el acceso al predio.
 */
export const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE ?? "expoju2026";
export const DOOR_PASSCODE = process.env.ADMIN_DOOR_PASSCODE ?? "puerta2026";

export type AdminRole = "coordinacion" | "puerta";

export function resolveRole(passcode: string): AdminRole | null {
  if (passcode === ADMIN_PASSCODE) return "coordinacion";
  if (passcode === DOOR_PASSCODE) return "puerta";
  return null;
}
