import type { FoodItem } from "../api/interface";

export const SAMPLE_FOOD_ITEM: FoodItem = {
    id: "SAMPLE_FOOD_ITEM",
    name: "test",
    brand: "brand test",
    barcode: "0101110101101010",
    imageFilename: null,
    author: "SOMA",
    servings: [{
        id: "xjaklsjdlajiw",
        name: "g",
        amount: 1239,
    }],
    macronutrients: {
        kcal: 193,
        protein: 193,
        fats: 193,
        carbs: 193,
    },
    micronutrients: {
        fiber: 193,
        sodium: 193,
    },
};