import type { LogEntryRequestDto } from "../api";
import type { Trackable } from "./trackable.model";

export interface LogEntry {
  id: string;
  timestamp: string; // iso 8601 string (zalezi na poradi pridani pro vzhled daily logu)
  item: Trackable;
  servingId: string | null;
  servingName: string; // cached hodnota
  servingSize: number; // cached hodnota
  quantity: number;
  components: LogEntry[];
}

export function createLogEntryRequest(
  itemId: string,
  servingId: string | null,
  quantity: number,
): LogEntryRequestDto {
  const todayDateString = new Date().toISOString();
  const timestamp = todayDateString.split(".")[0]!;
  return {
    id: crypto.randomUUID(),
    timestamp: timestamp,
    itemId: itemId,
    servingId: servingId,
    quantity: quantity,
    parentEntryId: null, // rozsireni pro recepty (zatim null)
  };
}

export function createLogEntryRequuestWithExisting(
  entry: LogEntry,
  servingId: string | null,
  quantity: number,
): LogEntryRequestDto {
  return {
    id: entry.id,
    timestamp: entry.timestamp,
    itemId: entry.item.id,
    servingId: servingId,
    quantity: quantity,
    parentEntryId: null,
  };
}
