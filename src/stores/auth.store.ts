// auth.store.ts
import { onAuthStateChanged, type User } from "firebase/auth";
import { reactive } from "vue";
import { auth } from "../infra/firebase";

const authState = reactive({
  user: null as User | null,
  isLoading: true as boolean,
  get isLoggedIn(): boolean {
    return this.user !== null && !this.user.isAnonymous;
  },
});

onAuthStateChanged(auth, (user) => {
  authState.user = user;
  authState.isLoading = false;
});

export function useAuthStore() {
  return { authState };
}
