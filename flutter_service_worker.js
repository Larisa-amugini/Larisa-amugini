'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "868bcdea6c6eed160ba772479bce0f62",
"index.html": "5306279da13eac953255974a3c5762f8",
"/": "5306279da13eac953255974a3c5762f8",
"main.dart.js": "1e3e0fb67a6d0886cdf11237e718bbed",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "239d2f96f52bf55e4de046f0942f06cf",
"assets/images/phone_repair1.jpg": "61402296c13dddd5b92a3cef4d2fa798",
"assets/images/phone_repair2.jpg": "985003cc50ad2623023a96d2a5f80d94",
"assets/images/phone_repair3.jpg": "7c8b89038a62a78f7fa0a652dd705c8a",
"assets/images/phone_repair7.jpg": "00d2651992da4bee487fd08f66323270",
"assets/images/phone_repair6.jpg": "2d040b4c919788dd36d7447ff3ea3e3b",
"assets/images/pictograma2.png": "a7beca52cae26a7b0d31c963839d0624",
"assets/images/phone_repair4.jpg": "7645189703af660cdb65c567373efb28",
"assets/images/instagram.png": "5bde6bf8c965d586950d9a33d88a9130",
"assets/images/phone_repair5.jpg": "161c6ef3c697a2a56fe76b9f13d92cd0",
"assets/images/pictograma1.png": "d377dc75cdd2252d0ba6a7882ed5966c",
"assets/images/phone_repair13.jpg": "be66e491ba99509295bc546715978735",
"assets/images/b2b.PNG": "04e1a06083de94bc603d9e4e4a89c723",
"assets/images/phone_repair12.jpg": "63a3e092ab608013bdeaac22c2f354d1",
"assets/images/services.png": "217858f3eec946a77e51d39645cc3f85",
"assets/images/phone_repair10.jpg": "720a35c10b76283099301482c0a91a19",
"assets/images/phone_repair11.jpg": "604ed97b39874c8d96ae1efdbe25de46",
"assets/images/phone_repair14.jpg": "6a5b7cba52b40479f78e248299ed13fa",
"assets/images/whatsapp_logo.png": "bfa7d7c59336d9616d60b77a305a1ef8",
"assets/images/phone_repair15.jpeg": "d058f9df787e2290df6023f984c9c480",
"assets/images/phone_repair16.jpg": "3c6e7e424148689f4c60d0d36ccef3a7",
"assets/images/phone_repair17.jpg": "e4b934395647c58554f65546d9196449",
"assets/images/tiktok.png": "55fe0a58d8bae912bea2712b14160d78",
"assets/images/phone_repair.png": "d0516a10114ac295e41b31c97ccd77cf",
"assets/images/linkedin.png": "7235ef941e46e77764ac6b183590a100",
"assets/images/phone_repair8.jpg": "3b2e761811919ed9a2216a8c796ee47b",
"assets/images/youtube.png": "a7bba6b9af3f56d8b6e77fba94ef5dd7",
"assets/images/phone_repair9.jpg": "0d02b3830be415788769b7fa34a3673a",
"assets/images/facebook.png": "afaa75902c7889d41c74dbb8ec9e5097",
"assets/AssetManifest.json": "c5c3b5da81f3104b8e1beaf9554b31b0",
"assets/NOTICES": "1ec47136efbb7bdf54c62e2e80bcf429",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "ada5ee1d8a1b8df1b363749496513fc0",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin": "5d6d84a49ae47355b8c3147fd95d6ecb",
"assets/fonts/MaterialIcons-Regular.otf": "866da86f1fdd4a857165614c3e5807c0",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
