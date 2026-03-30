<script setup lang="ts">
const selected = defineModel<string>();
const props = defineProps<{
  options?: string[];
}>();

const onOptionSelected = (opt: string) => (selected.value = opt);
</script>

<template>
  <nav class="row stretch-h">
    <button
      v-for="opt in props.options"
      :key="opt"
      :class="{ active: opt == selected }"
      @click="onOptionSelected(opt)"
    >
      {{ opt }}
    </button>
  </nav>
</template>

<style scoped>
button {
  padding: 0;

  width: 100%;
  height: 2.75rem;

  border: none;
  border-bottom: 2px solid transparent;

  font-size: 80%;
  font-weight: 800;
  letter-spacing: 0.15rem;

  color: var(--text-dim);
  background-color: transparent;

  transition: all 0.2s;
  cursor: pointer;

  @media (min-width: 2560px) {
    height: 4rem;
    font-size: 150%;
  }
}

button:hover {
  color: var(--text-main);
  background-color: var(--bg-surface);
  border-bottom: 2px solid var(--border-main);
}

button.active {
  color: var(--color-accent);
  border-bottom: 2px solid var(--color-accent);
}
</style>
