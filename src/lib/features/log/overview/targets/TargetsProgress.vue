<script setup lang="ts">

import { computed, ref, watch, watchEffect } from "vue";
import { getDailySummary, getDailyTargets } from "../../../../api";
import { NUTRIENT_NAMES } from "../../../../constants/ui.const";
import type { DailySummary, DailyTargets } from "../../../../model";

interface Props {
  date: Date;
}
const props = defineProps<Props>();

const shownTargetsKeys: (keyof DailyTargets)[] = ["kcal", "protein"];

const dailyTargets = ref<DailyTargets | null>(null);
const dailySummary = ref<DailySummary | null>(null);

const loadingTargets = ref(true);
const loadingSummary = ref(true);

function updateProgress(date: Date) {
  loadingTargets.value = true;
  loadingSummary.value = true;
  dailyTargets.value = null;
  dailySummary.value = null;

  getDailyTargets()
    .then((targets) => {
      dailyTargets.value = targets;
    })
    .finally(() => {
      loadingTargets.value = false;
    });

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

const isLoading = computed(() => loadingTargets.value || loadingSummary.value);

const targets = computed(() => {
  return shownTargetsKeys.map((key) => ({
    name: NUTRIENT_NAMES[key] ?? key,
    current: dailySummary.value?.[key] ?? 0,
    max: dailyTargets.value?.[key] ?? null,
  }))
}
);

updateProgress(props.date);
</script>

<template>
  <ListLoadingEffect v-if="isLoading" />
  <div v-else id="container" class="col stretch-h middle">
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
#container {
  padding: 1rem;
  gap: 0.25rem;
}

progress {
  width: 100%;
}
</style>
