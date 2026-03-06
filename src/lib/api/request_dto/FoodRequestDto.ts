import type { Macronutrients, Micronutrients, Serving } from "../../model";

// TODO asi zbytecne? myslim ze muze byt skoro stejny jak response entita
export interface FoodRequestDto {
    id: string,
    name: string,
    barcode?: string,
    brand?: string,
    isMass: boolean,
    macronutrients: Macronutrients,
    micronutrients: Micronutrients,
    servings: Serving[]
}