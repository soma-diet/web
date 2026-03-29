<script setup lang="ts">
import { logOut } from "@/lib/api";
import { useAuthStore } from "@/lib/stores";
import { useAnalysisSelectionStore } from "@/lib/stores/analysis-selection.store";
import { useMobile } from "@/lib/stores/mobile.store";
import OutlineButton from "@/lib/ui/action/OutlineButton.vue";
import RotatingSomaLogo from "@/lib/ui/animated/RotatingSomaLogo.vue";
import DiaryIcon from "@/lib/ui/icon/DiaryIcon.vue";
import GraphIcon from "@/lib/ui/icon/GraphIcon.vue";
import LogOutIcon from "@/lib/ui/icon/LogOutIcon.vue";
import SearchIcon from "@/lib/ui/icon/SearchIcon.vue";
import TargetIcon from "@/lib/ui/icon/TargetIcon.vue";
import { computed, ref, watch } from "vue";
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
      // TODO sign out error poup
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
    <div class="right center">
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
    </div>
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

  div {
    height: 100%;
    gap: 1rem;
  }

  h1 {
    color: var(--text-main);
    margin: 0;
  }
}
</style>
