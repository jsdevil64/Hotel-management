import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  getDocs,
  getDoc 
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

export { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  getDocs,
  getDoc 
};


