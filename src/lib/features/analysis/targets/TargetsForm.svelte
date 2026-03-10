<!-- Form for setting daily targets. -->
<script lang="ts">
  import { getDailyTargets } from "../../../api";
  import { NutritionRatios } from "../../../constants/nutrition.const";
  import type { DailyTargets } from "../../../model";
  import LabeledInput from "../../../ui/form/input/LabeledInput.svelte";
  import ListLoadingEffect from "../../../ui/list/ListLoadingEffect.svelte";

  let loadingTargets = $state(true);
  let dailyTargets = $state<DailyTargets | null>(null);
  getDailyTargets()
    .then((response: DailyTargets) => {
      dailyTargets = response;
    })
    .finally(() => {
      loadingTargets = false;
    });

  let kJ = $derived<number | null>(dailyTargets?.kcal * NutritionRatios.KCAL_TO_KJ_MULT ?? null);
  let kcal = $derived<number | null>(kJ / NutritionRatios.KCAL_TO_KJ_MULT);
</script>

<h2>Set your daily targets</h2>
{#if dailyTargets}
  <form>
    <LabeledInput type="number" label="Energy (kJ)" name="kj" bind:value={kJ} />
    <LabeledInput type="number" label="Energy (kcal)" name="kcal" bind:value={kcal} />
    <hr />
    <LabeledInput type="number" label="Fats" name="fats" value="" />
    <LabeledInput type="number" label="Carbohydrates" name="cars" value="" />
    <LabeledInput type="number" label="Protein" name="protein" value="" />
    <hr />
    <LabeledInput type="number" label="Fiber" name="fiber" value="" />
    <LabeledInput type="number" label="Sodium" name="sodium" value="" />
  </form>
{:else if loadingTargets}
<ListLoadingEffect />
{:else}
<span>failed to load targets</span>
{/if}
