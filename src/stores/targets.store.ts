// udrzuje globalne nactene targets
import { reactive } from "vue";
import { getDailyTargets } from "../api";
import type { DailyTargets } from "../model";

const targetsState = reactive({
  dailyTargets: null as DailyTargets | null,
  isLoadingTargets: true as boolean,
});

async function reloadTargets() {
  targetsState.isLoadingTargets = true;
  try {
    const targets = await getDailyTargets();
    targetsState.dailyTargets = targets;
  } catch (err) {
    targetsState.dailyTargets = null;
  } finally {
    targetsState.isLoadingTargets = false;
  }
}

export function useTargetsStore() {
  return { targetsState, reloadTargets };
}
