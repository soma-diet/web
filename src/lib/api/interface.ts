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