import type { Serving, Trackable } from "../model";

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

export function getWithSystemServings(trackable: Trackable): Serving[] {
    // const systemServings = trackable.isMass
    //     ? SYSTEM_MASS_SERVINGS
    //     : SYSTEM_LIQUID_SERVINGS;
    const systemServings = SYSTEM_MASS_SERVINGS; // TODO trackuje se asi vzdy v gramech takze serving v ml je zavadejici asi
    return [...systemServings, ...trackable.servings];
}
