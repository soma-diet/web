<script setup lang="ts">
import { useAuthStore } from '@/lib/stores';
import { computed } from 'vue';

const authStore = useAuthStore();
let email = computed<string | null>(() => authStore.authUser?.email ?? null);
</script>

<template>
  <header class="apart center">
    <div class="left center">
      <SomaLogoIcon />
      <h1>SOMA</h1>
    </div>
    <div id="actions" class="right center">
      <template v-if="authStore.isLoggedIn">
        <span>logged user: {{ email }}</span>
        <a href="#actions">targets</a>
      </template>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: var(--primary-color);
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
  color: var(--secondary-color);
  margin: 0;
}

#actions a {
  color: var(--secondary-color);
  font-size: 125%;
  text-decoration: none;
  font-style: italic;
}

#actions a:hover {
  color: var(--pentarery-color);
}
</style>
