import { TrackableType, type Trackable } from "../../model";

export function rawToTrackable(raw: any): Trackable {
    return {
        id: raw.id,
        name: raw.name,
        imageFilename: raw.imageFilename,
        isMass: raw.isMass,
        servings: raw.servings,
        author: raw.author,
        type: raw.type === "FOOD" ? TrackableType.FOOD : TrackableType.RECIPE,
    };
}
