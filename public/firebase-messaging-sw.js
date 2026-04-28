importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAv47CuLYkyvkn6dOqHu9JoDlooc-qREng",
  authDomain: "safesignal-ec077.firebaseapp.com",
  projectId: "safesignal-ec077",
  appId: "1:298284500715:web:35f1221b850d96a72e20ae",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/logo192.png',
    vibrate: [200, 100, 200],
  });
});