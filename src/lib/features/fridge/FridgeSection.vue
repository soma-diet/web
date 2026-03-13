<!-- Left section for searching food / recipes, adding and updating food items or recipes. -->
<script setup lang="ts">
import { ref } from 'vue';
import type { Food } from '@/lib/model';
import { useLogSelectionStore } from '@/lib/stores';
import { View } from './fridge.helper';
import "./search/Search.vue"

let view = ref<string>(View.SEARCH);
let selectedFood = ref<Food | null>(null);

const showSearch = () => (view.value = View.SEARCH);
const showAdd = () => (view.value = View.ADD); // TODO jeste nevim kde na to bude button
const showEdit = (food: Food) => {
  selectedFood.value = food;
  view.value = View.EDIT;
};

const logSelectionStore = useLogSelectionStore();

const triggerAddEntry = (food: Food) => {
  logSelectionStore.openLogForm(food);
};
</script>

<template>
  <Search v-if="view === View.SEARCH" @itemSelected="triggerAddEntry" />
  <FoodForm v-else-if="view === View.ADD" @finished="showSearch" />
  <FoodForm v-else-if="view === View.EDIT" @finished="showSearch" :food="selectedFood" />
</template>