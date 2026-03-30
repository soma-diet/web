<script setup lang="ts">
import {
  kcalToKJ,
  NUTRIENT_DISPLAY_NAMES,
  NUTRIENT_SUFFIX,
  recalculateFields,
  roundNutrient,
} from "@/constants";
import type { Macronutrients, Micronutrients } from "@/model";
import { computed } from "vue";

const props = defineProps<{
  grams: number;
  macros: Macronutrients;
  micros: Micronutrients;
}>();

const mergedNutrients: Record<string, number | null> = {
  ...props.macros,
  ...props.micros,
};

mergedNutrients["kj"] = mergedNutrients["kcal"]
  ? kcalToKJ(mergedNutrients["kcal"])
  : null;

const coefficient = computed(() => props.grams / 100);

// pro urceni poradi a nazvu v tabulce
const keyOrder = ["kj", "kcal", "fats", "protein", "carbs", "fiber", "sodium"]; // display order in nutrient table
const nutrientVisuals = computed(() => {
  const visuals = [] as { label: string; value: string }[];
  const adjustedNutrients = recalculateFields(
    mergedNutrients,
    coefficient.value,
  );

  // pro kazdy klic najit jeho display jmeno a spocitat mu zaokrouhlenou display hodnotu
  for (const key of keyOrder) {
    const value = adjustedNutrients[key] ?? null;
    const displayValue =
      (value !== null ? roundNutrient(value) : "?").toString() +
      " " +
      NUTRIENT_SUFFIX[key];
    visuals.push({
      label: NUTRIENT_DISPLAY_NAMES[key] ?? key,
      value: displayValue,
    });
  }
  return visuals;
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col" class="text-left">Nutritional information</th>
        <th scope="col" class="text-center">per {{ props.grams }} g</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry of nutrientVisuals" :key="entry.label">
        <td class="text-left">{{ entry.label }}</td>
        <td class="text-center">{{ entry.value }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table,
th,
td {
  border: 1px solid var(--border-main);
  border-collapse: collapse;
  padding: 0.15rem 0.3rem;
}

thead th {
  font-weight: bold;
}

tbody tr:nth-child(odd) {
  background-color: var(--bg-surface);
}

@media (min-width: 2560px) {
  th,
  td {
    font-size: 150%;
    padding: 0.3rem 0.5rem;
  }
}
</style>
