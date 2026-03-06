import type { Food } from "../../model";

export interface FoodSearchResponse {
    foodItems: Food[],
    hasMore: boolean
}