<!-- Form for setting daily targets. -->
<script setup lang="ts">
import { putDailyTargets } from "@/api";
import {
  kcalToKJ,
  kJToKcal,
  NUTRIENT_DISPLAY_NAMES,
  NUTRITION_KEYS,
  roundNutrient,
} from "@/constants";
import { useTargetsStore } from "@/stores";
import { computed, onMounted, ref } from "vue";

import type { DailyTargets } from "@/model";
import PrimaryButton from "@/ui/action/PrimaryButton.vue";
import LabeledNumberInput from "@/ui/form/input/labeled/LabeledNumberInput.vue";
import FormNavigationBar from "@/ui/form/nav/FormNavigationBar.vue";
import ListLoadingEffect from "@/ui/list/ListLoadingEffect.vue";

const emit = defineEmits<{
  (e: "finished"): void;
}>();

const isSubmitting = ref(false);

const { targetsState } = useTargetsStore();

const kJ = computed<number | null>({
  get: () => {
    if (targetsState.dailyTargets && targetsState.dailyTargets.kcal != null) {
      return roundNutrient(kcalToKJ(targetsState.dailyTargets.kcal));
    }
    return null;
  },
  set: (newVal) => {
    if (targetsState.dailyTargets) {
      targetsState.dailyTargets.kcal = newVal
        ? roundNutrient(kJToKcal(newVal))
        : null;
    }
  },
});

let originalTargets = null as DailyTargets | null;
function restoreTargets() {
  if (!originalTargets) return;
  targetsState.dailyTargets = originalTargets;
}

// FORM SUBMITTING
async function handleTargetsSubmit() {
  isSubmitting.value = true;

  putDailyTargets(targetsState.dailyTargets!)
    .catch((_) => restoreTargets)
    .finally(() => {
      isSubmitting.value = false;
      emit("finished");
    });
}

function onFormCancel() {
  restoreTargets();
  emit("finished");
}

onMounted(() => {
  originalTargets = { ...targetsState.dailyTargets }; // ulozit kopii, kdyby dal cancel
});
</script>

<template>
  <div class="wrapper col">
    <FormNavigationBar title="SET DAILY TARGETS" @close="onFormCancel" />
    <ListLoadingEffect v-if="isSubmitting || targetsState.isLoadingTargets" />
    <form
      v-else-if="targetsState.dailyTargets"
      @submit.prevent="handleTargetsSubmit"
      class="col"
    >
      <LabeledNumberInput
        label="Energy (kJ)"
        v-model:value="kJ"
        placeholder="Choose a daily target"
      />
      <LabeledNumberInput
        :key="key"
        v-for="key in NUTRITION_KEYS"
        :label="NUTRIENT_DISPLAY_NAMES[key] ?? key"
        v-model:value="targetsState.dailyTargets[key]"
        placeholder="Choose a daily target"
      />
      <PrimaryButton type="submit" :disabled="isSubmitting"
        >Update daily targets</PrimaryButton
      >
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 1.5rem;
  gap: 1rem;
  overflow-y: scroll;
}

form {
  gap: 1rem;
}

h2 {
  text-transform: uppercase;
}
</style>
