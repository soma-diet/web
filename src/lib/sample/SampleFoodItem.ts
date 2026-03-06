import type { Food } from "../model";

export const SAMPLE_FOOD_ITEM: Food = {
    id: "SAMPLE_FOOD_ITEM",
    name: "Sample Food Item",
    brand: "Sample Brand",
    barcode: "0101110101101010",
    isMass: true,
    imageFilename: undefined,
    author: "SOMA",
    servings: [{
        id: "xjaklsjdlajiw",
        name: "g",
        amount: 1239,
    }],
    macronutrients: {
        kcal: 193,
        protein: 140,
        fats: 123,
        carbs: 3,
    },
    micronutrients: {
        fiber: 2,
        sodium: 5.3,
    },
};