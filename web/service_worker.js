/*
 * Service worker.
 *
 * - prefer network.
 * - fallback on fail.
 */
const CACHE_NAME = 'cache-v1';
const urlsToCache = ['/index.html'];

console.log('using service worker cache ' + CACHE_NAME);

self.addEventListener('install', (event) => {
    // remove all old caches, because reasons.
    for (let i = 0; i < 10; i++) {
        caches.delete(`cache-v${i}`);
    }

    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('service worker activated on ' + CACHE_NAME);
});

self.addEventListener('message', (event) => {
    console.log("service worker query: " + event.data);
    //event.ports[0].postMessage({offline: offline});
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});