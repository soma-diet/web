import type { LogEntry } from "../model";
import { TrackableType } from "../model/TrackableType";

export const SAMPLE_LOG_ENTRY: LogEntry = {
    id: "SAMPLE_LOG_ENTRY",
    timestamp: "2026-03-06T22:50:05",

    itemId: "SAMPLE_FOOD_ITEM",
    itemName: "Sample Food Item", // cached hodnota, aby se nedelal dalsi request
    itemType: TrackableType.FOOD, // "FOOD" / "RECIPE",

    servingId: "SAMPLE_SERVING",
    servingName: "g",
    quantity: 140,
}