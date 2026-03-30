enum NUTRITION_RATIOS {
  KCAL_TO_KJ_MULT = 4.184,
}

export const MACROS_KEYS = ["kcal", "protein", "carbs", "fats"] as const;
export const MICROS_KEYS = ["fiber", "sodium"] as const;

export const NUTRITION_KEYS = [...MACROS_KEYS, ...MICROS_KEYS] as const;

// record string string uvolni typescript od toho aby vynucoval hledani pomoci keyof NUTRIENT...
export const NUTRIENT_DISPLAY_NAMES: Record<string, string> = {
  kj: "Energy (kJ)",
  kcal: "Energy (kcal)",
  protein: "Protein",
  carbs: "Carbohydrates",
  fats: "Fats",
  fiber: "Fiber",
  sodium: "Salt",
};

export const NUTRIENT_SUFFIX: Record<string, string> = {
  kj: "kJ",
  kcal: "kcal",
  protein: "g",
  carbs: "g",
  fats: "g",
  fiber: "g",
  sodium: "g",
};

// conversions
export const kcalToKJ = (kcal: number): number =>
  kcal * NUTRITION_RATIOS.KCAL_TO_KJ_MULT;
export const kJToKcal = (kJ: number): number =>
  kJ / NUTRITION_RATIOS.KCAL_TO_KJ_MULT;
export const roundNutrient = (nutrient: number) =>
  Math.round(nutrient * 10) / 10;

// util
export function recalculateFields(
  data: Record<string, number | null>,
  coefficient: number,
): Record<string, number | null> {
  const copy = { ...data };
  for (const key in copy) {
    const original = copy[key];

    copy[key] =
      original === undefined || original === null
        ? null
        : original * coefficient;
  }
  return copy;
}
