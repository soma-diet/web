import type { Macronutrients, Micronutrients } from "./nutrients.model";
import type { Serving } from "./serving.model";
import { TrackableType, type Trackable } from "./trackable.model";

export interface Food extends Trackable {
    barcode?: string | null;
    brand?: string | null;
    macronutrients: Macronutrients;
    micronutrients: Micronutrients;
}

export function createFood(
    name: string,
    isMass: boolean,
    macronutrients: Macronutrients,
    micronutrients: Micronutrients,
    servings: Serving[],
    brand?: string | null,
    imageFilename?: string | null,
): Food {
    return {
        id: crypto.randomUUID(),
        name: name,
        author: null, // TODO zatim user nema zadne jmeno, takze asi neresim?
        barcode: null, // TODO scanovani barcodes
        brand: brand,
        isMass: isMass,
        imageFilename: imageFilename,
        macronutrients: macronutrients,
        micronutrients: micronutrients,
        servings: servings,
        type: TrackableType.FOOD,
    };
}
