import { auth, googleAuthProvider, githubAuthProvider } from "@/infra/firebase";
import { signInWithPopup, signOut, type AuthProvider } from "firebase/auth";

async function signInWithProvider(provider: AuthProvider): Promise<boolean> {
  try {
    await signInWithPopup(auth, provider);
    return true;
  } catch (err: any) {
    if (err.code === "auth/popup-closed-by-user") {
      console.log("User closed the login window.");
    } else {
      console.error("Auth Error:", err.message);
    }
    return false;
  }
}

export async function signInWithGoogle() {
  return await signInWithProvider(googleAuthProvider);
}

export async function signInWithGitHub() {
  return await signInWithProvider(githubAuthProvider);
}

export async function logOut(): Promise<boolean> {
  try {
    await signOut(auth);
    return true;
  } catch (error: any) {
    console.log("Sign out error");
    return false;
  }
}
