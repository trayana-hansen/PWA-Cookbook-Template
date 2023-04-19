const staticCacheName = "site-static-v3";

const dynamicCacheName = "site-dynamic-v1";

const assets = [
  "./",
  "./index.html",
  "./js/app.js",
  "./js/ui.js",
  "./js/materialize.min.js",
  "./css/styles.css",
  "./css/materialize.min.css",
  "./img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

self.addEventListener("install", (event) => {
  //console.log("Service Worker has been installed");

  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      //console.log("Caching all assets");
      cache.addAll(assets);
    })
  );
});
self.addEventListener("activate", (event) => {
  //console.log("Service Worker has been activated");

  console.log("Service worker has been activated...");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
  return;
});

self.addEventListener("fetch", (event) => {
  // Fix af problem med dynamisk cache og chrome-extension bug
  if (!(event.request.url.indexOf("http") === 0)) return;

  // Kontroller svar på request
  event.respondWith(
    /* Håndtering af cache match og dynamisk cache */

    // Kig efter file match i cache
    caches.match(event.request).then((cacheRes) => {
      // Returner hvis match fra cache - ellers hent fil på server
      return (
        cacheRes ||
        fetch(event.request).then((fetchRes) => {
          // Åbn dynamisk cache
          return caches.open(dynamicCacheName).then((cache) => {
            // Tilføj side til dynamisk cache
            cache.put(event.request.url, fetchRes.clone());

            // Returner request
            return fetchRes;
          });
        })
      );
    })
  );
});
