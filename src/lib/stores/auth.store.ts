/* DROP
stores obsahuji promenne, ktere updatuji a tim davaji zbytku aplikace nejaky stav
na ktery mohou poslouchat a cekat
*/

import { onAuthStateChanged, type User } from "firebase/auth";
import { reactive } from "vue";
import { auth } from "../infra/firebase";

export const authStore = reactive({
  user: null as User | null,
  isLoading: true as boolean,
  get isLoggedIn(): boolean {
    return this.user !== null && !this.user.isAnonymous;
  },
});

onAuthStateChanged(auth, (user) => {
  authStore.user = user;
  authStore.isLoading = false;
});
