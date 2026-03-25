import { reactive } from "vue";

const appState = reactive({
  online: navigator.onLine
});

window.addEventListener('online', () => appState.online = true);
window.addEventListener('offline', () => appState.online = false);

export function useAppState() {
  return { appState }
}

