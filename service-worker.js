
const CACHE_NAME = "aihaber-cache-v2";
const SCOPE_PATH = (() => {
  try {
    return new URL(self.registration.scope).pathname; // e.g. "/aihaber/"
  } catch (_) {
    return "/";
  }
})();


const CACHE_NAME = "aihaber-cache-v1";
>>>>>>> 7d13cbf (Frontend: updated API URL to Render backend)
const urlsToCache = [
  SCOPE_PATH,
  `${SCOPE_PATH}index.html`,
  `${SCOPE_PATH}sitemap.xml`,
  `${SCOPE_PATH}manifest.json`,
  // Common assets
  `${SCOPE_PATH}style.css`,
  `${SCOPE_PATH}script.js`
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

