import type { TrackableType } from "./trackable-type.model";

export interface LogEntry {
    id: string,
    timestamp: string, // iso 8601 string (zalezi na poradi pridani pro vzhled daily logu)

    itemId: string,
    itemName: string, // cached hodnota, aby se nedelal dalsi request
    itemType: TrackableType, // na rozliseni food a receptu

    servingId: string,
    servingName: string, // cached hodnota
    servingSize: number,
    quantity: number,
}