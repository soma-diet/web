<script setup lang="ts">

import { computed, ref } from "vue";
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

getDailyTargets()
  .then((targets) => {
    dailyTargets.value = targets;
  })
  .finally(() => {
    loadingTargets.value = false;
  });

getDailySummary(props.date)
  .then((summary) => {
    dailySummary.value = summary;
  })
  .finally(() => {
    loadingSummary.value = false;
  });

const isLoading = computed(() => loadingTargets.value || loadingSummary.value);

const targets = computed(() => {
  return shownTargetsKeys.map((key) => ({
    name: NUTRIENT_NAMES[key] ?? key,
    current: dailySummary.value?.[key] ?? 0,
    max: dailyTargets.value?.[key] ?? null,
  }))
}
);
</script>

<template>
  <ListLoadingEffect v-if="isLoading" />
  <div v-else class="col stretch-h middle">
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
