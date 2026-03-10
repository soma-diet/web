import type { DailyTargets } from "../../model";
import { fetchWithAuth } from "../client";
import { rawToTargets } from "./targets.mapper";

const TARGETS_ENDPOINT = "/api/user/targets";

async function getDailyTargets(): Promise<DailyTargets> {
    const response = await fetchWithAuth(TARGETS_ENDPOINT);
    const raw = response.json();
    return rawToTargets(raw);
}

async function putDailyTargets(targets: DailyTargets): Promise<boolean> {
    const response = await fetchWithAuth(TARGETS_ENDPOINT, {
        method: "PUT",
        body: JSON.stringify(targets),
    });
    return response.ok;
}
