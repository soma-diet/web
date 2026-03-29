import type { Serving, Trackable } from "../model";

const SYSTEM_MASS_SERVINGS: Serving[] = [
  {
    id: null,
    name: "g",
    size: 1,
    isSystem: true,
  },
];

export function getWithSystemServings(trackable: Trackable): Serving[] {
  const systemServings = SYSTEM_MASS_SERVINGS;
  return [...systemServings, ...trackable.servings];
}
