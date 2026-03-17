<script setup lang="ts">
import { ref, watch } from "vue";
import { getFoodSearchResults } from "../../../api";
import type { Food } from "../../../model";
import TabSelection from "@/lib/ui/list/TabSelection.vue";
import FoodSearchResults from "./FoodSearchResults.vue";
import SearchInput from "@/lib/ui/form/input/SearchInput.vue";
import { useFoodSelectionStore } from "@/lib/stores/food-selection.store";

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
  if (newQuery) {
    page.value = 0;
  } else {
    page.value += 1;
  }

  searching.value = true;

  try {
    const response = await getFoodSearchResults(currentQuery, page.value);
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

watch(query, (newQuery) => {
  clearTimeout(timer);
  timer = setTimeout(async () => search(newQuery, true), TIMEOUT_MS);
})

async function loadMore() {
  if (searching.value || !hasMore.value) return;
  search(query.value, false);
}

search(query.value, true);

const ownerSelected = ref("All");
const typeSelected = ref("All");
const ownerOptions = ["All", "Private", "Public"];
const typeOptions = ["All", "Foods", "Recipes"];
</script>

<!-- TODO az bude user mit ucet tak vyhledavat podle typu
    Public = SOMA author
    Private = pouze jeho vlastni
    All = public + private
-->
<template>
  <div id="search-controls" class="col">
    <TabSelection v-model="ownerSelected" :options="ownerOptions" />
    <TabSelection v-model="typeSelected" :options="typeOptions" />
    <div id="actions" class="row">
      <SearchInput v-model="query" placeholder="Search foods" />
      <TransparentButton @click="openFoodForm()">
        <AddIcon></AddIcon>
      </TransparentButton>
    </div>
  </div>
  <ListLoadingEffect v-if="searching && foodItems.length === 0" />
  <div v-else-if="!searching && foodItems.length === 0" class="center-content offset-center-up">
    <span>No items found</span>
  </div>
  <FoodSearchResults :items="foodItems" @loadMore="loadMore"
    @itemSelected="(item: Food) => emit('itemSelected', item)" />
</template>

<style scoped>
/* aby nacitaci column food search results nezmackla input a tab selection */
#search-controls {
  flex-shrink: 0;
}

#actions {
  padding: 0.5rem;
  gap: 0.5rem;
}
</style>
