<script setup lang="ts">
import { NUTRIENT_DISPLAY_NAMES } from "@/constants";
import OutlineButton from "@/ui/action/OutlineButton.vue";
import RefreshIcon from "@/ui/icon/RefreshIcon.vue";
import ListLoadingEffect from "@/ui/list/ListLoadingEffect.vue";
import { onMounted, ref } from "vue";
import BarGraph from "./BarGraph.vue";
import {
  useWeeklySummary,
  type WeeklyNutrients,
} from "./composables/weekly.composable";

const DISPLAY_ORDER = ["kcal", "protein", "carbs", "fats", "fiber", "sodium"];

const { getWeekData, extractNutrientsFromWeek } = useWeeklySummary();

const isLoading = ref(false);
const nutrients = ref<Map<string, WeeklyNutrients>>(new Map());

function loadWeeklySummary() {
  if (isLoading.value) return;
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
}

onMounted(() => {
  loadWeeklySummary();
});
</script>

<template>
  <div class="wrapper col">
    <div class="row apart center">
      <h2 class="section-title">Weekly summary</h2>
      <OutlineButton @click="loadWeeklySummary">
        <RefreshIcon />
      </OutlineButton>
    </div>
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
  gap: 0.75rem;
  height: 100%;
}
</style>
