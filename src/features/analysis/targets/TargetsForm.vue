<!-- Form for setting daily targets. -->
<script setup lang="ts">
import { putDailyTargets } from "@/api";
import {
  kcalToKJ,
  kJToKcal,
  MACROS_KEYS,
  NUTRIENT_DISPLAY_NAMES,
  NUTRITION_KEYS,
  roundNutrient,
} from "@/constants";
import { useTargetsStore } from "@/stores";
import { computed, onMounted, reactive, ref } from "vue";

import type { DailyTargets } from "@/model";
import PrimaryButton from "@/ui/action/PrimaryButton.vue";
import LabeledNumberInput from "@/ui/form/input/labeled/LabeledNumberInput.vue";
import FormNavigationBar from "@/ui/form/nav/FormNavigationBar.vue";
import ListLoadingEffect from "@/ui/list/ListLoadingEffect.vue";
import { useAlerts } from "@/composables/alert.composable";
import { B } from "vue-router/dist/index-BzEKChPW.js";

const emit = defineEmits<{
  (e: "finished"): void;
}>();

const isSubmitting = ref(false);

const { targetsState } = useTargetsStore();
const { scheduleAlert } = useAlerts();

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

// validation
const errors = reactive<Record<string, string>>({});
function validate(): boolean {
  Object.keys(errors).forEach((key) => delete errors[key]);
  if (!targetsState.dailyTargets) return false; // targets must be loaded to complete form (if none server provides default)

  for (const key of NUTRITION_KEYS) {
    if (targetsState.dailyTargets[key] && targetsState.dailyTargets[key] < 0) {
      errors[key] = "cannot be a negative value";
    }
    if (kJ.value && kJ.value < 0) {
      errors.kj = "cannot be a negative value";
    }
  }

  return Object.keys(errors).length === 0;
}

// FORM SUBMITTING
function handleTargetsSubmit() {
  if (!validate()) return;
  isSubmitting.value = true;

  putDailyTargets(targetsState.dailyTargets!)
    .then(() => {
      emit("finished");
    })
    .catch((_) => {
      scheduleAlert("Updating daily targets failed. Please try again.");
      restoreTargets();
    })
    .finally(() => {
      isSubmitting.value = false;
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
    <FormNavigationBar title="nutritional targets" @close="onFormCancel" />
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
        :error="errors.kj"
        @input="delete errors.kj"
      />
      <LabeledNumberInput
        :key="key"
        v-for="key in NUTRITION_KEYS"
        :label="NUTRIENT_DISPLAY_NAMES[key] ?? key"
        v-model:value="targetsState.dailyTargets[key]"
        placeholder="Choose a daily target"
        :error="errors[key]"
        @input="delete errors[key]"
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
