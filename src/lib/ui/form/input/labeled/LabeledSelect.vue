<script setup lang="ts">
import { useId } from 'vue';

const selected = defineModel<any>("selected", { required: true });

interface Option {
  name: string,
  value: any
}
const props = defineProps<{
  label: string,
  options: Option[]
}>();

const selectId = useId();
</script>

<template>
  <div class="col">
    <label class="accent-heading" :for="selectId">{{ props.label }}</label>
    <select :id="selectId" v-model="selected">
      <option v-for="(opt, index) in options" :key="index" :value="opt.value">{{ opt.name }}</option>
    </select>
  </div>
</template>

<style scoped>
div {
  gap: 0.5rem;
}

select {
  background-color: var(--bg-surface);
  color: var(--text-main);
  padding: 0.5rem;
}

select:focus-visible {
  outline: none;
  border-color: var(--color-accent);
}

option {
  color: var(--text-main);
}

option:checked {
  color: var(--color-accent);
}
</style>