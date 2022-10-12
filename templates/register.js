import { createUser } from "../firebase/authservice.js";
import { navigate } from "../router/routes.js";
//Aca creamos nuestra funcion para registrarnos

//Aca empieza la segunda pagina
function register() {
  const html = /*html*/ `
    <div class='bg-login' id="register-page">
      <div class='bg-green'>
      <img class='logo' width='200'  src='./img/logo.png' />
            <p>¡Regístrate! </p>        
            <input type='email' id="registerEmail" placeholder='Correo electrónico' />
            <input type='email' id="createUser" placeholder='Crea tu usuario' />
            <input type='password' id='createPassword' placeholder='Contraseña' />
            <input type='password' id='confirmPassword' placeholder='Confirma tu Contraseña' />
            <p id='alertRegister'></p>
            <button class='createAccount' id='createAccount'> Crear cuenta </button>
           
        </div>
    </div>`;

  //Transformamos el template de string a un elemento
  const container = document.createElement("div");
  container.id = "contenedorR";
  container.innerHTML = html;
  const linkSignIn = container.querySelector("#createAccount");
  linkSignIn.addEventListener("click", (event) => {
    event.preventDefault();
    navigate("/");
  });
  // Crear cuenta + posibles errores
  const btnCreateAccount = container.querySelector("#createAccount");
  btnCreateAccount.addEventListener("click", async () => {
    const container = document.getElementById("contenedorR");
    const email = container.querySelector("#registerEmail").value;
    const password = container.querySelector("#createPassword").value;
    try {
      await createUser(email, password);
      // navigate("publications");
    } catch (mistake) {
      const error = mistake.message;
      const alertError = container.querySelector("#alertRegister");
      console.log(mistake);
      if (error === "auth/email-already-in-use") {
        alertError.innerHTML =
          "¡El usuario ya ha sido registrado, prueba con otro correo!";
      } else if (error === "auth/invalid-email") {
        alertError.innerHTML = "¡Ingresa un correo válido!";
      } else if (error === "auth/weak-password") {
        alertError.innerHTML =
          "¡La contraseña debe contener mínimo 6 caracteres!";
      } else if (error === "auth/user-not-found") {
        alertError.innerHTML = "¡No existe el usuario ingresado!";
      } else if (error === "auth/wrong-password") {
        alertError.innerHTML = "¡Contraseña inválida!";
      } else {
        alertError.innerHTML = "¡Algo salió mal, ingresa tus datos nuevamente!";
      }
    }
  });
  return container;
}

export { register };

