import { useLogStore, useSummaryStore } from "@/stores";
import { useGraphsStore } from "@/stores/graph.store";
import { useAlerts } from "./alert.composable";

const { scheduleAlert } = useAlerts();

const { logSelectionState, loadEntries } = useLogStore();
const { loadSummary } = useSummaryStore();
const { loadWeeklyGraphs } = useGraphsStore();

async function reloadData(newDate: Date) {
  logSelectionState.logDate = newDate;

  try {
    // fetch all data to stores at once
    await Promise.all([
      loadEntries(newDate),
      loadSummary(newDate),
      loadWeeklyGraphs(newDate),
    ]);
  } catch (err) {
    scheduleAlert(
      "Failed to reach the server. Please try refreshing the page.",
    );
  }
}

export function useData() {
  return { reloadData };
}
