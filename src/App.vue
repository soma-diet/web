<script setup lang="ts">
import { Suspense } from 'vue';
import ListLoadingEffect from './lib/ui/list/ListLoadingEffect.vue';

</script>

<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <ListLoadingEffect />
    </template>
  </Suspense>
</template>
