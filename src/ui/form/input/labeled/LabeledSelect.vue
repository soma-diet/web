<script setup lang="ts">
import { useId } from "vue";

const selected = defineModel<any>("selected", { required: true });

interface Option {
  name: string;
  value: any;
}
const props = defineProps<{
  label: string;
  options: Option[];
}>();

const selectId = useId();
</script>

<template>
  <div class="col">
    <label class="accent-heading" :for="selectId">{{ props.label }}</label>
    <select :id="selectId" v-model="selected" v-bind="$attrs" class="input-field">
      <option v-for="(opt, index) in options" :key="index" :value="opt.value">
        {{ opt.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
div {
  gap: 0.5rem;
}

option {
  color: var(--text-main);
}

option:checked {
  color: var(--color-accent);
}

@media (min-width: 2560px) {
  select {
    font-size: 150%;
  }
}
</style>
