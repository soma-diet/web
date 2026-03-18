<script setup lang="ts">

import { computed, onMounted, ref, watchEffect } from "vue";
import { getDailySummary } from "../../../../api";
import type { DailySummary, DailyTargets } from "../../../../model";
import { NUTRIENT_DISPLAY_NAMES, roundNutrient } from "@/lib/constants";
import { useTargetsStore } from "@/lib/stores";

interface Props {
  date: Date;
}
const props = defineProps<Props>();

const dailySummary = ref<DailySummary | null>(null);
const loadingSummary = ref(true);
const shownTargetsKeys: (keyof DailyTargets)[] = ["kcal", "protein"];

const { targetsState, reloadTargets } = useTargetsStore();

function updateProgress(date: Date) {
  loadingSummary.value = true;
  dailySummary.value = null;

  getDailySummary(date)
    .then((summary) => {
      dailySummary.value = summary;
    })
    .finally(() => {
      loadingSummary.value = false;
    });
}

// update on props.date change
watchEffect(() => {
  updateProgress(props.date);
})

// const isLoading = computed(() => targetsState.isLoadingTargets || loadingSummary.value);

const targets = computed(() => {
  return shownTargetsKeys.map((key) => {
    const max = targetsState.dailyTargets?.[key];
    return {
      name: NUTRIENT_DISPLAY_NAMES[key] ?? key,
      current: roundNutrient(dailySummary.value?.[key] ?? 0),
      max: max ? roundNutrient(max) : null,
    }
  })
}
);

updateProgress(props.date);

// onMounted(() => {
//   reloadTargets();
// })
</script>

<template>
  <div class="col stretch-h middle container">
    <template v-for="target in targets" :key="target.name">
      <div class="apart">
        <span>{{ target.name }}</span>
        <span>
          {{ target.max != null
            ? `${target.current} / ${target.max}`
            : target.current }}
        </span>
      </div>
      <progress v-if="target.max != null" :value="target.current" :max="target.max"></progress>
    </template>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
  gap: 0.25rem;
}

progress {
  width: 100%;
}
</style>
