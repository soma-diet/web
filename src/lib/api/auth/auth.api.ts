import {
    auth,
    GoogleAuthProvider,
    linkWithPopup,
    signInWithPopup,
} from "../../infra/firebase";

export async function registerWithGoogle() {
    const provider = new GoogleAuthProvider();
    const currentUser = auth.currentUser;

    try {
        if (currentUser && currentUser.isAnonymous) {
            // LINK ACCOUNT WHEN USER ANONYMOUS
            const result = await linkWithPopup(currentUser, provider);
            const user = result.user;
            console.log(
                "Successfully upgraded anonymous account!",
                user.uid,
            );
        } else {
            // STANDARD SIGN IN
            const result = await signInWithPopup(auth, provider);
            console.log("Logged in with Google!", result.user.uid);
        }
    } catch (error: any) {
        console.error("Auth Error:", error);

        // handling auth errors
        if (error.code === "auth/credential-already-in-use") {
            // TODO handle
            console.log("account in use");
        } else {
            console.log("different error:", error.messsage);
        }
    }
}