// src/lib/api/auth/auth.api.ts

import { auth } from "../infra/firebase";

function buildHeaders(token: string, options: RequestInit = {}): Record<string, string> {
    return {
        "Authorization": `Bearer ${token}`,
        ...((options.headers as Record<string, string>) || {}),
    };
}

async function getToken(): Promise<string> {
    // get auth
    await auth.authStateReady();
    const user = auth.currentUser;
    if (!user) {
        throw new Error("unauthorized: user is not logged in on fetchWithAuth!");
    }

    return await user.getIdToken();
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = await getToken();
    const headers: Record<string, string> = buildHeaders(token, options);

    // TODO co tohle? k cemu to je
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
