<script setup lang="ts">
import { useNetwork } from "./composables/network.composable";

import OfflineScreen from "@/layout/OfflineScreen.vue";
import AlertsDisplay from "./features/supporting/alerts/AlertsDisplay.vue";

const { online } = useNetwork();
</script>

<template>
  <AlertsDisplay />
  <RouterView v-if="online" />
  <OfflineScreen v-else />
</template>
