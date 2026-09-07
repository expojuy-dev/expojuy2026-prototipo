/* ExpoJuy 2026 — Service Worker con soporte offline básico.
 *
 * Estrategias:
 *  - Navegaciones (HTML): network-first → cache → página offline precacheada.
 *  - Assets estáticos (imágenes, /_next/static, manifest, iconos): stale-while-revalidate.
 *  - APIs (/api/*): siempre red, sin cachear (datos vivos).
 * Sin contenido stale en navegaciones normales: la home se revalida en cada visita.
 */
const CACHE = "expoju-runtime-v2";
const OFFLINE_URLS = ["/", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      // Precache tolerante: si un recurso falla no rompe la instalación.
      await Promise.allSettled(OFFLINE_URLS.map((url) => cache.add(new Request(url, { cache: "reload" }))));
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

const isStaticAsset = (url) =>
  url.pathname.startsWith("/_next/static/") ||
  url.pathname.startsWith("/images/") ||
  url.pathname === "/manifest.webmanifest" ||
  url.pathname.startsWith("/icon-") ||
  url.pathname === "/apple-touch-icon.png";

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // APIs: datos vivos, siempre red (con fallback a cache solo si offline total).
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(request).then((cached) => cached ?? Response.error())
      )
    );
    return;
  }

  // Navegaciones: red primero (contenido fresco), cache como offline.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(CACHE);
          cache.put("/", fresh.clone()).catch(() => {});
          return fresh;
        } catch {
          const cached =
            (await caches.match(request)) ??
            (await caches.match("/")) ??
            (await caches.match("/", { ignoreSearch: true }));
          return cached ?? Response.error();
        }
      })()
    );
    return;
  }

  // Assets estáticos: stale-while-revalidate (instantáneo + refresco en background).
  if (isStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const cached = await cache.match(request);
        const network = fetch(request)
          .then((response) => {
            if (response.ok) cache.put(request, response.clone()).catch(() => {});
            return response;
          })
          .catch(() => cached ?? Response.error());
        return cached ?? network;
      })()
    );
  }
});
