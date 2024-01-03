var CACHE_NAMA ='fiks-cache-v1';
var urlsToCache = [
'/',
'/assets/img/fiks_logo.png',
'/assets/img/fiks512.png',
'/assets/css/style.css',
'/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
'/assets/vendor/glightbox/js/glightbox.min.js',
'/assets/vendor/isotope-layout/isotope.pkgd.min.js',
'/assets/js/main.js',
'/index.html'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAMA)
        .then(function(cache){
            console.log('Opened cache');
            console.log('Caching resources:', urlsToCache);
            return cache.addAll(urlsToCache)
                .catch(function(error) {
                    console.error('Error caching resources:', error);
                });
        })
    );
});



self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
        if (response) {
            return response;
        }

        return fetch(event.request).then(function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAMA).then(function(cache) {
            cache.put(event.request, responseToCache);
            });

            return response;
        });
        })
    );
});

self.addEventListener('activate', function (event) {
    var cacheWhitelist = [CACHE_NAMA];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// push notification
self.addEventListener('push', function(event) {
    if (self.Notification.permission === 'granted') {
      // Izin notifikasi telah diberikan, Anda dapat menampilkan pemberitahuan
      const options = {
        body: 'Apakah Kamu Mau Berlangganan?',
        icon: 'assets/img/ring.png',
        actions: [
          { action: 'yes', title: 'Ya' },
          { action: 'no', title: 'Tidak' }
        ],
        data: {
          senderId: '12345',
          messageId: '67890'
        },
        silent: true,
        timestamp: Date.now()
      };
      
  
      event.waitUntil(
        self.registration.showNotification('Notifikasi', options)
      );
    } else {
      // Izin notifikasi tidak diberikan
    }
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
  
    if (event.action === 'yes') {
      // Tindakan "Ya" diambil
      // Menampilkan notifikasi dengan ucapan "Anda memilih Ya"
      self.registration.showNotification('Terimakasih', {
        body: 'Makasih Yaa Kamu Sudah Berlangganan',
        icon: 'assets/img/happy.png'
      });
    } else if (event.action === 'no') {
      // Tindakan "Tidak" diambil
      // Menampilkan notifikasi dengan ucapan "Anda memilih Tidak"
      self.registration.showNotification('yaah sayang sekali :(', {
        body: 'mungkin lain kali yaa',
        icon: 'assets/img/sad.png'
      });
    } else {
      // Notifikasi di-klik tanpa memilih tindakan apa pun
      // Lakukan sesuatu ketika notifikasi di-klik tanpa memilih "Ya" atau "Tidak"
      console.log('Anda mengklik notifikasi');
    }
  });

  importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
  importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')

  const firebaseConfig = {
          apiKey: "AIzaSyDvVfoqGbIKXdS4ANDJJ4OHdmKrFViLJzQ",
          authDomain: "uas-pushnotification.firebaseapp.com",
          projectId: "uas-pushnotification",
          storageBucket: "uas-pushnotification.appspot.com",
          messagingSenderId: "539478183006",
          appId: "1:539478183006:web:a029286728272d76af38cf"
          };

          const app = firebase.initializeApp(firebaseConfig)
          const messaging = firebase.messaging()