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
      <RotatingSomaLogo :duration="10" :delay="30" />
      <h1>SOMA</h1>
    </div>
    <div class="right center">
      <template v-if="authState.isLoggedIn">
        <span>LOGGED AS: {{ email }}</span>
        <button @click="logOut">sign out</button>
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
