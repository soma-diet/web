<script setup lang="ts">
import { deleteFood } from '@/lib/api';
import type { Food } from '@/lib/model';
import { useFoodSelectionStore } from '@/lib/stores';

const emit = defineEmits<{
  (e: "loadMore"): void,
  (e: "itemSelected", item: Food): void,
  (e: "itemDeleted", item: Food): void
}>();

const props = defineProps<{
  items: Food[]
}>();

const { openFoodForm } = useFoodSelectionStore();

function handleScroll(e: Event) {
  const el = e.target as HTMLElement;

  // vypocet toho zda uz doscrolloval dolu
  const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 200;
  if (isBottom) {
    setTimeout(() => {
      emit("loadMore");
    }, 50);
  }
}
</script>

<template>
  <ul @scroll="handleScroll">
    <template v-for="item in props.items" :key="item.id">
      <li>
        <InteractableItem :name="item.name" :subtext="item.brand ?? undefined" :kcal="item.macronutrients.kcal"
          :itemType="item.type" :leftAction="item.isPrivate" :rightAction="item.isPrivate"
          @click="emit('itemSelected', item)" @onedit="openFoodForm(item)" @ondelete="emit('itemDeleted', item)" />
      </li>
    </template>
  </ul>
</template>

<style scoped>
ul {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
