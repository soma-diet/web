import { makeDateString } from "@/utils/date.util";
import { fetchWithAuth } from "../client";
import {
  rawToDailySumamry as rawToDailySummary,
  rawToLogEntry,
} from "./log.mapper";
import type { LogEntryRequestDto } from "./log.dto";
import type { LogEntry, DailySummary } from "@/model";

const DIARY_LOG_ENDPOINT = "/api/diary";

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

export async function postLogEntry(requestDto: LogEntryRequestDto) {
  await fetchWithAuth(DIARY_LOG_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(requestDto),
  });
}

export async function putLogEntry(requestDto: LogEntryRequestDto) {
  const endpoint = DIARY_LOG_ENDPOINT + "/" + requestDto.id;

  await fetchWithAuth(endpoint, {
    method: "PUT",
    body: JSON.stringify(requestDto),
  });
}

export async function deleteLogEntry(entry: LogEntry) {
  const endpoint = DIARY_LOG_ENDPOINT + "/" + entry.id;
  await fetchWithAuth(endpoint, {
    method: "DELETE",
  });
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
