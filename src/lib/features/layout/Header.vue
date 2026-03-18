<script setup lang="ts">
import { logOut } from '@/lib/api';
import { useAuthStore } from '@/lib/stores';
import { computed } from 'vue';

const { authState } = useAuthStore();
let email = computed<string | null>(() => authState.user?.email ?? null);
</script>

<template>
  <header class="apart center">
    <div class="left center">
      <SomaLogoIcon />
      <h1>SOMA</h1>
    </div>
    <div class="right center actions">
      <template v-if="authState.isLoggedIn">
        <span>LOGGED AS: {{ email }}</span>
        <button @click="logOut">sign out</button>
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

.actions a {
  color: var(--secondary-color);
  font-size: 125%;
  text-decoration: none;
  font-style: italic;
}

.actions a:hover {
  color: var(--pentarery-color);
}
</style>
