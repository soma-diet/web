<script lang="ts">
  import Header from "./lib/Header.svelte";
  import { onMount } from "svelte";
  import { fetchFoodSearchResults, type FoodItem } from "./lib/api/food_search";

  let foodItems = $state<FoodItem[]>([]);
  let query = $state("");

  $effect(() => {
    (async () => {
      try {
        foodItems = await fetchFoodSearchResults(query);
        console.log($state.snapshot(foodItems));
      } catch (e) {
        console.error(
          "Authenticated fetch failed:",
          e instanceof Error ? e.message : String(e),
        );
      }
    })();
  });
</script>

<Header />
<main>
  <section class="side-view">
    <input type="text" class="field" bind:value={query} />
    <ul>
      <hr />
      {#if foodItems.length > 0}
        {#each foodItems as item}
          <li>
            <div class="col">
              <h5 class="item-name">
                {item.name}
              </h5>
              <span>{item.brand}</span>
            </div>
            <span>{item.macronutrients.kcal} kcal</span>
          </li>
          <hr />
        {/each}
      {:else}
        <span>No items found</span>
      {/if}
    </ul>
  </section>
  <section class="main-view">
    <h2>Your log</h2>
  </section>
  <section class="side-view">
    <h2>Graph</h2>
  </section>
</main>
