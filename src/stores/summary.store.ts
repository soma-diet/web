import { reactive, readonly } from "vue";
import { getDailySummary } from "../api";
import type { DailySummary } from "../model";

const summaryState = reactive({
  dailySummary: null as DailySummary | null,
  isLoadingSummary: true as boolean,
  selectedDate: new Date() as Date
});

function loadForDate(date: Date) {
  summaryState.selectedDate = date;
  reloadSummary();
}

function reloadSummary() {
  summaryState.isLoadingSummary = true;
  getDailySummary(summaryState.selectedDate)
    .then((summary) => {
      summaryState.dailySummary = summary;
    })
    .finally(() => {
      summaryState.isLoadingSummary = false;
    });
}

export function useSummaryStore() {
  return {
    summaryState: readonly(summaryState), loadForDate, reloadSummary
  }
}