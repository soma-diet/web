import type { LogEntry, Trackable } from "../model";
import { defineStore } from "pinia";
import { ref } from "vue";

// TODO separate stores into individual files

// #region LogSection UI Store
export interface LogSelectionInput {
    trackable: Trackable;
    entry: LogEntry | null;
}

export const useLogSelectionStore = defineStore("logSelection", () => {
    const activeLogSelection = ref<LogSelectionInput | null>(null);
    function openLogForm(trackable: Trackable, entry: LogEntry | null = null) {
        activeLogSelection.value = { trackable, entry };
    }

    function closeLogForm() {
        activeLogSelection.value = null;
    }

    return {
        activeLogSelection,
        openLogForm,
        closeLogForm,
    };
});
// #endregion
