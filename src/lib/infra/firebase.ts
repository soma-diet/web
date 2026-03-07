import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, GoogleAuthProvider, linkWithPopup, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIgpS7J7PO8_PUgm4a-2fHimDxDIcEgto",
    authDomain: "soma-universe.firebaseapp.com",
    projectId: "soma-universe",
    storageBucket: "soma-universe.firebasestorage.app",
    messagingSenderId: "790193824164",
    appId: "1:790193824164:web:3afd8434b76b68cbc52131",
    measurementId: "G-8Q7YE91CV9"
};

export function isLoggedIn(): boolean {
    const user = auth.currentUser;
    return (user && !user.isAnonymous) ?? false;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { signInAnonymously, GoogleAuthProvider, linkWithPopup, signInWithPopup };