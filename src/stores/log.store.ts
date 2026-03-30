import { getLogEntries } from "@/api";
import { computed, reactive } from "vue";
import type { LogEntry, Trackable } from "../model";

export interface LogSelectionInput {
  trackable: Trackable;
  entry: LogEntry | null;
}

const logSelectionState = reactive({
  activeLogSelection: null as LogSelectionInput | null,
  logDate: new Date() as Date,
});

const logState = reactive({
  isLoadingEntries: false as boolean,
  entries: [] as LogEntry[],
});

async function loadEntries(date: Date) {
  logState.isLoadingEntries = true;
  try {
    const entries = await getLogEntries(date);
    logState.entries = entries;
  } finally {
    logState.isLoadingEntries = false;
  }
}

function openLogForm(trackable: Trackable, entry: LogEntry | null = null) {
  logSelectionState.activeLogSelection = { trackable, entry };
}

function closeLogForm() {
  logSelectionState.activeLogSelection = null;
}

export function useLogStore() {
  return {
    logSelectionState,
    openLogForm,
    closeLogForm,
    logState,
    loadEntries,
  };
}
