<!-- Form for setting daily targets. -->
<script setup lang="ts">
import { kcalToKJ, kJToKcal, NUTRIENT_DISPLAY_NAMES, NUTRITION_KEYS, roundNutrient } from "@/lib/constants";
import { computed, ref } from "vue";
import { putDailyTargets } from "../../../api";
import LabeledNumberInput from "../../../ui/form/input/labeled/LabeledNumberInput.vue";
import ListLoadingEffect from "../../../ui/list/ListLoadingEffect.vue";
import { useTargetsStore } from "@/lib/stores";

const emit = defineEmits<{
  (e: "finished"): void
}>();

const isSubmitting = ref(false);

const { targetsState, reloadTargets } = useTargetsStore();

const kJ = computed<number | null>({
  get: () => {
    if (targetsState.dailyTargets && targetsState.dailyTargets.kcal != null) {
      return roundNutrient(kcalToKJ(targetsState.dailyTargets.kcal));
    }
    return null;
  },
  set: (newVal) => {
    if (targetsState.dailyTargets) {
      targetsState.dailyTargets.kcal = newVal ? roundNutrient(kJToKcal(newVal)) : null;
    }
  }
});


// FORM SUBMITTING
async function handleTargetsSubmit() {
  isSubmitting.value = true;
  if (!targetsState.dailyTargets) {
    console.error("Daily targets shouldn't be null on form submit.");
    return;
  }

  putDailyTargets(targetsState.dailyTargets!).catch((_) => {
    // if error reload targets to saved values from the server
    reloadTargets();
  }).finally(() => {
    isSubmitting.value = false;
    emit("finished");
  });
}

</script>

<template>
  <h2>Set your daily targets</h2>
  <ListLoadingEffect v-if="isSubmitting || targetsState.isLoadingTargets" />
  <form v-else-if="targetsState.dailyTargets" @submit.prevent="handleTargetsSubmit">
    <LabeledNumberInput label="Energy (kJ)" v-model:value="kJ" />
    <LabeledNumberInput :key="key" v-for="key in NUTRITION_KEYS" :label="NUTRIENT_DISPLAY_NAMES[key] ?? key"
      v-model:value="targetsState.dailyTargets[key]" />
    <button type="submit" :disabled="isSubmitting">update targets</button>
  </form>
  <span v-else>failed to load targets</span>
</template>
