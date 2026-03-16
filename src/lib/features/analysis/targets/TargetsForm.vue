<!-- Form for setting daily targets. -->
<script setup lang="ts">
import { NUTRIENT_NAMES, NUTRITION_KEYS, NUTRITION_RATIOS } from "@/lib/constants";
import { targetsStore } from "@/lib/stores";
import { computed, ref } from "vue";
import { putDailyTargets } from "../../../api";
import LabeledNumberInput from "../../../ui/form/input/labeled/LabeledNumberInput.vue";
import ListLoadingEffect from "../../../ui/list/ListLoadingEffect.vue";

const emit = defineEmits<{
  (e: "finished"): void
}>();

const isSubmitting = ref(false);

const kJ = computed<number | string | null>({
  get: () => {
    if (targetsStore.dailyTargets?.kcal != null) {
      return Math.round(targetsStore.dailyTargets.kcal * NUTRITION_RATIOS.KCAL_TO_KJ_MULT * 10) / 10;
    }
    return null;
  },
  set: (newVal) => {
    if (targetsStore.dailyTargets) {
      if (newVal != null && newVal !== "") {
        targetsStore.dailyTargets.kcal = Math.round((Number(newVal) / NUTRITION_RATIOS.KCAL_TO_KJ_MULT) * 10) / 10;
      } else {
        targetsStore.dailyTargets.kcal = null;
      }
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
    <LabeledNumberInput label="Energy (kcal)" v-model="targetsStore.dailyTargets.kcal" />
    <LabeledNumberInput :key="key" v-for="key in NUTRITION_KEYS" :label="NUTRIENT_NAMES[key]"
      v-model="targetsStore.dailyTargets[key]" />
    <button type="submit" :disabled="isSubmitting">update targets</button>
  </form>
  <span v-else>failed to load targets</span>
</template>
