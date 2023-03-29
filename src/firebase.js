// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6ZkDK5mzKDJim9iVlDrTSV-88l8AJFzc",
  authDomain: "jajistblog.firebaseapp.com",
  projectId: "jajistblog",
  storageBucket: "jajistblog.appspot.com",
  messagingSenderId: "683241424600",
  appId: "1:683241424600:web:8196f088a77fdbc3c339ad",
  measurementId: "G-K9C8YQMJ32",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  provider,
  auth,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  db,
  storage,
};
