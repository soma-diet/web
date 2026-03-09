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

export function rawToLogEntry(rawEntry: any): LogEntry {
    return {
        id: rawEntry.id,
        timestamp: rawEntry.timestamp,
        itemId: rawEntry.itemId,
        servingId: rawEntry.servingId,

        itemName: rawEntry.itemName,
        itemType: rawEntry.itemType,

        servingName: rawEntry.servingName,
        servingSize: rawEntry.servingSize,
        quantity: rawEntry.quantity,

        components: rawEntry.components,
    };
}
