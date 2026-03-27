<script setup lang="ts">
import { postFood } from '@/lib/api';
import type { Food } from '@/lib/model';
import FoodFormView from './FoodFormView.vue';

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