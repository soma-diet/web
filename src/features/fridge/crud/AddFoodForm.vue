<script setup lang="ts">
import { postFood } from "@/api";
import type { Food } from "@/model";
import FoodFormView from "./FoodFormView.vue";

const emit = defineEmits(["finished"]);

function onCancel() {
  emit("finished");
}

async function onSubmit(food: Food, image: File | null, callback: () => void) {
  await postFood(food, image);
  callback();
  emit("finished");
}
</script>

<template>
  <FoodFormView @submit="onSubmit" @cancel="onCancel" />
</template>
