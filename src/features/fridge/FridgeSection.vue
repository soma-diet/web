<!-- Left section for searching food / recipes, adding and updating food items or recipes. -->
<script setup lang="ts">
import type { Food } from "@/model";
import { useLogStore } from "@/stores";
import { useFoodSelectionStore } from "@/stores/food.store";
import AddFoodForm from "./crud/AddFoodForm.vue";
import EditFoodForm from "./crud/EditFoodForm.vue";
import "./search/Search.vue";
import Search from "./search/Search.vue";
import { useMobile } from "@/stores/mobile.store";

const logSelectionStore = useLogStore();
const { foodSelectionState, closeFoodForm } = useFoodSelectionStore();
const { setActiveSection } = useMobile();

const triggerAddEntry = (food: Food) => {
  logSelectionStore.openLogForm(food);
  setActiveSection("log");
};
</script>

<template>
  <Search
    v-if="!foodSelectionState.isFormOpen"
    @itemSelected="triggerAddEntry"
  />
  <AddFoodForm
    v-else-if="!foodSelectionState.selectedFood"
    @finished="closeFoodForm"
  />
  <EditFoodForm
    v-else
    :food="foodSelectionState.selectedFood"
    @finished="closeFoodForm"
  />
</template>
