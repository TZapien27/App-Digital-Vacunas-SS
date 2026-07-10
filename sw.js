const CACHE_NAME = 'censo-v15.2';
const urlsToCache = [
  './',
  './index.html',
  './catalogos.js',  // <-- Agregamos el archivo externo para uso Offline
  'manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/css/tom-select.css',
  'https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/js/tom-select.complete.min.js'
];

// Instalar y guardar en el caché del celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Interceptar peticiones y devolver lo guardado si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si lo encuentra en caché, lo devuelve
        if (response) { return response; }
        // Si no, lo busca en internet
        return fetch(event.request);
      })
  );
});