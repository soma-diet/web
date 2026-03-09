import type { LogEntry } from "../../model";
import { SomaError } from "../../utils/errors";
import { fetchWithAuth } from "../client";
import type { LogEntryRequestDto } from "./log.dto";
import { entryToRequestDto } from "./log.mapper";

const DIARY_LOG_ENDPOINT = "/api/diary";

export async function getLogEntries(): Promise<LogEntry[]> {
    const response = await fetchWithAuth(DIARY_LOG_ENDPOINT);
    const raw = await response.json();
    console.log(raw);
    // TOOD unfinished
    return [];
}

export async function postLogEntry(entry: LogEntry): Promise<boolean> {
    const requestDto: LogEntryRequestDto = entryToRequestDto(entry);
    console.log(requestDto);
    console.log(JSON.stringify(requestDto));

    try {
        const response = await fetchWithAuth(DIARY_LOG_ENDPOINT, {
            method: "POST",
            body: JSON.stringify(requestDto),
        });
        console.log("received response", response);
        return response.ok;
    } catch (err: unknown) {
        if (err instanceof SomaError) {
        }
        return false;
    }
}
