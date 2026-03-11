<script lang="ts">
  import { getDailySummary, getDailyTargets } from "../../../../api";
  import { NUTRIENT_NAMES } from "../../../../constants/ui.const";
  import type { DailySummary, DailyTargets } from "../../../../model";
  import ListLoadingEffect from "../../../../ui/list/ListLoadingEffect.svelte";

  interface Props {
    date: Date;
  }
  let { date }: Props = $props();

  const shownTargetsKeys: (keyof DailyTargets)[] = ["kcal", "protein"];

  let dailyTargets = $state<DailyTargets | null>(null);
  let dailySummary = $state<DailySummary | null>(null);

  let loadingTargets = $state(true);
  let loadingSummary = $state(true);

  getDailyTargets()
    .then((targets) => {
      dailyTargets = targets;
    })
    .finally(() => {
      loadingTargets = false;
    });

  getDailySummary(date)
    .then((summary) => {
      dailySummary = summary;
    })
    .finally(() => {
      loadingSummary = false;
    });

  let isLoading = $derived(loadingTargets || loadingSummary);

  let targets = $derived(
    shownTargetsKeys.map((key) => ({
      name: NUTRIENT_NAMES[key] ?? key,
      current: dailySummary?.[key] ?? 0,
      max: dailyTargets?.[key] ?? null,
    })),
  );
</script>

{#if isLoading}
  <ListLoadingEffect />
{:else}
  <div class="col stretch-h middle">
    {#each targets as target}
      <div class="apart">
        <span>{target.name}</span>
        <span>
          {target.max != null
            ? `${target.current} / ${target.max}`
            : target.current}
        </span>
      </div>
      {#if target.max != null}
        <progress value={target.current} max={target.max}></progress>
      {/if}
    {/each}
  </div>
{/if}
