const CACHE_NAME = "counter-v2";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./background.mp3",
  "./calendar.png",
  "./back.png",
  "./playpause.png",
  "./reset.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("message", event => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
