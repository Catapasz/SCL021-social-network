import { navigate, routes } from "./router/routes.js";
import { auth } from "./firebase/authservice.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
("firebase/auth");


const path = window.location.pathname;
navigate(path);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    navigate("wall");
    // ...
  } else {
    // User is signed out
    navigate("/")
    // ...
  }
});