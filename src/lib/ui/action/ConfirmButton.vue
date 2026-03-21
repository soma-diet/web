<script setup lang="ts">

</script>

<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  padding: 0.5rem 0.75rem;

  background-color: var(--color-accent);
  color: var(--text-on-accent);

  border-width: 2px;
  border-style: solid;
  border-color: var(--border-main) !important;
  border-radius: 0.5em;
}

button:hover {
  background-color: var(--color-accent-hover);
  cursor: pointer;
}
</style>