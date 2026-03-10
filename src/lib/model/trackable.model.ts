import type { Serving } from "./serving.model";

export interface Trackable {
    id: string;
    name: string;
    author?: string | null;
    type: TrackableType;
    imageFilename?: string | null;
    isMass: boolean;
    servings: Serving[];
}

export enum TrackableType {
    FOOD = "FOOD",
    RECIPE = "RECIPE",
}
