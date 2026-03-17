<script setup lang="ts">
import { MACROS_KEYS, NUTRIENT_DISPLAY_NAMES, NUTRITION_KEYS } from '@/lib/constants';

const nutrientInput = defineModel<Record<string, number | null>>("nutrients", { required: true });
</script>

<template>
  <ul>
    <LabeledNumberInput :key="key" v-for="key in NUTRITION_KEYS" :label="NUTRIENT_DISPLAY_NAMES[key] ?? key" :name="key"
      v-model="nutrientInput[key]" :required="MACROS_KEYS.some(_key => _key === key)" />
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: space-between;
}
</style>