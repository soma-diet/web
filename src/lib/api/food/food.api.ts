import { fetchAsAnonymous } from "../client"
import type { FoodSearchResponse } from "./food.dto"
import { rawItemToFood } from "./food.mapper"

const FOOD_ENDPOINT = "/api/foods"

export async function fetchFoodSearchResults(query: string, page = 0): Promise<FoodSearchResponse> {
    query = query.trim()

    const params = new URLSearchParams({
        name: query,
        page: page.toString(),
        size: "20" // TODO put in config
    })
    const endpoint = `${FOOD_ENDPOINT}?${params.toString()}`
    console.log(endpoint)
    const response = await fetchAsAnonymous(endpoint)
    const raw = await response.json()

    console.log(raw)

    const foodItems = raw.content.map((rawItem: any) => rawItemToFood(rawItem));

    return {
        foodItems: foodItems,
        hasMore: !Boolean(raw.last)
    };
}