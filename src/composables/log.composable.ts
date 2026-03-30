import {
  deleteLogEntry,
  LogEntryRequestDto,
  postLogEntry,
  putLogEntry,
} from "@/api";
import type { LogEntry } from "@/model";
import { useLogStore } from "@/stores";
import { useAlerts } from "./alert.composable";
import { useData } from "./data.composable";

const { scheduleAlert } = useAlerts();
const { reloadData } = useData();
const { logSelectionState, logState } = useLogStore();

function updateData() {
  reloadData(logSelectionState.logDate);
}

// posunuti datumu o 1
function moveDate(backwards: boolean) {
  const increment = backwards ? -1 : 1;
  const changedDate = new Date(logSelectionState.logDate);
  changedDate.setDate(changedDate.getDate() + increment);
  logSelectionState.logDate = changedDate;

  reloadData(changedDate);
}

async function createLogEntry(
  trackableId: string,
  quantity: number,
  servingId: string | null,
  date: Date,
) {
  const newEntryRequest = LogEntryRequestDto.createRequest(
    trackableId,
    servingId,
    quantity,
    date,
  );

  try {
    await postLogEntry(newEntryRequest);
  } catch (_) {
    scheduleAlert("Adding a new log entry failed. Please try again.");
  } finally {
    updateData();
  }
}

async function updateLogEntry(
  entry: LogEntry,
  quantity: number,
  servingId: string | null,
  date: Date,
) {
  const newEntryRequest: LogEntryRequestDto = LogEntryRequestDto.updateRequest(
    entry,
    servingId,
    quantity,
    date,
  );

  try {
    await putLogEntry(newEntryRequest);
  } catch (_) {
    scheduleAlert("Updating a log entry failed. Please try again.");
  } finally {
    updateData();
  }
}

async function deleteEntry(entry: LogEntry) {
  logState.entries = logState.entries.filter((_entry) => _entry.id !== entry.id);
  try {
    await deleteLogEntry(entry);
  } catch (e: any) {
    scheduleAlert("Failed to delete your log entry. Please try again.");
  } finally {
    updateData();
  }
}

export function useLog() {
  return {
    moveDate,
    deleteEntry,
    createLogEntry,
    updateLogEntry,
  };
}
