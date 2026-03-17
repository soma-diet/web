import type { DailySummary, LogEntry } from "../../model";
import { SomaError } from "../../utils/errors";
import { fetchWithAuth } from "../client";
import type { LogEntryRequestDto } from "./log.dto";
import {
  entryToRequestDto,
  rawToDailySumamry,
  rawToLogEntry,
} from "./log.mapper";

const DIARY_LOG_ENDPOINT = "/api/diary";

// TODO do jiny file (asi api.util.ts) (nebo udelat RequestDto a na to mapovat v mapperu)
function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// #region Main CRUD
export async function getLogEntries(date: Date): Promise<LogEntry[]> {
  const params = new URLSearchParams({
    date: toLocalDateString(date),
  });
  const endpoint = DIARY_LOG_ENDPOINT + "?" + params.toString();
  const response = await fetchWithAuth(endpoint);
  const raw = await response.json();
  console.log("raw log entries", raw);
  const entries = raw.map((rawEntry: any) => rawToLogEntry(rawEntry)) ?? [];
  console.log("mapepd entries", entries);
  return entries;
}

export async function postLogEntry(
  requestDto: LogEntryRequestDto,
): Promise<boolean> {
  try {
    const response = await fetchWithAuth(DIARY_LOG_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(requestDto),
    });
    return response.ok;
  } catch (err: unknown) {
    if (err instanceof SomaError) {
    }
    return false;
  }
}

export async function putLogEntry(
  requestDto: LogEntryRequestDto,
): Promise<boolean> {
  const endpoint = DIARY_LOG_ENDPOINT + "/" + requestDto.id;

  const response = await fetchWithAuth(endpoint, {
    method: "PUT",
    body: JSON.stringify(requestDto),
  });
  return response.ok;
}
// #endregion

export async function deleteLogEntry(entry: LogEntry): Promise<boolean> {
  const endpoint = DIARY_LOG_ENDPOINT + "/" + entry.id;
  const response = await fetchWithAuth(endpoint, {
    method: "DELETE",
  });
  return response.ok;
}

// #region Utils
const DAILY_SUMMARY_ENDPOINT = "/api/diary/summary";
export async function getDailySummary(date: Date): Promise<DailySummary> {
  const params = new URLSearchParams({
    date: toLocalDateString(date),
  });
  const endpoint = DAILY_SUMMARY_ENDPOINT + "?" + params.toString();
  const response = await fetchWithAuth(endpoint);
  const raw = await response.json();
  return rawToDailySumamry(raw);
}
// #endregion
