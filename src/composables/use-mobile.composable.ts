import { ref } from "vue";

const MOBILE_FROM_PX = 768;

const isMobile = ref(window.innerWidth <= MOBILE_FROM_PX);

window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth <= MOBILE_FROM_PX;
});

export function useMobile() {
  return { isMobile };
}
