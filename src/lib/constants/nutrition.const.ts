export enum NutritionRatios {
    KCAL_TO_KJ_MULT = 4.184,
}

export const NutritionKeys = [
    "kcal",
    "protein",
    "carbs",
    "fats",
    "fiber",
    "sodium",
] as const; // read only

export type NutrientKey = (typeof NutritionKeys)[number];
