<script setup lang="ts">
import { putFood } from '@/lib/api';
import type { Food } from '@/lib/model';
import { useFoodSelectionStore } from '@/lib/stores';

const emit = defineEmits(["finished"]);
const props = defineProps<{
  food: Food
}>();

function onCancel() {
  emit("finished");
}

async function onSubmit(food: Food, image: File | null, callback: () => void) {
  await putFood(food, image);
  callback();
  emit("finished");
}

</script>

<template>
  <FoodFormView :food="props.food" @submit="onSubmit" @cancel="onCancel" />
</template>