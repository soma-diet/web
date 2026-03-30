<script setup lang="ts">
interface Props {
  placeholder?: string;
}
const props = defineProps<Props>();
const model = defineModel<string>();
</script>

<template>
  <input type="search" :placeholder="props.placeholder" v-model="model" />
</template>

<style scoped>
input {
  background-color: var(--bg-surface);
  color: var(--text-main);

  border-radius: 0.5em;
  border: none;
  padding: 0 1rem;
  outline: none;

  font-size: 100%;
}
</style>
