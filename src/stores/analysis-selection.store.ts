import { reactive, readonly } from "vue";

const analysisSelectionState = reactive({
  targetsFormOpen: false
});

const openTargetsForm = () => analysisSelectionState.targetsFormOpen = true;
const closeTargetsForm = () => analysisSelectionState.targetsFormOpen = false;

export function useAnalysisSelectionStore() {
  return {
    analysisSelectionState: readonly(analysisSelectionState), openTargetsForm, closeTargetsForm
  }
}