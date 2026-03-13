<script setup lang="ts">
import type { Food } from '@/lib/model';
import LogItem from '@/lib/ui/list/LogItem.vue';

const emit = defineEmits<{
  (e: "loadMore"): void,
  (e: "itemSelected", item: Food): void
}>();

const props = defineProps<{
  items: Food[]
}>();

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
    <hr />
    <li v-for="item in props.items" :key="item.id">
      <LogItem :name="item.name" :subtext="item.brand" :kcal="item.macronutrients.kcal" :itemType="item.type"
        @click="emit('itemSelected', item)" />
    </li>
    <hr />
  </ul>
</template>

<style scoped>
ul {
  flex-grow: 1;
  overflow-y: auto;
}

hr {
  border: 1px solid var(--secondary-color);
}
</style>
