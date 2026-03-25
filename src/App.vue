<script setup lang="ts">
import { Suspense } from 'vue';
import ListLoadingEffect from './lib/ui/list/ListLoadingEffect.vue';
import { useAppState } from './lib/stores/app.store';

const { appState: { online } } = useAppState();
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
  <span v-else>you are offline</span>
</template>
