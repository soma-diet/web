<script setup lang="ts">
import Header from './lib/features/layout/Header.vue';
import { useAuthStore } from './lib/stores';

const authStore = useAuthStore();
</script>

<template>
  <AuthPrompt v-if="authStore.isAuthLoading || !authStore.isLoggedIn" />
  <div id="content">
    <Header />
    <main>
      <section class="side-view">
        <FridgeSection />
      </section>
      <section class="main-view">
        <LogSection />
      </section>
      <section class="side-view">
        <AnalysisSection />
      </section>
    </main>
  </div>
</template>

<style scoped>
#content {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1px;
  height: 100%;
  width: 100%;
  background-color: var(--border-color);
}

main {
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 1px;
  min-height: 0;
}

section {
  background-color: var(--primary-color);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
  min-height: 0;
  min-width: 0;
}

section.side-view {
  flex: 2;
}

section.main-view {
  flex: 3;
}

section:last-child {
  border-right: 1px solid var(--border-color);
}

/* bevel border edges */
section:first-child {
  clip-path: polygon(0% 0%,
      calc(100% - 7px) 0%,
      100% 7px,
      100% 100%,
      0% 100%);
}

section:not(:first-child):not(:last-child) {
  clip-path: polygon(7px 0%,
      calc(100% - 7px) 0%,
      100% 7px,
      100% 100%,
      0% 100%,
      0% 7px);
}

section:last-child {
  clip-path: polygon(7px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 7px);
}
</style>
