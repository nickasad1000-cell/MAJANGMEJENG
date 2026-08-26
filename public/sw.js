/* Majang Mejeng — offline-first service worker (v3)
   - Halaman: network-first (konten selalu segar, fallback cache → /offline)
   - Aset hash (_astro): cache-first (immutable)
   - Audio: cache terpisah dengan kap 8 lagu terbaru (jaga storage) */
const CACHE = 'mm-v3';
const AUDIO = 'mm-audio-v3';
const CORE = ['/', '/cerita', '/toko', '/offline'];
const AUDIO_CAP = 8;

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all([
        // buang cache versi lama
        ...keys.filter((k) => k !== CACHE && k !== AUDIO).map((k) => caches.delete(k)),
      ])
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // Audio: cache-first di cache terpisah dengan kapasitas terbatas
  if (new URL(req.url).pathname.startsWith('/audio/')) {
    e.respondWith(
      caches.open(AUDIO).then(async (c) => {
        const hit = await c.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) {
          await c.put(req, res.clone());
          const keys = await c.keys();
          if (keys.length > AUDIO_CAP) {
            await c.delete(keys[0]); // evict tertua (FIFO)
          }
        }
        return res;
      })
    );
    return;
  }

  // Halaman: network-first, fallback cache → /offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/offline')))
    );
    return;
  }

  // Aset lain (hash immutable): cache-first
  e.respondWith(
    caches.match(req).then(
      (r) =>
        r ||
        fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
    )
  );
});
