<script setup lang="ts">
import {
  NUTRIENT_DISPLAY_NAMES,
  NUTRITION_KEYS,
  roundNutrient,
} from "@/constants";
import LabeledNumberInput from "@/ui/form/input/labeled/LabeledNumberInput.vue";

const nutrientInput = defineModel<Record<string, number | null>>("nutrients", {
  required: true,
});
const errors = defineModel<Record<string, string>>("errors", {
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
        :placeholder="placeholders[index]"
        :error="errors[key]"
        @input="delete errors[key]"
        v-model:value="nutrientInput[key]"
      />
    </li>
  </ul>
</template>

<style scoped>
ul {
  gap: 1rem;
}
</style>
