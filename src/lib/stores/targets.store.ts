import { reactive } from "vue";
import { getDailyTargets } from "../api";
import type { DailyTargets } from "../model";

const targetsState = reactive({
  dailyTargets: null as DailyTargets | null,
  isLoadingTargets: true as boolean,
});

function reloadTargets() {
  targetsState.isLoadingTargets = true;
  getDailyTargets()
    .then((response: DailyTargets) => {
      targetsState.dailyTargets = response;
    })
    .finally(() => {
      targetsState.isLoadingTargets = false;
    });
}

export function useTargetsStore() {
  return { targetsState, reloadTargets };
}
