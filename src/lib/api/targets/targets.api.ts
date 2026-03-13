import type { DailyTargets } from "../../model";
import { fetchWithAuth } from "../client";
import { rawToTargets } from "./targets.mapper";

const TARGETS_ENDPOINT = "/api/user/targets";

export async function getDailyTargets(): Promise<DailyTargets> {
    const response = await fetchWithAuth(TARGETS_ENDPOINT);
    const raw = await response.json();
    return rawToTargets(raw);
}

export async function putDailyTargets(targets: DailyTargets): Promise<boolean> {
    const response = await fetchWithAuth(TARGETS_ENDPOINT, {
        method: "PUT",
        body: JSON.stringify(targets),
    });
    console.log("daily targets update success", response.ok, response.status);
    return response.ok;
}
