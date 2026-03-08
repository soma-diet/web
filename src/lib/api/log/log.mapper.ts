import type { LogEntry } from "../../model";
import type { LogEntryRequestDto } from "./log.dto";

export function entryToRequestDto(entry: LogEntry): LogEntryRequestDto {
    return {
        id: entry.id,
        itemId: entry.itemId,
        quantity: entry.quantity,
        timestamp: entry.timestamp,
        servingId: entry.servingId,
        parentEntryId: null, // TODO pridat parent entry, zatim neni ani v LogEntry
    };
}
