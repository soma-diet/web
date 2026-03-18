import { redirectAfterLogin, redirectAfterLogout } from "@/router/router.util";
import {
  auth,
  githubAuthProvider,
  googleAuthProvider,
  signInWithPopup,
  signOut,
} from "../../infra/firebase";

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
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
  try {
    const result = await signInWithPopup(auth, githubAuthProvider);
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
