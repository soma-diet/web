<script setup lang="ts">

import { targetsStore } from "@/lib/stores";
import { computed, ref, watchEffect } from "vue";
import { getDailySummary } from "../../../../api";
import { NUTRIENT_NAMES } from "../../../../constants/ui.const";
import type { DailySummary, DailyTargets } from "../../../../model";

interface Props {
  date: Date;
}
const props = defineProps<Props>();

const shownTargetsKeys: (keyof DailyTargets)[] = ["kcal", "protein"];

const dailySummary = ref<DailySummary | null>(null);
const loadingSummary = ref(true);

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

const isLoading = computed(() => targetsStore.isLoadingTargets || loadingSummary.value);

const targets = computed(() => {
  return shownTargetsKeys.map((key) => ({
    name: NUTRIENT_NAMES[key] ?? key,
    current: dailySummary.value?.[key] ?? 0,
    max: targetsStore.dailyTargets?.[key] ?? null,
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
