import { writable } from "svelte/store";
import type { LogEntry, Trackable } from "../model";

// TODO separate stores into individual files

// #region LogSection UI Store
export interface LogSelectionInput {
    trackable: Trackable;
    entry: LogEntry | null;
}

export const activeLogSelection = writable<LogSelectionInput | null>(null);
export function openLogForm(
    trackable: Trackable,
    entry: LogEntry | null = null,
) {
    activeLogSelection.set({ trackable, entry });
}
export function closeLogForm() {
    activeLogSelection.set(null);
}
// #endregion
