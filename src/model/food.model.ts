import type { Macronutrients, Micronutrients } from "./nutrients.model";
import type { Serving } from "./serving.model";
import { TrackableType, type Trackable } from "./trackable.model";

export interface Food extends Trackable {
  barcode: string | null;
  brand: string | null;
}

export function createFood(
  name: string,
  isMass: boolean,
  macronutrients: Macronutrients,
  micronutrients: Micronutrients,
  servings: Serving[],
  brand = null as string | null,
): Food {
  return {
    id: crypto.randomUUID(),
    name: name,
    author: null, // pro budouci rozsireni (nevyuzito, user si zatim nenastavuje jmeno)
    barcode: null, // pro budouci rozsireni (neimplementovano)
    brand: brand,
    isMass: isMass,
    imageFilename: null,
    macronutrients: macronutrients,
    micronutrients: micronutrients,
    servings: servings,
    type: TrackableType.FOOD,
    isPrivate: true,
  };
}
