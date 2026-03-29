<script setup lang="ts">
import { postFood } from "@/api";
import type { Food } from "@/model";
import FoodFormView from "./FoodFormView.vue";
import { useAlerts } from "@/composables/alert.composable";

const emit = defineEmits(["finished"]);

const { scheduleAlert } = useAlerts();

function onCancel() {
  emit("finished");
}

async function onSubmit(food: Food, image: File | null, callback: () => void) {
  try {
    await postFood(food, image);
    callback();
    emit("finished");
  } catch (err) {
    scheduleAlert("Adding a new food failed. Please try again.");
  }
}
</script>

<template>
  <FoodFormView @submit="onSubmit" @cancel="onCancel" />
</template>
