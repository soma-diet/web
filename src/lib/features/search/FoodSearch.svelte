<script lang="ts">
    import {
        type FoodItem,
        type FoodSearchResponse,
        fetchFoodSearchResults,
    } from "../../api/food_search";
    import SearchInput from "../ui/SearchInput.svelte";
    import TabSelection from "../ui/TabSelection.svelte";
    import FoodSearchResults from "./FoodSearchResults.svelte";

    const TIMEOUT_MS = 300;

    let foodItems = $state<FoodItem[]>([]);
    let query = $state("");
    let searching = $state(false);

    let page = $state(0); // vychozi load je 0
    let hasMore = $state(true);

    // debounce timer
    let timer: ReturnType<typeof setTimeout>;

    async function search(currentQuery: string, newQuery: boolean) {
        if (newQuery) {
            page = 0;
        } else {
            page += 1;
        }

        searching = true;

        try {
            const response = await fetchFoodSearchResults(currentQuery, page);
            hasMore = response.hasMore;
            foodItems = newQuery
                ? response.foodItems
                : [...foodItems, ...response.foodItems];
        } catch (e) {
            console.error("Searching food items failed:", e);
            if (page > 0) page -= 1;
        } finally {
            searching = false;
        }
    }

    $effect(() => {
        const currentQuery = query; // potreba precist drive nez v async blocku!!!
        clearTimeout(timer);
        timer = setTimeout(async () => search(currentQuery, true), TIMEOUT_MS);
    });

    async function loadMore() {
        if (searching || !hasMore) return;
        search(query, false);
    }
</script>

<!-- TODO az bude user mit ucet tak vyhledavat podle typu
    Public = SOMA author
    Private = pouze jeho vlastni
    All = public + private
-->
<div class="search-controls">
    <TabSelection selected="All" options={["All", "Private", "Public"]} />
    <SearchInput bind:value={query} placeholder="Search foods" />
</div>
{#if searching && foodItems.length === 0}
    <span>searching</span>
{:else if !searching && foodItems.length === 0}
    <span>no food items</span>
{:else}
    <FoodSearchResults items={foodItems} onLoadMore={loadMore} />
{/if}

<style>
    /* aby nacitaci column food search results nezmackla input a tab selection */
    .search-controls {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
    }
</style>
