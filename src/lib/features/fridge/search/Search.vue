<script setup lang="ts">
import { FoodSearchFilter } from "@/lib/api/food/food.filter";
import { useFoodSelectionStore } from "@/lib/stores/food-selection.store";
import OutlineButton from "@/lib/ui/action/OutlineButton.vue";
import SearchInput from "@/lib/ui/form/input/SearchInput.vue";
import AddIcon from "@/lib/ui/icon/AddIcon.vue";
import ListLoadingEffect from "@/lib/ui/list/ListLoadingEffect.vue";
import TabSelection from "@/lib/ui/list/TabSelection.vue";
import { onMounted, ref, watch } from "vue";
import { deleteFood, getFoods } from "../../../api";
import type { Food } from "../../../model";
import NoResults from "./components/NoResults.vue";
import FoodSearchResults from "./FoodSearchResults.vue";

const emit = defineEmits<{
  (e: "itemSelected", item: Food): void;
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
  if (newQuery) {
    page.value = 0;
  } else {
    page.value += 1;
  }

  searching.value = true;
  if (newQuery) foodItems.value = [];

  const filter = getActiveFilter();
  try {
    const response = await getFoods(currentQuery, filter, page.value);
    foodItems.value = [...foodItems.value, ...response.foodItems];
    hasMore.value = response.hasMore;
  } catch (e) {
    console.error("Searching food items failed:", e);
    if (page.value > 0) page.value -= 1;
  } finally {
    searching.value = false;
  }
}

watch(query, (newQuery) => {
  clearTimeout(timer);
  timer = setTimeout(() => search(newQuery, true), TIMEOUT_MS);
});

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
    case "Private":
      return FoodSearchFilter.PRIVATE;
    case "Public":
      return FoodSearchFilter.PUBLIC;
    default:
      return FoodSearchFilter.ALL;
  }
};

watch(query, (newQuery) => {
  clearTimeout(timer);
  timer = setTimeout(() => search(newQuery, true), TIMEOUT_MS);
});

watch(selectedSearchFilter, () => {
  search(query.value, true);
});

onMounted(() => {
  search(query.value, true);
});
</script>

<template>
  <div class="col search-controls">
    <TabSelection v-model="selectedSearchFilter" :options="searchFilters" />
    <div class="row actions center stretch-v">
      <SearchInput class="search" v-model="query" placeholder="Search foods" />
      <OutlineButton class="plus-btn" @click="openFoodForm()">
        <AddIcon></AddIcon>
      </OutlineButton>
    </div>
  </div>
  <ListLoadingEffect v-if="searching && foodItems.length === 0" />
  <FoodSearchResults
    v-else-if="foodItems.length > 0"
    :items="foodItems"
    @loadMore="loadMore"
    @itemSelected="(item: Food) => emit('itemSelected', item)"
    @itemDeleted="triggerDelete"
  />
  <NoResults class="offcenter" v-else />
</template>

<style scoped>
.search-controls {
  gap: 0.25rem;
  .actions {
    padding: 0.5rem;
    gap: 0.5rem;
    height: 4rem;
  }
  .plus-btn {
    aspect-ratio: 1;
  }
}

@media (min-width: 1920px) {
  .search-controls {
    .actions {
      height: 6rem;
    }
    .search {
      padding-left: 2rem;
      font-size: 150%;
    }
  }
}
</style>
