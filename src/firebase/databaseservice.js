import { getAuth } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { app } from "./firebase.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  Timestamp,
  onSnapshot,
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
        likes: []
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
    let html = "";
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      console.log(post);
      html += `
   <div class= "pContainer">  
    <div class= "photoAndUserName">
      <img class='userPhoto' width='80'  src='./img/gorrito-chef.jpg'/>
      <p class="userNamePost"> ${post.userName}</p>
    </div> 
    <div class="textAndEmoji">
      <div class="divText"> <p class= "publication"> ${post.text} </p> </div> 
      <img class='likeImg'  src='./img/like.png' data-id="${doc.id}"/>
    </div>
  </div>
  `;
      console.log(doc.id, " => ", doc.data());
    });

    containerPost.innerHTML = html;
    containerPost.querySelectorAll(".likeImg").forEach((img) =>
      img.addEventListener("click", (event) => {
        console.log("Nos dieron like", event.target.dataset.id);
      })
    );
  });
}

// guardar Post
/*export const savePost = (description) => {
  let userName;
  if (auth.currentUser.displayName == null) {
    let separateEmail = auth.currentUser.email.split('@');
    userName = separateEmail[0];
  } else {
    userName = auth.currentUser.displayName;
  }
  addDoc(collection(db, 'Post'), {
    uid: auth.currentUser.uid,
    name: userName,
    description: description,
    likes:[],
    likesCounter: 0,
    datepost: Timestamp.fromDate(new Date()),
  });
};*/

export { createPost, printPost };
