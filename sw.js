self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open('sw-cache').then((cache)=>{
        return cache.add('index.html');
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response)=>{
      return response || fetch(e.request);
    })
  );
});
