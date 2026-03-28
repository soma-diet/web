<script setup lang="ts">
import {
  MACROS_KEYS,
  NUTRIENT_DISPLAY_NAMES,
  NUTRITION_KEYS,
  roundNutrient,
} from "@/lib/constants";
import LabeledNumberInput from "@/lib/ui/form/input/labeled/LabeledNumberInput.vue";

const nutrientInput = defineModel<Record<string, number | null>>("nutrients", {
  required: true,
});

// pres const list, aby se nevypocitavali znova pri kazde zmene inputu
const placeholders = NUTRITION_KEYS.map((_) =>
  roundNutrient(Math.random() * 10).toString(),
);
</script>

<template>
  <ul class="col">
    <li :key="key" v-for="(key, index) in NUTRITION_KEYS">
      <LabeledNumberInput
        :label="NUTRIENT_DISPLAY_NAMES[key] ?? key"
        :name="key"
        v-model:value="nutrientInput[key]"
        :required="MACROS_KEYS.some((_key) => _key === key)"
        :placeholder="placeholders[index]"
      />
    </li>
  </ul>
</template>

<style scoped>
ul {
  gap: 1rem;
}
</style>
