import type { LogEntryRequestDto } from "./log.dto";

import { rawToTrackable } from "../trackable/trackable.mapper";
import type { LogEntry, DailySummary } from "@/model";

export function entryToRequestDto(entry: LogEntry): LogEntryRequestDto {
  return {
    id: entry.id,
    itemId: entry.item.id,
    quantity: entry.quantity,
    timestamp: entry.timestamp,
    servingId: entry.servingId,
    parentEntryId: null, // rozsireni do budoucna, zatim ani neresime z backendu
  };
}

export function rawToLogEntry(raw: any): LogEntry {
  return {
    id: raw.id,
    timestamp: raw.timestamp,

    item: rawToTrackable(raw.item),

    servingId: raw.servingId,
    servingName: raw.servingName,
    servingSize: raw.servingSize,
    quantity: raw.quantity,

    components: raw.components,
  };
}

export function rawToDailySumamry(raw: any): DailySummary {
  const macros = raw.totalMacronutrients;
  const micros = raw.totalMicronutrients;
  return {
    kcal: macros.kcal,
    fats: macros.fats,
    carbs: macros.carbs,
    protein: macros.protein,
    fiber: micros.fiber,
    sodium: micros.sodium,
  };
}
