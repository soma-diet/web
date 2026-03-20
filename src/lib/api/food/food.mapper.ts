import { TrackableType, type Food, type Serving } from "../../model";
import {
  rawToMacronutrients,
  rawToMicronutrients,
} from "../trackable/trackable.mapper";
import type { FoodRequestDto } from "./food.dto";

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
    isPrivate: rawItem.isPrivate,
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
