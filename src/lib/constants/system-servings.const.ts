import type { Food, Serving } from "../model";

const SYSTEM_MASS_SERVINGS: Serving[] = [
    {
        name: "g",
        size: 1,
        isSystem: true,
    },
];
const SYSTEM_LIQUID_SERVINGS: Serving[] = [
    {
        name: "ml",
        size: 1,
        isSystem: true,
    },
];

export function getWithSystemServings(food: Food): Serving[] {
    const systemServings = food.isMass
        ? SYSTEM_MASS_SERVINGS
        : SYSTEM_LIQUID_SERVINGS;
    return [...systemServings, ...food.servings];
}
