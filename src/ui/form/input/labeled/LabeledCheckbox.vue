<!-- LabeledCheckbox -->
<script setup lang="ts">
import { useId } from 'vue';

const props = defineProps<{
  label: string
}>();

const checked = defineModel<boolean>("checked");
const id = useId();
</script>

<template>
  <div class="row center">
    <input :id="id" type="checkbox" v-model="checked" />
    <label :for="id" class="accent-heading">{{ props.label }}</label>
  </div>
</template>

<style scoped>
div {
  gap: 0.5rem;
}

label {
  cursor: pointer;
}

input {
  appearance: none;

  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin: 0;

  background-color: var(--bg-surface);
  border: 1px solid var(--border-main);
  border-radius: 4px;
  cursor: pointer;

  transform: all 0.2s ease-in-out;
}

input:hover {
  border-color: var(--color-accent-hover);
}

input:checked {
  background-color: var(--color-accent);
  border-color: var(--color-accent);

  background-image: url("/assets/svg/check.svg");
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
