<script setup lang="ts">
import { computed } from 'vue';
import { NUTRIENT_DISPLAY_NAMES, roundNutrient } from '@/lib/constants';
import { useTargetsStore } from '@/lib/stores';
import { useSummaryStore } from '@/lib/stores/summary.store';
import type { Macronutrients, Micronutrients } from '@/lib/model';

const props = defineProps<{
  grams: number;
  originalGrams: number;
  macros: Macronutrients;
  micros: Micronutrients;
}>();

const { summaryState } = useSummaryStore();
const { targetsState } = useTargetsStore();

const data = computed(() => {
  if (!targetsState.dailyTargets) return [];

  const loadedTargetKeys = Object.keys(targetsState.dailyTargets) as (keyof typeof targetsState.dailyTargets)[];
  const nutrients = { ...props.macros, ...props.micros };

  return loadedTargetKeys.map((key) => {
    const max = targetsState.dailyTargets?.[key] ?? 0;

    const savedTotal = summaryState.dailySummary?.[key] ?? 0;
    const nutrientSize = nutrients[key as (keyof Macronutrients | keyof Micronutrients)] ?? 0;

    // spocitat jake mnozstvi uz je zalogovane (kdyz updatujeme log entry tak jsou jeji macros uz zapocitane v summary)
    const alreadyLoggedMacros = (nutrientSize / 100) * props.originalGrams;
    const baseCurrent = Math.max(0, savedTotal - alreadyLoggedMacros);

    const projectedAdd = (nutrientSize / 100) * props.grams;

    return {
      key,
      name: NUTRIENT_DISPLAY_NAMES[key] ?? key,
      current: roundNutrient(baseCurrent),
      projected: roundNutrient(projectedAdd),
      projectedTotal: roundNutrient(baseCurrent + projectedAdd),
      max: roundNutrient(max),
    }
  });
});
</script>

<template>
  <ul class="col">
    <li v-for="target in data" :key="target.key" class="col">
      <div class="row apart">
        <span>{{ target.name }}</span>
        <span>
          {{ target.projectedTotal }} / {{ target.max }}
        </span>
      </div>

      <macro-bar :filled="target.current" :projected="target.projected" :max="target.max" />
    </li>
  </ul>
</template>

<style scoped>
ul {
  gap: 1rem;

  li {
    gap: 0.25rem;
  }

  li span {
    font-size: 0.875rem;
  }

  li span:first-child {
    color: var(--text-main);
  }

  li span:last-child {
    color: var(--text-dim);
  }
}
</style>