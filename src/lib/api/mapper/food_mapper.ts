import type { Food, Macronutrients, Micronutrients, Serving } from "../../model"

function rawToMacronutrients(rawMacros: any): Macronutrients {
    return {
        kcal: Number(rawMacros.kcal),
        protein: Number(rawMacros.protein),
        fats: Number(rawMacros.fats),
        carbs: Number(rawMacros.carbs)
    };
}

function rawToMicronutrients(rawMicros: any): Micronutrients {
    return {
        fiber: Number(rawMicros.fiber),
        sodium: Number(rawMicros.sodium)
    }
}

function rawToServing(rawServing: any): Serving {
    return {
        id: rawServing.id,
        name: rawServing.name,
        amount: Number(rawServing.amount)
    }
}

export function rawItemToFood(rawItem: any): Food {
    const servings = rawItem.servings

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
        servings: servings.map((serving: any) => rawToServing(serving))
    }
}