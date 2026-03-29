<script setup lang="ts">
import { useAlerts } from "@/composables/alert.composable";

const { alertsState } = useAlerts();
</script>

<template>
  <ul v-show="alertsState.active.length > 0" class="alerts">
    <li v-for="alert in alertsState.active" :key="alert.id">
      {{ alert.message }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  position: absolute;
  top: 0.5rem;
  left: 0;
  z-index: 10;
  background-color: transparent;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  pointer-events: none;

  li {
    max-width: 50%;
    padding: 1rem;

    background-color: var(--bg-surface-light);

    color: var(--text-main);
    text-align: center;
    font-weight: 900;

    border: 2px groove var(--color-accent);
    border-radius: 0.5rem;
  }
}
</style>
