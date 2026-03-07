import type { Macronutrients, Micronutrients } from "./nutrients.model"
import type { Serving } from "./serving.model"

export interface Food {
    id: string
    name: string
    author?: string
    barcode?: string
    brand?: string
    isMass: boolean
    imageFilename?: string
    macronutrients: Macronutrients
    micronutrients: Micronutrients
    servings: Serving[]
}