
const CACHE_NAME = 'pwa-speedmis-cache-v1';
const urlsToCache = [
  '/_mis/index.php',
  '/_mis_uniqueInfo/pwa/manifest.json',
  '/uploadFiles/_HomeImages/pushlogo.png',
  '/apple-touch-icon.png'
];

// 설치 시 캐시
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 요청 시 캐시 우선 응답
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );

  
});

// 푸시 수신

self.addEventListener('push', function(event) {
  console.log('푸시 이벤트 도착');  // 이게 찍혀야 함
  const data = event.data ? event.data.json() : {};

  const title = data.title || '알림';
  const options = {
    body: data.body || '',
    icon: data.icon || '/icon-192x192.png',
    data: {
        url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );


  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
  
    // 상대 경로를 절대 경로로 변환
    const targetUrl = event.notification.data?.url || '/';
    const fullUrl = new URL(targetUrl, self.location.origin).href;
  
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(windowClients => {
        // 열린 창들 중에서 targetUrl과 일치하는 창을 찾기
        for (let client of windowClients) {
          if (client.url === fullUrl && 'focus' in client) {
            return client.focus(); // 일치하는 창에 포커스
          }
        }
  
        // 일치하는 창이 없으면 새 창을 열기
        if (clients.openWindow) {
          return clients.openWindow(fullUrl); // 새 창을 열기
        }
      })
    );
  });
  

});