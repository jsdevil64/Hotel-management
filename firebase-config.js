import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  collection, 
  addDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAg_PabXfpmFFL_mTTJU3DZwNunSIvTvZs",
  authDomain: "hoteljobs-92423.firebaseapp.com",
  projectId: "hoteljobs-92423",
  storageBucket: "hoteljobs-92423.firebasestorage.app",
  messagingSenderId: "921992776991",
  appId: "1:921992776991:web:627f47862bf9d4747db42a",
  measurementId: "G-QPD2N66X4V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc, collection, addDoc 
       };
// firebase-config.js கடைசியில் இருக்க வேண்டியது:
export { auth, db, doc, getDoc };
