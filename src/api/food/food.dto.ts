import type { Food } from "../../../model";
import type { Macronutrients, Micronutrients, Serving } from "../../../model";

export interface FoodSearchResponse {
  foodItems: Food[];
  hasMore: boolean;
}

export interface FoodRequestDto {
  id: string;
  name: string;
  barcode: string | null;
  brand: string | null;
  isMass: boolean;
  macronutrients: Macronutrients;
  micronutrients: Micronutrients;
  servings: Serving[];
}
