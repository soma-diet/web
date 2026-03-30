<script setup lang="ts">
import { logOut } from "@/api";
import { useAlerts } from "@/composables/alert.composable";
import { useAuthStore } from "@/stores";
import { useAnalysisSelectionStore } from "@/stores/analysis-selection.store";
import { useMobile } from "@/stores/mobile.store";
import OutlineButton from "@/ui/action/OutlineButton.vue";
import RotatingSomaLogo from "@/ui/animated/RotatingSomaLogo.vue";
import DiaryIcon from "@/ui/icon/DiaryIcon.vue";
import GraphIcon from "@/ui/icon/GraphIcon.vue";
import LogOutIcon from "@/ui/icon/LogOutIcon.vue";
import SearchIcon from "@/ui/icon/SearchIcon.vue";
import TargetIcon from "@/ui/icon/TargetIcon.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { authState } = useAuthStore();
const { analysisSelectionState, openTargetsForm } = useAnalysisSelectionStore();
const {
  isMobile,
  setActiveSection,
  isFridgeActive,
  isGraphsActive,
  isLogActive,
} = useMobile();
const { scheduleAlert } = useAlerts();

// rotating logo on hover logic
const hoveringLogo = ref(false);
const onLogoHovered = () => (hoveringLogo.value = true);
const onLogoLeft = () => (hoveringLogo.value = false);
const logoRotationDuration = computed(() => (hoveringLogo.value ? 0.75 : 10));
const logoRotationDelay = computed(() => (hoveringLogo.value ? 0.05 : 30));

function handleLogOut() {
  logOut()
    .then(() => {
      router.push({ name: "SignIn" });
    })
    .catch(() => {
      scheduleAlert("Failed to log out. Please try again.");
    });
}

function handleTargetsPressed() {
  setActiveSection("graph");
  openTargetsForm();
}
</script>

<template>
  <header class="apart center">
    <div class="left center">
      <RotatingSomaLogo
        :duration="logoRotationDuration"
        :delay="logoRotationDelay"
        :linear="hoveringLogo"
        @mouseleave="onLogoLeft"
        @mouseenter="onLogoHovered"
        class="logo"
      />
      <h1 v-show="!isMobile">SOMA</h1>
    </div>
    <nav class="right center">
      <template v-if="authState.isLoggedIn">
        <OutlineButton @click="handleLogOut">
          <LogOutIcon />
        </OutlineButton>
        <OutlineButton
          v-show="!analysisSelectionState.targetsFormOpen"
          @click="handleTargetsPressed"
        >
          <TargetIcon />
        </OutlineButton>

        <template v-if="isMobile">
          <OutlineButton
            v-if="!isFridgeActive"
            @click="setActiveSection('fridge')"
          >
            <SearchIcon />
          </OutlineButton>
          <OutlineButton v-if="!isLogActive" @click="setActiveSection('log')">
            <DiaryIcon />
          </OutlineButton>
          <OutlineButton
            v-if="!isGraphsActive"
            @click="setActiveSection('graph')"
          >
            <GraphIcon />
          </OutlineButton>
        </template>
      </template>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: var(--bg-body);
  padding: 1rem;
  height: 5rem;

  .logo {
    height: 100%;
    width: auto;
  }

  div,
  nav {
    height: 100%;
    gap: 1rem;
  }

  h1 {
    color: var(--text-main);
    margin: 0;
  }

  @media (min-width: 2560px) {
    padding: 1.5rem;
    height: 7rem;
  }
}
</style>
