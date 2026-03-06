import type { Macronutrients, Micronutrients } from "./Nutrients"
import type { Serving } from "./Serving"

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