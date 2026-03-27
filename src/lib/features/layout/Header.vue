<script setup lang="ts">
import { logOut } from '@/lib/api';
import { useAuthStore } from '@/lib/stores';
import { useAnalysisSelectionStore } from '@/lib/stores/analysis-selection.store';
import OutlineButton from '@/lib/ui/action/OutlineButton.vue';
import RotatingSomaLogo from '@/lib/ui/animated/RotatingSomaLogo.vue';
import LogOutIcon from '@/lib/ui/icon/LogOutIcon.vue';
import TargetIcon from '@/lib/ui/icon/TargetIcon.vue';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { authState } = useAuthStore();
const { openTargetsForm } = useAnalysisSelectionStore();

// rotating logo on hover logic
const hoveringLogo = ref(false);
const onLogoHovered = () => hoveringLogo.value = true;
const onLogoLeft = () => hoveringLogo.value = false;
const logoRotationDuration = computed(() => hoveringLogo.value ? 0.75 : 10);
const logoRotationDelay = computed(() => hoveringLogo.value ? 0.05 : 30);

function handleLogOut() {
  logOut().then(() => {
    router.push({ name: "SignIn" });
  }).catch(() => {
    // TODO sign out error poup
  })
}
</script>

<template>
  <header class="apart center">
    <div class="left center">
      <RotatingSomaLogo @mouseenter="onLogoHovered" @mouseleave="onLogoLeft" :duration="logoRotationDuration"
        :delay="logoRotationDelay" :linear="hoveringLogo" />
      <h1>SOMA</h1>
    </div>
    <div class="right center">
      <template v-if="authState.isLoggedIn">
        <OutlineButton @click="handleLogOut">
          <LogOutIcon />
        </OutlineButton>
        <OutlineButton @click="openTargetsForm">
          <TargetIcon />
        </OutlineButton>
      </template>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: var(--bg-body);
  padding: 1rem;
  height: 5rem;
}

header>div {
  height: 100%;
  gap: 1rem;
}

header>div :deep(svg) {
  height: 100%;
  width: auto;
}

h1 {
  color: var(--text-main);
  margin: 0;
}
</style>
