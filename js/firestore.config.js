// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
  onSnapshot,
  query,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
import { renderRecipe } from "./ui.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4zKSj57MWeWuWC6OWyzACOdpQJd2f8j0",
  authDomain: "pwa-cookbook-a2145.firebaseapp.com",
  projectId: "pwa-cookbook-a2145",
  storageBucket: "pwa-cookbook-a2145.appspot.com",
  messagingSenderId: "427896476027",
  appId: "1:427896476027:web:ba1c97018169c1e36a6dde",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getData = async (collectionName) => {
  const q = query(collection(db, collectionName));

  const snapshot = onSnapshot(q, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        //Add data to the app
        renderRecipe(change.doc.data(), change.doc.id);
      }
      if (change.type === "removed") {
        //Remove data from the app
      }
    });
  });
};

export { db, getData };
