import { reactive, readonly } from "vue";
import { getDailySummary } from "../api";
import type { DailySummary } from "../model";

const summaryState = reactive({
  dailySummary: null as DailySummary | null,
  isLoadingSummary: true as boolean,
});

async function loadSummary(date: Date) {
  summaryState.isLoadingSummary = true;
  try {
    const summary = await getDailySummary(date);
    summaryState.dailySummary = summary;
  } finally {
    summaryState.isLoadingSummary = false;
  }
}

export function useSummaryStore() {
  return {
    summaryState: readonly(summaryState),
    loadSummary,
  };
}
