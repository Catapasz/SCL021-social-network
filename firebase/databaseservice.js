import { getAuth } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { app } from "./firebase.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  Timestamp,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

const db = getFirestore(app);
const auth = getAuth(app);

//Funcion Crear Post
async function createPost(description) {
  try {
    const docRef = await addDoc(
      collection(db, "Posts"),
      /*orderBy("date", "desc"),*/ {
        userName: auth.currentUser.displayName,
        date: Timestamp.fromDate(new Date()),
        text: description,
        uId: auth.currentUser.uid,
        likes: [],
      }
    );

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//Imprimir post
async function printPost(containerPost) {
  const allPost = query(collection(db, "Posts"));
  console.log(allPost);

  onSnapshot(allPost, (querySnapshot) => {
    querySnapshot.forEach((documento) => {
      const post = documento.data();
      console.log(post);
      const pContainer = document.createElement("div");
      pContainer.className = "pContainer";
      pContainer.innerHTML = `     
    <div class= "photoAndUserName">
      <img class='userPhoto' width='80'  src='./img/gorrito-chef.jpg'/>
      <p class="userNamePost"> ${post.userName}</p>
    </div> 
    <div class="textAndEmoji">
      <div class="divText"> <p class= "publication"> ${post.text} </p> </div> 
      <div class="likeNum"><span >${
        post.likes.length
      }</span></div>  <img class='likeImg'  src='./img/like.png' data-id="${
        documento.id
      }" data-likes="${post.likes.toString()}"/>
      
    </div>   `;
      containerPost.append(pContainer);
      pContainer.querySelectorAll(".likeImg").forEach((img) =>
        img.addEventListener("click", async (event) => {
          const docRef = doc(db, "Posts", event.target.dataset.id);
          let likes = [...event.target.dataset.likes.split(",")];
          await updateDoc(docRef, {
            likes: [...likes, auth.currentUser.email],
          });
        })
      );
      console.log(documento.id, " => ", documento.data());
    });
  });
}


export { createPost, printPost };
