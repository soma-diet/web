<script lang="ts">
  import { getWithSystemServings } from "../../../constants/system-servings.const";
  import type { Food, Serving } from "../../../model";

  interface Props {
    food: Food;
    onSubmitTask: () => Promise<void>; // promise aby na to mohl dat .finally uvnitr
    quantity: number;
    selectedServing: Serving;
  }

  let {
    food,
    onSubmitTask: onSubmitTask,
    quantity = $bindable(),
    selectedServing = $bindable(),
  } = $props();

  let unit = $derived(food.isMass ? "g" : "ml");
  let servings = $derived(getWithSystemServings(food));
  let totalSize = $derived(quantity * selectedServing.size);
  let isSubmitting = $state(false);

  async function onsubmit(event: SubmitEvent) {
    // wrapper abych izoloval isSubmitting hodnotu uvnitr komponenty
    event.preventDefault();
    isSubmitting = true;
    try {
      await onSubmitTask();
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form {onsubmit}>
  <h3>{food.name}</h3>
  <span>{food.brand}</span>
  <span>{food.author}</span>

  <div>
    <label for="quantity">Amount: </label>
    <input type="number" name="quantity" bind:value={quantity} />
    <span>{`(${totalSize} ${unit}`}</span>
  </div>

  <div>
    <label for="serving">Serving: </label>
    <select name="serving" id="" bind:value={selectedServing}>
      {#each servings as serving}
        <!-- TODO system serving je zatim jen v g, takze potreba prepsat na ml, ale zaroven nemuzu pridat obe kazdemu foodu -->
        <option value={serving}>{serving.name}</option>
      {/each}
    </select>
  </div>

  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? "Adding..." : "Add"}
  </button>
</form>

<style>
  form {
    flex: 1;
    min-width: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
    text-align: end;
  }
</style>
