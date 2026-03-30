// firebase api auth funkce
import { auth, githubAuthProvider, googleAuthProvider } from "@/infra/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export async function signInWithGoogle() {
  return await signInWithPopup(auth, googleAuthProvider);
}

export async function signInWithGitHub() {
  return await signInWithPopup(auth, githubAuthProvider);
}

export async function logOut() {
  await signOut(auth);
}
