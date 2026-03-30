import {
  useWeeklySummary,
  type WeeklyNutrients,
} from "@/composables/weekly.composable";
import { computed, reactive, readonly } from "vue";

const GRAPH_ORDER = ["kcal", "protein", "carbs", "fats", "fiber", "sodium"];

const { getWeekData, extractNutrientsFromWeek } = useWeeklySummary();

const analysisSelectionState = reactive({
  targetsFormOpen: false,
});

const openTargetsForm = () => (analysisSelectionState.targetsFormOpen = true);
const closeTargetsForm = () => (analysisSelectionState.targetsFormOpen = false);

const graphsState = reactive({
  graphs: new Map() as Map<string, WeeklyNutrients>,
  isLoadingGraphs: false as boolean,
  isFetchError: false as boolean,
});

const isReloadingGraphs = computed(() => {
  return graphsState.isLoadingGraphs && graphsState.graphs.size !== 0;
});

async function loadWeeklyGraphs(since: Date) {
  graphsState.isLoadingGraphs = true;
  graphsState.isFetchError = false;

  try {
    const data = await getWeekData(since);
    graphsState.graphs.clear();

    for (const key of GRAPH_ORDER) {
      const expanded = extractNutrientsFromWeek(key, data);
      graphsState.graphs.set(key, expanded);
    }
  } catch (err) {
    graphsState.isFetchError = true;
    throw err; // pass up to parent loader
  } finally {
    graphsState.isLoadingGraphs = false;
  }
}

export function useGraphsStore() {
  return {
    graphsState,
    loadWeeklyGraphs,
    isReloadingGraphs,
    analysisSelectionState: readonly(analysisSelectionState),
    openTargetsForm,
    closeTargetsForm,
  };
}
