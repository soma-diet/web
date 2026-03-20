<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { deleteFood, getFoods } from "../../../api";
import type { Food } from "../../../model";
import TabSelection from "@/lib/ui/list/TabSelection.vue";
import FoodSearchResults from "./FoodSearchResults.vue";
import SearchInput from "@/lib/ui/form/input/SearchInput.vue";
import { useFoodSelectionStore } from "@/lib/stores/food-selection.store";
import { FoodSearchFilter } from "@/lib/api/food/food.filter";

const emit = defineEmits<{
  (e: "itemSelected", item: Food): void
}>();

const TIMEOUT_MS = 300;

const foodItems = ref<Food[]>([]);
const query = ref("");
const searching = ref(false);

const page = ref(0); // vychozi load je 0
const hasMore = ref(true);

const { openFoodForm } = useFoodSelectionStore();

// debounce timer
let timer: ReturnType<typeof setTimeout>;

async function search(currentQuery: string, newQuery: boolean) {
  console.log("searching <" + currentQuery + ">" + ", newQuery: " + newQuery);
  if (newQuery) {
    page.value = 0;
  } else {
    page.value += 1;
  }

  searching.value = true;

  const filter = getActiveFilter();
  try {
    const response = await getFoods(currentQuery, filter, page.value);
    hasMore.value = response.hasMore;
    foodItems.value = newQuery
      ? response.foodItems
      : [...foodItems.value, ...response.foodItems];
  } catch (e) {
    console.error("Searching food items failed:", e);
    if (page.value > 0) page.value -= 1;
  } finally {
    searching.value = false;
  }
}

async function loadMore() {
  if (searching.value || !hasMore.value) return;
  search(query.value, false);
}

async function triggerDelete(item: Food) {
  // hned smazat z UI
  foodItems.value = foodItems.value.filter((food) => food.id !== item.id);
  try {
    await deleteFood(item);
  } catch (e) {
    console.error("Failed to delete food item:", e);
  }
}

// Filters
const searchFilters = ["All", "Private", "Public"];
const selectedSearchFilter = ref<string>("All");
const getActiveFilter = () => {
  switch (selectedSearchFilter.value) {
    case "Private": return FoodSearchFilter.PRIVATE;
    case "Public": return FoodSearchFilter.PUBLIC;
    default: return FoodSearchFilter.ALL;
  }
}

watch(query, (newQuery) => {
  clearTimeout(timer);
  timer = setTimeout(async () => search(newQuery, true), TIMEOUT_MS);
})

watch(selectedSearchFilter, async () => {
  search(query.value, true);
})

onMounted(() => {
  search(query.value, true);
})
</script>

<template>
  <div class="col search-controls">
    <TabSelection v-model="selectedSearchFilter" :options="searchFilters" />
    <div class="row actions">
      <SearchInput v-model="query" placeholder="Search foods" />
      <TransparentButton @click="openFoodForm()">
        <AddIcon></AddIcon>
      </TransparentButton>
    </div>
  </div>
  <ListLoadingEffect v-if="searching" />
  <FoodSearchResults v-else-if="foodItems.length > 0" :items="foodItems" @loadMore="loadMore"
    @itemSelected="(item: Food) => emit('itemSelected', item)" @itemDeleted="triggerDelete" />
  <div v-else class="center-content offset-center-up">
    <span>No items found</span>
  </div>
</template>

<style scoped>
/* aby nacitaci column food search results nezmackla input a tab selection */
.search-controls {
  flex-shrink: 0;
}

.actions {
  padding: 0.5rem;
  gap: 0.5rem;
}
</style>
