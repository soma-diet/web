<script setup lang="ts">
import { MACROS_KEYS, NUTRIENT_DISPLAY_NAMES, NUTRITION_KEYS } from '@/lib/constants';
import LabeledNumberInput from '@/lib/ui/form/input/labeled/LabeledNumberInput.vue';

const nutrientInput = defineModel<Record<string, number | null>>("nutrients", { required: true });
</script>

<template>
  <ul class="col">
    <li :key="key" v-for="key in NUTRITION_KEYS">
      <LabeledNumberInput :label="NUTRIENT_DISPLAY_NAMES[key] ?? key" :name="key" v-model:value="nutrientInput[key]"
        :required="MACROS_KEYS.some(_key => _key === key)" />
    </li>
  </ul>
</template>

<style scoped>
ul {
  gap: 1rem;
}
</style>