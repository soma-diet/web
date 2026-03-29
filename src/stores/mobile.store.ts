import { computed, ref } from "vue";

const MOBILE_FROM_PX = 1000;

const isMobile = ref(window.innerWidth <= MOBILE_FROM_PX);

window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth <= MOBILE_FROM_PX;
});

// handling sections when screen is on mobile
type Section = "fridge" | "log" | "graph";
const activeSection = ref<Section>("fridge");
function setActiveSection(section: Section) {
  activeSection.value = section;
}
const isFridgeActive = computed(
  () => !isMobile.value || activeSection.value === "fridge",
);
const isLogActive = computed(
  () => !isMobile.value || activeSection.value === "log",
);
const isGraphsActive = computed(
  () => !isMobile.value || activeSection.value === "graph",
);

export function useMobile() {
  return {
    isMobile,
    isFridgeActive,
    isLogActive,
    isGraphsActive,
    setActiveSection,
  };
}
