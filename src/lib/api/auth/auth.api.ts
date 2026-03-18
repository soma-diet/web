import { redirectAfterLogin, redirectAfterLogout } from "@/router/router.util";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "../../infra/firebase";
import { GithubAuthProvider } from "firebase/auth/web-extension";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Successfully authenticated with Google!", result.user.uid);
    redirectAfterLogin();
    return result.user;
  } catch (error: any) {
    if (error.code === "auth/popup-closed-by-user") {
      console.log("User closed the login window.");
    } else {
      console.error("Auth Error:", error.message);
    }
  }
}

export async function signInWithGitHub() {
  const provider = new GithubAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Successfully authenticated with GitHub!", result.user.uid);
    redirectAfterLogin();
    return result.user;
  } catch (error: any) {
    if (error.code === "auth/popup-closed-by-user") {
      console.log("User closed the login window.");
    } else {
      console.error("Auth Error:", error.message);
    }
  }
}

export async function logOut() {
  try {
    await signOut(auth);
    redirectAfterLogout();
  } catch (error: any) {
    console.log("Sign out error");
  }
}
