import { navigate } from "../router/routes.js";
import { createPost, printPost } from "../firebase/databaseservice.js";
import { auth } from "../firebase/authservice.js";

function wall() {
  //Feed
  const postsWall = document.createElement("div");
  postsWall.className = "wall";

  // Fondo de frutas y verduras
  const bgFruit = document.createElement("div");
  bgFruit.className = "bgTop";
  postsWall.appendChild(bgFruit);

  //Fondo logo celeste
  const bglogo = document.createElement("div");
  bglogo.className = "bgLeFestin";
  bgFruit.appendChild(bglogo);

  //Boton logOut
  const logOutLogo = document.createElement("img");
  logOutLogo.className = "logOutLogo";
  logOutLogo.src = "./img/logout.png";
  postsWall.appendChild(logOutLogo);
  //Logo Le Festin
  const logo = document.createElement("img");
  logo.src = "./img/logo2.png";
  logo.className = "logoFeed";
  bglogo.appendChild(logo);


  //Fondo para contener los post amarillo
  const bgPost = document.createElement("div");
  bgPost.className = "bgPost";
  postsWall.appendChild(bgPost);

  //Título para escribir posts
  const title = document.createElement("h2");
  title.innerHTML = "¿Qué estas preparando?";
  title.className = "title";
  bgPost.appendChild(title);

  //Input para escribir posts
  const post = document.createElement("textarea");
  post.className = "post";  
  bgPost.appendChild(post);

  //Botón para publicar posts
  const postBtn = document.createElement("button");
  postBtn.innerHTML = "Publicar";
  postBtn.className = "postBtn";
  bgPost.appendChild(postBtn);

  //Contenedor Padre de post
  const containerPost = document.createElement("div");
  containerPost.setAttribute("id", "postPrint");
  containerPost.className = "cPost";
  postsWall.appendChild(containerPost);

  //Aparecen los posts impresos cuando se abre sesión
  printPost(containerPost);


  //Funcion para publicar posts en el muro
  postBtn.addEventListener("click", (event) => {
    const valuePost = post.value;
    if (createPost(valuePost)) {
      post.value = "";
    } else if (createPost(valuePost) == null) {
      alert = "¡Olvidaste ingresar tu post!";
    }
    return false;
  });

  //función boton logout (cierra sesión y direcciona al login limpio)
  logOutLogo.addEventListener("click", () => {
    navigate("/");
    const cleanEmail = document.getElementById("email");
    cleanEmail.value = " ";
    const cleanPassword = document.getElementById("password");
    cleanPassword.value = "";
  });

  //Funcion para dar like
  /*const like = document.getElementById('likeImg');
  like.addEventListener("click", ()=> {
  console.log("Me diste like");
});*/

  return postsWall;
}

export { wall };
