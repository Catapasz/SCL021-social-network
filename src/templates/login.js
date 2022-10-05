import { navigate } from "../router/routes.js";
import { logInWithGoogle } from "../firebase/authservice.js";

function login() {
  const html = /*html*/ `
  <div class='bg-login' id="logInPage">
    <div class='bg-green'>
    <img class='logo' width='270'  src='./img/logo2.png' />         
          <h2>Inicia sesión</h2>
          <input type='email' id='email'  placeholder='Correo electrónico' />          
          <input type='password' id='password' placeholder='Contraseña' />          
          <p id='alertLogin'></p>                  
          <button class='logInUser' id='logInUser'> Ingresar </button>
          <p class='message'>¿Aún no tienes una cuenta? <a href='#' id='register' class='btn-register'>Registrarme </a></p>        
          <button id='googleButton'>
            <img width='25' src='./img/googleicon.png' /> Ingresa con Google
          </button>
      </div>
 </div>`;
  const container = document.createElement("div");
  container.innerHTML = html;

  //link to go to register
  const linkRegister = container.querySelector("#register");
  linkRegister.addEventListener("click", (event) => {
    event.preventDefault();
    navigate("register");
  });
  
   //link to enter with google
  container.querySelector("#googleButton").addEventListener("click",(event) => {
    event.preventDefault();
    logInWithGoogle();
    navigate("wall");
  });
  

  //link to go to wall
  const linkWall = container.querySelector("#logInUser");
  linkWall.addEventListener("click", (event) => {
    event.preventDefault();    
  });

  return container;
}

export { login };
