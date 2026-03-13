/* DROP
stores obsahuji promenne, ktere updatuji a tim davaji zbytku aplikace nejaky stav
na ktery mohou poslouchat a cekat
*/

import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../infra/firebase";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const authUser = ref<User | null>(null);

    const isAuthLoading = ref<boolean>(true);
    const isLoggedIn = computed(
        () => authUser.value !== null && !authUser.value.isAnonymous,
    );

    onAuthStateChanged(auth, (user) => {
        authUser.value = user;
        isAuthLoading.value = false;
    });

    return {
        authUser,
        isAuthLoading,
        isLoggedIn,
    };
});
