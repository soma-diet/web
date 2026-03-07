<script lang="ts">
  import AddFoodForm from "./lib/features/add_food/AddFoodForm.svelte";
  import Header from "./lib/features/layout/Header.svelte";
  import LogFood from "./lib/features/log/LogFood.svelte";
  import FoodSearch from "./lib/features/search/FoodSearch.svelte";
  import { SAMPLE_FOOD_ITEM, SAMPLE_FOOD_ITEM_2 } from "./lib/sample/SampleFoodItem";
  import { SAMPLE_LOG_ENTRY } from "./lib/sample/SampleLogEntry";
</script>

<Header />
<main>
  <section class="side-view">
    <FoodSearch />
    <!-- <AddFoodForm /> -->
  </section>
  <section class="main-view">
    <!-- <DailyLog /> -->
    <LogFood food_item={SAMPLE_FOOD_ITEM_2} />
  </section>
  <section class="side-view">
    <h2>Graph</h2>
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
    flex: 1;
    gap: 1px;
    min-height: 0;
  }

  section {
    background-color: var(--primary-color);
    border-left: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    height: 100%;
    min-height: 0;
    min-width: 0;
  }

  section.side-view {
    flex: 2;
  }

  section.main-view {
    flex: 3;
  }

  section:last-child {
    border-right: 1px solid var(--border-color);
  }

  /* bevel border edges */
  section:first-child {
    clip-path: polygon(
      0% 0%,
      calc(100% - 7px) 0%,
      100% 7px,
      100% 100%,
      0% 100%
    );
  }

  section:not(:first-child):not(:last-child) {
    clip-path: polygon(
      7px 0%,
      calc(100% - 7px) 0%,
      100% 7px,
      100% 100%,
      0% 100%,
      0% 7px
    );
  }

  section:last-child {
    clip-path: polygon(7px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 7px);
  }
</style>
