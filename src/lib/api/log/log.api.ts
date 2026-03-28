import { makeDateString } from "@/lib/utils/date.util";
import type { DailySummary, LogEntry } from "../../model";
import { SomaError } from "../../utils/errors";
import { fetchWithAuth } from "../client";
import { rawToDailySumamry as rawToDailySummary, rawToLogEntry } from "./log.mapper";
import type { LogEntryRequestDto } from "./log.dto";

const DIARY_LOG_ENDPOINT = "/api/diary";

// #region Main CRUD
export async function getLogEntries(date: Date): Promise<LogEntry[]> {
  const params = new URLSearchParams({
    date: makeDateString(date),
  });
  const endpoint = DIARY_LOG_ENDPOINT + "?" + params.toString();
  const response = await fetchWithAuth(endpoint);
  const raw = await response.json();
  const entries = raw.map((rawEntry: any) => rawToLogEntry(rawEntry)) ?? [];
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

const DAILY_SUMMARY_ENDPOINT = "/api/diary/summary";
export async function getDailySummary(date: Date): Promise<DailySummary> {
  const params = new URLSearchParams({
    date: makeDateString(date),
  });
  const endpoint = DAILY_SUMMARY_ENDPOINT + "?" + params.toString();
  const response = await fetchWithAuth(endpoint);
  const raw = await response.json();
  return rawToDailySummary(raw);
}
