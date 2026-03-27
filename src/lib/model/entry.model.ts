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

