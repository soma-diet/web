import type { Serving } from "./serving.model";
import type { Trackable } from "./trackable.model";

export interface LogEntry {
    id: string;
    timestamp: string; // iso 8601 string (zalezi na poradi pridani pro vzhled daily logu)

    // itemId: string;
    // itemName: string; // cached hodnota, aby se nedelal dalsi request
    // itemType: TrackableType; // na rozliseni food a receptu
    item: Trackable,

    servingId?: string | null;
    servingName: string; // cached hodnota
    servingSize: number;
    quantity: number;

    components: LogEntry[];
}

export function createLogEntry(
    trackable: Trackable,
    serving: Serving,
    quantity: number,
): LogEntry {
    return {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString().split(".")[0],
        // itemId: trackable.id,
        // itemName: trackable.name,
        // itemType: trackable.type,
        item: trackable,
        servingId: serving.id,
        servingName: serving.name,
        servingSize: serving.size,
        quantity: quantity,
        components: [],
    };
}
