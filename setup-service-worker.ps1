# Service Worker Kurulum Scripti - AIHaber

Write-Host "🚀 Service Worker kurulumu başlatılıyor..."

# Service Worker dosyasını oluştur
$sw = @"
const CACHE_NAME = "aihaber-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/sitemap.xml",
  "/manifest.json"
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
"@
Set-Content -Path "./service-worker.js" -Value $sw -Encoding UTF8

# Manifest dosyasını oluştur
$manifest = @"
{
  "name": "AI Haber",
  "short_name": "AIHaber",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#101022",
  "theme_color": "#4A90E2",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
"@
Set-Content -Path "./manifest.json" -Value $manifest -Encoding UTF8

# index.html dosyasına gerekli satırları ekle
$indexPath = "./index.html"
if (Test-Path $indexPath) {
    $html = Get-Content $indexPath -Raw
    if ($html -notmatch "manifest.json") {
        $html = $html -replace "(?<=<head>)", "`n<link rel=`"manifest`" href=`"/manifest.json`"/>"
    }
    if ($html -notmatch "serviceWorker") {
        $html = $html -replace "(?=</body>)", @"
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker aktif ✅', reg))
      .catch(err => console.log('Service Worker hatası ❌', err));
  });
}
</script>
"@
    }
    Set-Content $indexPath $html -Encoding UTF8
}

# Git işlemleri
git add .
git commit -m "Add Service Worker and Manifest for offline support"
git push

Write-Host "✅ Service Worker kurulumu tamamlandı!"
