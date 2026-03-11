<!-- Form for setting daily targets. -->
<script lang="ts">
  import { getDailyTargets, putDailyTargets } from "../../../api";
  import { NutritionRatios } from "../../../constants/nutrition.const";
  import type { DailyTargets } from "../../../model";
  import LabeledNumberInput from "../../../ui/form/input/labeled/LabeledNumberInput.svelte";
  import ListLoadingEffect from "../../../ui/list/ListLoadingEffect.svelte";
  import NutritionalInfo from "../../log/crud/info/NutritionalInfo.svelte";

  interface Props {
    onFinished: () => void;
  }
  let { onFinished }: Props = $props();

  let loadingTargets = $state(true);
  let dailyTargets = $state<DailyTargets | null>(null);
  getDailyTargets()
    .then((response: DailyTargets) => {
      dailyTargets = response;
    })
    .finally(() => {
      loadingTargets = false;
      onKcalChanged();
    });

  function updateTarget(key: keyof DailyTargets, value: string) {
    if (dailyTargets)
      dailyTargets[key] = value === "" ? null : Number.parseFloat(value);
  }

  function updateTargetOnChanged(key: keyof DailyTargets, event: Event) {
    const target = event.target as HTMLInputElement;
    updateTarget(key, target.value);
  }

  // KJ x KCAL logic
  let kJ = $state<number | null>(null);

  function onKJChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    kJ = value === "" ? null : Number.parseFloat(value);
    let newKcal = kJ
      ? Math.round((kJ / NutritionRatios.KCAL_TO_KJ_MULT) * 10) / 10
      : null;

    updateTarget("kcal", newKcal?.toString() ?? "");
  }

  function onKcalChanged() {
    if (dailyTargets?.kcal != null)
      kJ =
        Math.round(dailyTargets.kcal * NutritionRatios.KCAL_TO_KJ_MULT * 10) /
        10;
    else kJ = null;
  }

  // FORM SUBMITTING
  let isSubmitting = $state(false);
  async function handleTargetsSubmit(event: Event) {
    event.preventDefault();
    isSubmitting = true;
    if (!dailyTargets) {
      console.error("Daily targets shouldn't be null on form submit.");
      return;
    }
    putDailyTargets(dailyTargets!).finally(() => {
      isSubmitting = false;
      onFinished();
    });
  }
</script>

<h2>Set your daily targets</h2>
{#if isSubmitting || loadingTargets}
  <ListLoadingEffect />
{:else if dailyTargets}
  <form onsubmit={handleTargetsSubmit}>
    <LabeledNumberInput
      label="Energy (kJ)"
      value={kJ ?? ""}
      oninput={onKJChanged}
    />
    <LabeledNumberInput
      label="Energy (kcal)"
      value={dailyTargets.kcal ?? ""}
      oninput={(e) => {
        updateTargetOnChanged("kcal", e);
        onKcalChanged();
      }}
    />
    <hr />
    <LabeledNumberInput
      label="Fats"
      value={dailyTargets.fats ?? ""}
      oninput={(e) => updateTargetOnChanged("fats", e)}
    />
    <LabeledNumberInput
      label="Carbohydrates"
      value={dailyTargets.carbs ?? ""}
      oninput={(e) => updateTargetOnChanged("carbs", e)}
    />
    <LabeledNumberInput
      label="Protein"
      value={dailyTargets.protein ?? ""}
      oninput={(e) => updateTargetOnChanged("protein", e)}
    />
    <hr />
    <LabeledNumberInput
      label="Fiber"
      value={dailyTargets.fiber ?? ""}
      oninput={(e) => updateTargetOnChanged("fiber", e)}
    />
    <LabeledNumberInput
      label="Sodium"
      value={dailyTargets.sodium ?? ""}
      oninput={(e) => updateTargetOnChanged("sodium", e)}
    />
    <button type="submit" disabled={isSubmitting}>update targets</button>
  </form>
{:else}
  <span>failed to load targets</span>
{/if}
