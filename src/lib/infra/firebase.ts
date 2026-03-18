import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  linkWithPopup,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIgpS7J7PO8_PUgm4a-2fHimDxDIcEgto",
  authDomain: "soma-universe.firebaseapp.com",
  projectId: "soma-universe",
  storageBucket: "soma-universe.firebasestorage.app",
  messagingSenderId: "790193824164",
  appId: "1:790193824164:web:3afd8434b76b68cbc52131",
  measurementId: "G-8Q7YE91CV9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

export {
  auth,
  googleAuthProvider,
  githubAuthProvider,
  linkWithPopup,
  signInWithPopup,
  signOut,
};
