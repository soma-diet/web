import {
    auth,
    GoogleAuthProvider,
    signInWithPopup,
} from "../../infra/firebase";

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        console.log("Successfully authenticated with Google!", result.user.uid);

        return result.user;
    } catch (error: any) {
        if (error.code === 'auth/popup-closed-by-user') {
            console.log("User closed the login window.");
        } else {
            console.error("Auth Error:", error.message);
        }
    }
}