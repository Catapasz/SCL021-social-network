import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDS38kdLI780zrcaVIUPm0Ck6JpbVxKXmU",
    authDomain: "social-network-le-festin.firebaseapp.com",
    projectId: "social-network-le-festin",
    storageBucket: "social-network-le-festin.appspot.com",
    messagingSenderId: "665153692255",
    appId: "1:665153692255:web:45142cd6c3d11b453031ea",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  

  export {app}

