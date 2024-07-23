// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// const firebaseConfig = {
//   apiKey: 'AIzaSyAhrB-GqeBvAxw7eFCgxi9FylQMJot3QUg',
//   authDomain: 'me-demo-97723.firebaseapp.com',
//   projectId: 'me-demo-97723',
//   storageBucket: 'me-demo-97723.appspot.com',
//   messagingSenderId: '991460977094',
//   appId: '1:991460977094:web:48d6a625108fd324232ac7',
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
if('function' === typeof importScripts){
  importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
  importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
  
  // const firebaseConfig = {
  //   apiKey: 'AIzaSyAhrB-GqeBvAxw7eFCgxi9FylQMJot3QUg',
  //   authDomain: 'me-demo-97723.firebaseapp.com',
  //   projectId: 'me-demo-97723',
  //   storageBucket: 'me-demo-97723.appspot.com',
  //   messagingSenderId: '991460977094',
  //   appId: '1:991460977094:web:48d6a625108fd324232ac7',
  // };
  const firebaseConfig = {
    apiKey: 'AIzaSyAJSUsAr_CWtEUXb5FdYxFKlnR_lIX9s1w',

    authDomain: 'me-f63f3.firebaseapp.com',

    projectId: 'me-f63f3',

    storageBucket: 'me-f63f3.appspot.com',

    messagingSenderId: '419706014995',

    appId: '1:419706014995:web:b236ce276eb5c56b0c9ee6',
  }; 
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  
  // messaging.onMessage((payload) => {
  //   console.log('Message received. ', payload);
  //   // ...
  // });
  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  }
  