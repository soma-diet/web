<!-- Left section for searching food / recipes, adding and updating food items or recipes. -->
<script lang="ts">
  import type { Food } from "../../model";
  import { openLogForm } from "../../stores/ui.store";
  import FoodForm from "./crud/FoodForm.svelte";
  import { View } from "./fridge.helper";
  import Search from "./search/Search.svelte";

  let view = $state<string>(View.SEARCH);
  let selectedFood = $state<Food | null>(null);

  const showSearch = () => (view = View.SEARCH);
  const showAdd = () => (view = View.ADD); // TODO jeste nevim kde na to bude button
  const showEdit = (food: Food) => {
    selectedFood = food;
    view = View.EDIT;
  };

  const triggerAddEntry = (food: Food) => {
    openLogForm(food);
  };
</script>

{#if view === View.SEARCH}
  <Search onItemSelected={triggerAddEntry} />
{:else if view === View.ADD}
  <FoodForm onFinished={showSearch} />
{:else if view === View.EDIT}
  <FoodForm onFinished={showSearch} food={selectedFood} />
{/if}
