<!-- Form for setting daily targets. -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { getDailyTargets, putDailyTargets } from "../../../api";
import type { DailyTargets } from "../../../model";
import LabeledNumberInput from "../../../ui/form/input/labeled/LabeledNumberInput.vue";
import ListLoadingEffect from "../../../ui/list/ListLoadingEffect.vue";
import { NUTRIENT_NAMES, NUTRITION_KEYS, NUTRITION_RATIOS } from "@/lib/constants";

const emit = defineEmits<{
  (e: "finished"): void
}>();

const loadingTargets = ref(true);
const dailyTargets = ref<DailyTargets | null>(null);
const isSubmitting = ref(false);

getDailyTargets()
  .then((response: DailyTargets) => {
    dailyTargets.value = response;
  })
  .finally(() => {
    loadingTargets.value = false;
  });

const kJ = computed<number | string | null>({
  get: () => {
    if (dailyTargets.value?.kcal != null) {
      return Math.round(dailyTargets.value.kcal * NUTRITION_RATIOS.KCAL_TO_KJ_MULT * 10) / 10;
    }
    return null;
  },
  set: (newVal) => {
    if (dailyTargets.value) {
      if (newVal != null && newVal !== "") {
        dailyTargets.value.kcal = Math.round((Number(newVal) / NUTRITION_RATIOS.KCAL_TO_KJ_MULT) * 10) / 10;
      } else {
        dailyTargets.value.kcal = null;
      }
    }
  }
});


// FORM SUBMITTING
async function handleTargetsSubmit() {
  isSubmitting.value = true;
  if (!dailyTargets.value) {
    console.error("Daily targets shouldn't be null on form submit.");
    return;
  }

  putDailyTargets(dailyTargets.value!).finally(() => {
    isSubmitting.value = false;
    emit("finished");
  });
}

</script>

<template>
  <h2>Set your daily targets</h2>
  <ListLoadingEffect v-if="isSubmitting || loadingTargets" />
  <form v-else-if="dailyTargets" @submit.prevent="handleTargetsSubmit">
    <LabeledNumberInput label="Energy (kJ)" v-model="kJ" />
    <LabeledNumberInput label="Energy (kcal)" v-model="dailyTargets.kcal" />
    <LabeledNumberInput :key="key" v-for="key in NUTRITION_KEYS" :label="NUTRIENT_NAMES[key]"
      v-model="dailyTargets[key]" />
    <button type="submit" :disabled="isSubmitting">update targets</button>
  </form>
  <span v-else>failed to load targets</span>
</template>
