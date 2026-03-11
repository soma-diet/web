import type { NutrientKey } from "../constants/nutrition.const";

export type DailySummary = Record<NutrientKey, number>;
export type DailyTargets = Partial<Record<NutrientKey, number | null>>;
