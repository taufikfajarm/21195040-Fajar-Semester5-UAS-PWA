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