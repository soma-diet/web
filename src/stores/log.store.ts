import { reactive } from "vue";
import type { LogEntry, Trackable } from "../model";

export interface LogSelectionInput {
  trackable: Trackable;
  entry: LogEntry | null;
}

const logSelectionState = reactive({
  activeLogSelection: null as LogSelectionInput | null,
});

function openLogForm(trackable: Trackable, entry: LogEntry | null = null) {
  logSelectionState.activeLogSelection = { trackable, entry };
}

function closeLogForm() {
  logSelectionState.activeLogSelection = null;
}

export function useLogSelectionStore() {
  return {
    logSelectionState,
    openLogForm,
    closeLogForm,
  };
}
