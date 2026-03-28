<script setup lang="ts">
import { useNetwork } from "./composables/network.composable";

import OfflineScreen from "@/layout/OfflineScreen.vue";

const { online } = useNetwork();
</script>

<template>
  <RouterView v-if="online" />
  <OfflineScreen v-else />
</template>
