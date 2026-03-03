import { fetchWithAuth } from "../util/api"

interface Macronutrients {
    kcal: number
    fats: number
    carbs: number
    protein: number
}

interface Micronutrients {
    fiber: number
    sodium: number
}

interface Serving {
    id: string
    name: string
    amount: number
}

export interface FoodItem {
    id: string
    name: string
    author: string
    barcode: string
    brand: string
    isMass: boolean
    imageFilename: string
    macronutrients: Macronutrients
    micronutrients: Micronutrients
    servings: Serving[]
}

export interface FoodSearchResponse {
    foodItems: FoodItem[],
    hasMore: boolean
}

export async function fetchFoodSearchResults(query: string, page = 0): Promise<FoodSearchResponse> {
    query = query.trim()

    const params = new URLSearchParams({
        name: query,
        page: page.toString(),
        size: "20" // TODO put in config
    })
    const endpoint = `/api/foods?${params.toString()}`
    console.log(endpoint)
    const response = await fetchWithAuth(endpoint)
    const raw = await response.json()

    console.log(raw)

    const foodItems = raw.content.map((rawItem: any) => {
        const macros = rawItem.macronutrients
        const micros = rawItem.micronutrients
        const servings = rawItem.servings
        return {
            id: rawItem.id,
            name: rawItem.name,
            author: rawItem.author,
            barcode: rawItem.barcode,
            brand: rawItem.brand,
            imageFilename: rawItem.imageFilename,
            isMass: Boolean(rawItem.isMass),
            macronutrients: {
                kcal: Number(macros.kcal),
                protein: Number(macros.protein),
                fats: Number(macros.fats),
                carbs: Number(macros.carbs)
            },
            micronutrients: {
                fiber: Number(micros.fiber),
                sodium: Number(micros.sodium)
            },
            servings: servings.map((serving: any) => {
                return {
                    id: serving.id,
                    name: serving.name,
                    amount: Number(serving.amount)
                }
            })
        }
    })

    // TODO paging?
    return {
        foodItems: foodItems,
        hasMore: !Boolean(raw.last)
    };
}