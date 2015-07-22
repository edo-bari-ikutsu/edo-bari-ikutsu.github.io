// 現行Chromeで実装されていないcache.add、cache_addAllを補うライブラリ ...（1）
importScripts("serviceworker-cache-polyfill.js");

// キャッシュ名 ...（1）
var CACHE_NAME = "swsample-cache-v1";

// キャッシュ対象ファイル ...（3）
var urlsToCache = [
    ".",
    "index.html",
    "img/image1.jpg",
    "img/image2.jpg",
    "img/image3.jpg",
    "img/image4.jpg"
];

/**
 * Service Worker登録直後のハンドラ ...（4）
 */
self.addEventListener("install", function (event) {
    event.waitUntil(
        // キャッシュオープン ...（5）
        caches.open(CACHE_NAME).then(function (cache) {
            console.log("opened cache");

            // キャッシュ対象ファイルをキャッシュ ...（6）
            var result = cache.addAll(urlsToCache);
            return result;
        })
    );
}, false);

/**
 * Webリクエストのハンドラ ...（7）
 */
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // キャッシュヒットした時にはキャッシュを返却 ...（8）
            if (response) {
                return response;
            }
            // キャッシュヒットしない時にはネットワークから取得 ...（9）
            return fetch(event.request);
        })
    );
}, false);