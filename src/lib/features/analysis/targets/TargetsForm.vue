<!-- Form for setting daily targets. -->
<script setup lang="ts">
import { targetsStore } from "@/lib/stores";
import { computed, ref } from "vue";
import { putDailyTargets } from "../../../api";
import LabeledNumberInput from "../../../ui/form/input/labeled/LabeledNumberInput.vue";
import ListLoadingEffect from "../../../ui/list/ListLoadingEffect.vue";
import { kcalToKJ, kJToKcal, NUTRIENT_DISPLAY_NAMES, NUTRITION_KEYS, roundNutrient } from "@/lib/constants";

const emit = defineEmits<{
  (e: "finished"): void
}>();

const isSubmitting = ref(false);

const kJ = computed<number | null>({
  get: () => {
    if (targetsStore.dailyTargets && targetsStore.dailyTargets.kcal != null) {
      return roundNutrient(kcalToKJ(targetsStore.dailyTargets.kcal));
    }
    return null;
  },
  set: (newVal) => {
    if (targetsStore.dailyTargets) {
      targetsStore.dailyTargets.kcal = newVal ? roundNutrient(kJToKcal(newVal)) : null;
    }
  }
});


// FORM SUBMITTING
async function handleTargetsSubmit() {
  isSubmitting.value = true;
  if (!targetsStore.dailyTargets) {
    console.error("Daily targets shouldn't be null on form submit.");
    return;
  }

  putDailyTargets(targetsStore.dailyTargets!).finally(() => {
    isSubmitting.value = false;
    emit("finished");
  });
}

</script>

<template>
  <h2>Set your daily targets</h2>
  <ListLoadingEffect v-if="isSubmitting || targetsStore.isLoadingTargets" />
  <form v-else-if="targetsStore.dailyTargets" @submit.prevent="handleTargetsSubmit">
    <LabeledNumberInput label="Energy (kJ)" v-model="kJ" />
    <LabeledNumberInput :key="key" v-for="key in NUTRITION_KEYS" :label="NUTRIENT_DISPLAY_NAMES[key] ?? key"
      v-model="targetsStore.dailyTargets[key]" />
    <button type="submit" :disabled="isSubmitting">update targets</button>
  </form>
  <span v-else>failed to load targets</span>
</template>
