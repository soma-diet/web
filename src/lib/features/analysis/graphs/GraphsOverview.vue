<script setup lang="ts">
import type { DailySummary } from "@/lib/model";
import { onMounted, ref } from "vue";
import BarGraph from "./components/BarGraph.vue";
import {
  extractNutrientsFromWeek,
  getWeekData,
  type WeeklyNutrients,
} from "./prepare-week-data";
import ListLoadingEffect from "@/lib/ui/list/ListLoadingEffect.vue";
import { NUTRIENT_DISPLAY_NAMES } from "@/lib/constants";

const DISPLAY_ORDER = ["kcal", "protein", "carbs", "fats", "fiber", "sodium"];

const isLoading = ref(true);
const nutrients = ref<Map<string, WeeklyNutrients>>(new Map());

onMounted(() => {
  isLoading.value = true;
  getWeekData()
    .then((result) => {
      for (const key of DISPLAY_ORDER) {
        const expanded = extractNutrientsFromWeek(key, result);
        nutrients.value.set(key, expanded);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <div class="wrapper col">
    <h2 class="upper">Graphs</h2>
    <template v-if="!isLoading">
      <BarGraph
        v-for="[key, data] of nutrients"
        :key
        :name="NUTRIENT_DISPLAY_NAMES[key] ?? key"
        :days="data.days"
        :values="data.values"
      />
    </template>
    <ListLoadingEffect v-else />
  </div>
</template>

<style scoped>
.wrapper {
  padding: 1.5rem;
  overflow-y: scroll;
}
</style>
