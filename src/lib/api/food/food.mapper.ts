import {
  TrackableType,
  type Food,
  type Macronutrients,
  type Micronutrients,
  type Serving,
} from "../../model";
import type { FoodRequestDto } from "./food.dto";

function rawToMacronutrients(rawMacros: any): Macronutrients {
  return {
    kcal: Number(rawMacros.kcal),
    protein: Number(rawMacros.protein),
    fats: Number(rawMacros.fats),
    carbs: Number(rawMacros.carbs),
  };
}

function rawToMicronutrients(rawMicros: any): Micronutrients {
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

function rawToServing(rawServing: any): Serving {
  return {
    id: rawServing.id,
    name: rawServing.name,
    size: Number(rawServing.size),
    isSystem: false,
  };
}

export function rawItemToFood(rawItem: any): Food {
  const servings = rawItem.servings ?? [];

  return {
    id: rawItem.id,
    name: rawItem.name,
    author: rawItem.author ?? "GENERIC",
    barcode: rawItem.barcode,
    brand: rawItem.brand,
    imageFilename: rawItem.imageFilename,
    isMass: Boolean(rawItem.isMass),
    macronutrients: rawToMacronutrients(rawItem.macronutrients),
    micronutrients: rawToMicronutrients(rawItem.micronutrients),
    servings: servings.map((serving: any) => rawToServing(serving)),
    type: TrackableType.FOOD,
  };
}

export function foodToDto(food: Food): FoodRequestDto {
  return {
    id: food.id,
    name: food.name,
    brand: food.brand,
    barcode: food.barcode,
    isMass: food.isMass,
    macronutrients: food.macronutrients,
    micronutrients: food.micronutrients,
    servings: food.servings,
  };
}
