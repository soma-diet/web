<script setup lang="ts">
import { FOOD_SEARCH_PAGE_SIZE } from "@/lib/constants/food.const";
import type { Food } from "@/lib/model";
import { useFoodSelectionStore } from "@/lib/stores";
import InteractableItem from "@/lib/ui/list/interactable/InteractableItem.vue";
import { onMounted, onUnmounted } from "vue";

const emit = defineEmits<{
  (e: "loadMore"): void;
  (e: "itemSelected", item: Food): void;
  (e: "itemDeleted", item: Food): void;
}>();

const props = defineProps<{
  items: Food[];
}>();

const { openFoodForm } = useFoodSelectionStore();

function handleScroll(e?: Event) {
  let isBottom = false;

  if (e && e.target instanceof HTMLElement) {
    // scrollovani na PC (posila event z <ul> @scroll)
    const el = e.target;
    isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 200;
  } else {
    // scrollovani na mobile (nema event nad htmlelement)
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    isBottom = scrollY + windowHeight >= docHeight - 200;
  }

  // staci setTimeout, parent resi debounce na loadMore, takze se nespamuje
  if (isBottom) setTimeout(() => emit("loadMore"), 150);
}
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <ul @scroll="handleScroll">
    <template v-for="(item, index) in props.items" :key="item.id">
      <li>
        <InteractableItem
          :index="index % FOOD_SEARCH_PAGE_SIZE"
          :name="item.name"
          :subtext="item.brand ?? undefined"
          :kcal="item.macronutrients.kcal"
          :itemType="item.type"
          :leftAction="item.isPrivate"
          :rightAction="item.isPrivate"
          @click="emit('itemSelected', item)"
          @onedit="openFoodForm(item)"
          @ondelete="emit('itemDeleted', item)"
        />
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
