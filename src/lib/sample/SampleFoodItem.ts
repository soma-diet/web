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

export const SAMPLE_FOOD_ITEM_2: Food = {
    id: "e2109b1b-d5cd-4896-861b-ba847064bbaf",
    name: "Pribináček Tyčinka s Tvarohem – Výhodné balení",
    brand: "Pribináček",
    barcode: undefined,
    isMass: true,
    imageFilename: "e2109b1b-d5cd-4896-861b-ba847064bbaf.jpg",
    author: "SOMA",
    servings: [],
    macronutrients: {
        kcal: 349,
        protein: 10,
        fats: 25,
        carbs: 21,
    },
    micronutrients: {
        fiber: undefined,
        sodium: 0.1,
    },
};