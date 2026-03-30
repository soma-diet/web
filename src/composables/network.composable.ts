import { ref } from "vue";

const online = ref<boolean>(navigator.onLine);

// na zmene stavu online statusu zmenit ref
window.addEventListener('online', () => online.value = true);
window.addEventListener('offline', () => online.value = false);

export function useNetwork() {
  return { online }
}

