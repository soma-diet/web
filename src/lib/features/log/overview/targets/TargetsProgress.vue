<script setup lang="ts">
import { NUTRIENT_DISPLAY_NAMES, roundNutrient } from "@/lib/constants";
import { useTargetsStore } from "@/lib/stores";
import { useSummaryStore } from "@/lib/stores/summary.store";
import { computed, onMounted, watchEffect } from "vue";
import type { DailyTargets } from "../../../../model";

interface Props {
  date: Date;
}
const props = defineProps<Props>();

const shownTargetsKeys: (keyof DailyTargets)[] = [
  "kcal",
  "protein",
  "fats",
  "carbs",
]; // optionally enabled targets (prepared for the future)

const { targetsState } = useTargetsStore();
const { summaryState, loadForDate } = useSummaryStore();

const targets = computed(() => {
  return shownTargetsKeys.map((key) => {
    const max = targetsState.dailyTargets?.[key];
    const current = summaryState.dailySummary?.[key] ?? 0;
    return {
      name: NUTRIENT_DISPLAY_NAMES[key] ?? key,
      current: roundNutrient(current),
      max: max ? roundNutrient(max) : null,
      percentage: max ? (current / max) * 100 : 0,
    };
  });
});

watchEffect(() => {
  loadForDate(props.date);
});

onMounted(() => {
  loadForDate(props.date);
});
</script>

<template>
  <div class="col stretch-h middle container">
    <template v-for="target in targets" :key="target.name">
      <div class="target apart center">
        <span>{{ target.name }}</span>
        <span>
          {{
            target.max != null
              ? `${target.current} / ${target.max}`
              : target.current
          }}
        </span>
      </div>
      <div class="progress-container">
        <div
          class="progress-bar"
          :style="{ width: target.percentage + '%' }"
        ></div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.container {
  margin: 1rem;
  padding: 1rem;
  gap: 0.5rem;
  background-color: var(--bg-surface);
  border-radius: 0.5em;

  .target {
    span:first-child {
      font-size: 100%;
    }
    span:last-child {
      font-size: 90%;
      color: var(--text-dim);
    }
  }

  .progress-container {
    height: 0.4rem;
    border-radius: 9999px;
    width: 100%;
    background-color: var(--border-main);
    overflow: hidden;

    .progress-bar {
      height: 100%;
      background-color: var(--color-accent);
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
}

@media (min-width: 1920px) {
  .container {
    gap: 1rem;
    .target {
      span:first-child {
        font-size: 150%;
      }
      span:last-child {
        font-size: 130%;
      }
    }
    .progress-container {
      height: 0.7rem;
    }
  }
}
</style>
