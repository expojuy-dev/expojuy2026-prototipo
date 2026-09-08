/**
 * Encuesta "Votá tu stand favorito" — cliente.
 * 1 voto por dispositivo (anónimo, localStorage), puede cambiarse.
 * Los componentes se sincronizan vía CustomEvent expojuy:vote-updated.
 */

"use client";

export type VoteResult = { exhibitorId: string; count: number };
export type VoteState = {
  results: VoteResult[];
  total: number;
  myVote: string | null;
};

export const VOTE_EVENT = "expojuy:vote-updated";

export function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem("expojuy-device-id");
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `dev-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
    window.localStorage.setItem("expojuy-device-id", id);
  }
  return id;
}

export async function fetchVote(): Promise<VoteState> {
  const res = await fetch(`/api/vote?deviceId=${encodeURIComponent(getDeviceId())}`, {
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok || !json.ok) throw new Error(json.error ?? "No se pudieron cargar los resultados");
  return { results: json.results ?? [], total: json.total ?? 0, myVote: json.myVote ?? null };
}

export async function castVote(exhibitorId: string): Promise<VoteState> {
  const res = await fetch("/api/vote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ exhibitorId, deviceId: getDeviceId() }),
  });
  const json = await res.json();
  if (!res.ok || !json.ok) throw new Error(json.error ?? "No se pudo registrar el voto");
  const state: VoteState = {
    results: json.results ?? [],
    total: json.total ?? 0,
    myVote: json.myVote ?? null,
  };
  window.dispatchEvent(new CustomEvent(VOTE_EVENT, { detail: state }));
  return state;
}
