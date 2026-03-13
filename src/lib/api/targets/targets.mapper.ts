import type { DailyTargets } from "../../model";

export function rawToTargets(raw: any): DailyTargets {
    return {
        kcal: raw.kcal,
        protein: raw.protein,
        carbs: raw.carbs,
        fats: raw.fats,
        fiber: raw.fiber,
        sodium: raw.sodium,
    };
}
