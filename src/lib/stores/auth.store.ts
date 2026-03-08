/* DROP
stores obsahuji promenne, ktere updatuji a tim davaji zbytku aplikace nejaky stav
na ktery mohou poslouchat a cekat
*/

import { writable, derived } from 'svelte/store';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../infra/firebase';

// CORE STATES
export const authUser = writable<User | null>(null);
export const authLoading = writable<boolean>(true);

// DERIVED HELPERS
export const isAuthLoading = derived(authLoading, ($loading) => $loading);
export const isLoggedIn = derived(authUser, ($user) => $user !== null && !$user.isAnonymous);

onAuthStateChanged(auth, (user) => {
    authUser.set(user);
    authLoading.set(false);
});