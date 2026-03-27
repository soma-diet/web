<script setup lang="ts">
import { Suspense } from 'vue';
import ListLoadingEffect from './lib/ui/list/ListLoadingEffect.vue';
import { useNetwork } from './composables/network.composable';
import OfflineScreen from './layout/OfflineScreen.vue';

const { online } = useNetwork();
</script>

<template>
  <Suspense v-if="online">
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <ListLoadingEffect />
    </template>
  </Suspense>
  <OfflineScreen v-else />
</template>
