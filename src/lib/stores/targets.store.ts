import { reactive } from "vue";
import type { DailyTargets } from "../model";
import { getDailyTargets } from "../api";

export const targetsStore = reactive({
  dailyTargets: null as DailyTargets | null,
  isLoadingTargets: true as boolean,
});

function reloadTargets() {
  targetsStore.isLoadingTargets = true;
  getDailyTargets()
    .then((response: DailyTargets) => {
      targetsStore.dailyTargets = response;
    })
    .finally(() => {
      targetsStore.isLoadingTargets = false;
      console.log("finished reloading", targetsStore.dailyTargets);
    });
}

// nacist data hned (potreba nacitat pouze jenom jednou?)
reloadTargets();
