    <script setup lang="ts">
    import { kcalToKJ, NUTRIENT_DISPLAY_NAMES, NUTRIENT_SUFFIX, recalculateFields, roundNutrient } from "@/lib/constants";
    import { computed } from "vue";
    import type { Macronutrients, Micronutrients } from "../../../../model";

    const props = defineProps<{
      grams: number;
      macros: Macronutrients;
      micros: Micronutrients;
    }>();

    const mergedNutrients: Record<string, number | null> = { ...props.macros, ...props.micros };

    mergedNutrients["kj"] = mergedNutrients["kcal"] ? kcalToKJ(mergedNutrients["kcal"]) : null;

    const coefficient = computed(() => props.grams / 100);

    // pro urceni poradi a nazvu v tabulce
    const keyOrder = ["kj", "kcal", "fats", "protein", "carbs", "fiber", "sodium"]; // display order in nutrient table
    const nutrientVisuals = computed(() => {
      const visuals = [] as { label: string, value: string }[];
      const adjustedNutrients = recalculateFields(mergedNutrients, coefficient.value);
      for (const key of keyOrder) {
        const value = adjustedNutrients[key] ?? null;
        const displayValue = (value ? roundNutrient(value) : "?").toString() + " " + NUTRIENT_SUFFIX[key];
        visuals.push({
          label: NUTRIENT_DISPLAY_NAMES[key] ?? key,
          value: displayValue
        })
      }
      return visuals;
    });
</script>

<template>
  <table>
    <thead>
      <tr>
        <td>Nutritional information</td>
        <td class="text-center">per {{ props.grams }} g</td>
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
td {
  border: 1px solid var(--border-main);
  border-collapse: collapse;
  padding: 0.15rem 0.3rem;
}

thead td {
  font-weight: bold;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}
</style>
