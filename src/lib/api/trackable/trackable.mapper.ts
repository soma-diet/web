import {
  TrackableType,
  type Macronutrients,
  type Micronutrients,
  type Trackable,
} from "../../model";

export function rawToMacronutrients(rawMacros: any): Macronutrients {
  return {
    kcal: Number(rawMacros.kcal),
    protein: Number(rawMacros.protein),
    fats: Number(rawMacros.fats),
    carbs: Number(rawMacros.carbs),
  };
}

export function rawToMicronutrients(rawMicros: any): Micronutrients {
  if (!rawMicros) {
    return {
      fiber: null,
      sodium: null,
    };
  }
  return {
    fiber: rawMicros.fiber ? Number(rawMicros.fiber) : null,
    sodium: rawMicros.sodium ? Number(rawMicros.sodium) : null,
  };
}

export function rawToTrackable(raw: any): Trackable {
  return {
    id: raw.id,
    name: raw.name,
    imageFilename: raw.imageFilename,
    isMass: raw.isMass,
    servings: raw.servings,
    author: raw.author,
    type: raw.type === "FOOD" ? TrackableType.FOOD : TrackableType.RECIPE,
    macronutrients: rawToMacronutrients(raw.macronutrients),
    micronutrients: rawToMicronutrients(raw.micronutrients),
  };
}
