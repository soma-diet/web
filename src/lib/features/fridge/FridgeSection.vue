<!-- Left section for searching food / recipes, adding and updating food items or recipes. -->
<script setup lang="ts">
import type { Food } from '@/lib/model';
import { useLogSelectionStore } from '@/lib/stores';
import { useFoodSelectionStore } from '@/lib/stores/food-selection.store';
import "./search/Search.vue";

const logSelectionStore = useLogSelectionStore();
const { foodSelectionState, closeFoodForm, openFoodForm } = useFoodSelectionStore();

const triggerAddEntry = (food: Food) => {
  logSelectionStore.openLogForm(food);
  // openFoodForm(food);
};
</script>

<template>
  <Search v-if="!foodSelectionState.isFormOpen" @itemSelected="triggerAddEntry" />
  <FoodForm v-else @finished="closeFoodForm" :food="foodSelectionState.selectedFood ?? undefined" />
</template>