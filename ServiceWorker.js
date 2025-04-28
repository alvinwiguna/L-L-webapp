const cacheName = "DefaultCompany-L_L App-1.0";
const contentToCache = [
    "Build/bb0d9ecdb05db3e84da20bd14a4f84dc.loader.js",
    "Build/2bb1d5231f3e882a3b07f33db1403db7.framework.js",
    "Build/9ec7a071039e4b3e0a9c602f9f3c3b10.data",
    "Build/627d4c1db76e1ccc8bbae5b5aca64ebd.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
