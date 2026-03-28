import { getDailySummary } from "@/lib/api";
import type { DailySummary } from "@/lib/model";
import { getDayOfWeek } from "@/lib/utils/date.util";

export async function getWeekData(
  lastDay = new Date() as Date,
): Promise<Map<string, DailySummary>> {
  const promises: Promise<DailySummary>[] = [];
  const dates: Date[] = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date(lastDay);
    day.setDate(day.getDate() - i);
    const summaryPromise = getDailySummary(day);
    promises.push(summaryPromise);
    dates.push(day);
  }

  try {
    const summaries = await Promise.all(promises);
    const weeklySummary = new Map<string, DailySummary>();
    summaries.forEach((summary, i) => {
      const day = getDayOfWeek(dates[i]!.getDay());
      weeklySummary.set(day, summary);
    });
    return weeklySummary;
  } catch (err) {
    console.error("Failed to get weekly summary!");
    return new Map();
  }
}

export function extractNutrientsFromWeek(
  key: string,
  data: Map<string, DailySummary>,
) {
  const days: string[] = [];
  const values: number[] = [];
  data.forEach((summary, day) => {
    days.push(day);
    values.push(summary[key] ?? 0);
  });

  return { days, values };
}
