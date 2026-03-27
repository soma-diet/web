<script setup lang="ts">
import { Suspense } from 'vue';
import { useNetwork } from './composables/network.composable';

import ListLoadingEffect from './lib/ui/list/ListLoadingEffect.vue';
import OfflineScreen from '@/layout/OfflineScreen.vue';

const { online } = useNetwork();
</script>

<template>
  <Suspense v-if="online">
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      <ListLoadingEffect />
    </template>
  </Suspense>
  <OfflineScreen v-else />
</template>
