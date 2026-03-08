import type { Food } from "./food.model";
import type { Serving } from "./serving.model";
import { TrackableType } from "./trackable-type.model";

export interface LogEntry {
    id: string;
    timestamp: string; // iso 8601 string (zalezi na poradi pridani pro vzhled daily logu)

    itemId: string;
    itemName: string; // cached hodnota, aby se nedelal dalsi request
    itemType: TrackableType; // na rozliseni food a receptu

    servingId: string;
    servingName: string; // cached hodnota
    servingSize: number;
    quantity: number;
}

export function createLogEntry(
    food: Food,
    serving: Serving,
    quantity: number,
): LogEntry {
    return {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString().split(".")[0],
        itemId: food.id,
        itemName: food.name,
        itemType: TrackableType.FOOD, // TODO prozatim to muze byt jen food
        servingId: serving.id,
        servingName: serving.name,
        servingSize: serving.size,
        quantity: quantity,
    };
}
