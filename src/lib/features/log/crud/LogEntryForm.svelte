<script lang="ts">
  import { postLogEntry, putLogEntry } from "../../../api";
  import { getWithSystemServings } from "../../../constants/system-servings.const";
  import {
    createLogEntry,
    type LogEntry,
    type Trackable,
  } from "../../../model";
  import TransparentButton from "../../../ui/action/TransparentButton.svelte";
  import { CrossIcon } from "../../../ui/icon";
  import { getImage, SomaImageSize } from "../../../utils/image.util";

  interface Props {
    trackable: Trackable;
    onFinished: () => void;
    entry?: LogEntry | null;
  }

  let { trackable, onFinished, entry = null }: Props = $props();

  const unit = "g";
  const thumbnailSrc = $derived(
    trackable.imageFilename
      ? getImage(trackable.imageFilename, SomaImageSize.LARGE)
      : "",
  );

  // inputs
  let quantity = $derived(entry?.quantity ?? 100);

  // servings
  const servings = $derived(getWithSystemServings(trackable));
  const initialServing = $derived(
    entry
      ? servings.find((val) => (val.id ?? null) === (entry.servingId ?? null))
      : servings[0],
  );
  let selectedServing = $derived(initialServing ?? servings[0]);

  // helpers
  let totalSize = $derived(quantity * selectedServing.size);
  let isSubmitting = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    isSubmitting = true;

    const newEntry = !entry
      ? createLogEntry(trackable, selectedServing, quantity)
      : { ...entry, quantity };
    const httpCall = !entry ? postLogEntry : putLogEntry;
    const success = await httpCall(newEntry);
    if (success) {
      onFinished();
    }
  }
</script>

<div class="wrapper">
  <div class="right">
    <TransparentButton onclick={onFinished} Icon={CrossIcon} />
  </div>

  <div id="intro-info" class="apart">
    {#if thumbnailSrc}
      <img src={thumbnailSrc} alt={"picture of " + trackable.name} />
    {:else}
      <div class="image-placeholder">No image available</div>
    {/if}

    <form onsubmit={handleSubmit}>
      <h3>{trackable.name}</h3>
      <!-- <span>{food.brand}</span> -->
      <span>{trackable.author}</span>

      <div>
        <label for="quantity">Amount: </label>
        <input type="number" name="quantity" bind:value={quantity} />
        <span>{`(${totalSize} ${unit}`}</span>
      </div>

      <div>
        <label for="serving">Serving: </label>
        <select name="serving" bind:value={selectedServing}>
          {#each servings as serving}
            <!-- TODO system serving je zatim jen v g, takze potreba prepsat na ml, ale zaroven nemuzu pridat obe kazdemu foodu -->
            <option value={serving}>{serving.name}</option>
          {/each}
        </select>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {#if isSubmitting}
          Saving...
        {:else}
          {entry ? "Update" : "Add"}
        {/if}
      </button>
    </form>
  </div>

  <hr />

  <!-- <NutritionalInfo
    grams={quantity * (selectedServing?.size ?? 0)}
    macros={food.macronutrients}
    micros={food.micronutrients}
  /> -->

  <hr />

  <div>
    <span>daily target graph fill</span>
  </div>
</div>

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

  .wrapper {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    justify-content: stretch;
    gap: 0.5rem;
  }

  #intro-info {
    height: 12rem;
    min-width: 0;
    gap: 1rem;
  }

  #intro-info > img {
    flex: 1;
    height: 100%;
    object-fit: contain;
    min-width: 0;
  }
</style>
