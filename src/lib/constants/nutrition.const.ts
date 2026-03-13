export enum NUTRITION_RATIOS {
    KCAL_TO_KJ_MULT = 4.184,
}

export const NUTRITION_KEYS = [
    "kcal",
    "protein",
    "carbs",
    "fats",
    "fiber",
    "sodium",
] as const; // read only

export type NutrientKey = (typeof NUTRITION_KEYS)[number];
