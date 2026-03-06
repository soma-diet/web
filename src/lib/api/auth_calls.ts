import { auth, signInAnonymously } from "../auth/firebase";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    let user = auth.currentUser;

    if (!user) {
        const userCredential = await signInAnonymously(auth);
        user = userCredential.user;
    }

    const token = await user.getIdToken();
    console.debug("Sending token:", token.substring(0, 15) + "...");

    const headers: Record<string, string> = {
        "Authorization": `Bearer ${token}`,
        ...((options.headers as Record<string, string>) || {}),
    };

    if (options.method && options.method !== 'GET' && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`API Error: ${response.status} ${response.statusText}`, errorBody);
        throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }

    return response;
}
