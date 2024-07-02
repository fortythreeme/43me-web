// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging, getToken, isSupported } from 'firebase/messaging';
import { onBackgroundMessage } from "firebase/messaging/sw";
const initializeFirebaseMessaging = async () => {
  // Check if browser supports necessary features for Firebase Messaging
  if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.error('This browser doesn\'t support the necessary APIs for Firebase Messaging.');
    return;
  }
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAhrB-GqeBvAxw7eFCgxi9FylQMJot3QUg',
  authDomain: 'me-demo-97723.firebaseapp.com',
  projectId: 'me-demo-97723',
  storageBucket: 'me-demo-97723.appspot.com',
  messagingSenderId: '991460977094',
  appId: '1:991460977094:web:48d6a625108fd324232ac7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

 try {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if(permission==="granted"){
  
  getToken(messaging, { vapidKey: "BAZINr-HZoli3EJZndiUnpyWImGxtnzb5pdWXUUzU8LTvO7uKnzJoB2A_lERTRH7FQHgE9MjgEXp7zEAxhwUA3M" })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        // console.log(currentToken);
        localStorage.setItem('CurrentToken',currentToken)
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  }
}
catch (error) {
  console.error('An error occurred while requesting permission or retrieving token:', error);
}
  // const token = await getToken(messaging,{
  //   vapidKey:"BAZINr-HZoli3EJZndiUnpyWImGxtnzb5pdWXUUzU8LTvO7uKnzJoB2"
  // })
  // console.log(token)

  // }
  return messaging;
};
export default initializeFirebaseMessaging;
