import type { Serving } from "./serving.model";
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

export function createLogEntry(
  trackable: Trackable,
  serving: Serving,
  quantity: number,
): LogEntry {
  const todayDateString = new Date().toISOString();
  const timestamp = todayDateString.split(".")[0]!;
  return {
    id: crypto.randomUUID(),
    timestamp: timestamp,
    item: trackable,
    servingId: serving.id,
    servingName: serving.name,
    servingSize: serving.size,
    quantity: quantity,
    components: [],
  };
}
