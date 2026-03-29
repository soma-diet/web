<script setup lang="ts">
import { putFood } from "@/api";
import type { Food } from "@/model";
import FoodFormView from "./FoodFormView.vue";
import { useAlerts } from "@/composables/alert.composable";

const emit = defineEmits(["finished"]);
const props = defineProps<{
  food: Food;
}>();

const { scheduleAlert } = useAlerts();

function onCancel() {
  emit("finished");
}

async function onSubmit(food: Food, image: File | null, callback: () => void) {
  try {
    await putFood(food, image);
  } catch (err) {
    scheduleAlert("Editing food failed. Please try again.");
  }
  callback();
  emit("finished");
}
</script>

<template>
  <FoodFormView :food="props.food" @submit="onSubmit" @cancel="onCancel" />
</template>
