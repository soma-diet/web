<script setup lang="ts">
import { useNetwork } from "./composables/network.composable";

import AlertsDisplay from "@/features/supporting/alerts/AlertsDisplay.vue";
import OfflineScreen from "@/features/supporting/offline/OfflineScreen.vue";

const { online } = useNetwork();
</script>

<template>
  <AlertsDisplay />
  <RouterView v-if="online" />
  <OfflineScreen v-else />
</template>
