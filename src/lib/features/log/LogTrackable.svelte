<script lang="ts">
  import { untrack } from "svelte";
  import type { Food, LogEntry, Serving, Trackable } from "../../model";
  import TransparentButton from "../ui/action/TransparentButton.svelte";
  import NutritionalInfo from "./info/NutritionalInfo.svelte";
  import CrossIcon from "../ui/icon/CrossIcon.svelte";
  import { getImage, SomaImageSize } from "../../utils/image.util";
  import { createLogEntry } from "../../model/entry.model";
  import { postLogEntry } from "../../api";
  import LogEntryForm from "./add/LogEntryForm.svelte";
  import { getWithSystemServings } from "../../constants/system-servings.const";

  interface Props {
    trackable: Trackable;
    editedEntry?: LogEntry | null;
    onCancel: () => void;
  }

  let { trackable, editedEntry = null, onCancel }: Props = $props();

  let thumbnailSrc = $derived(
    trackable?.imageFilename
      ? getImage(trackable.imageFilename, SomaImageSize.LARGE)
      : "",
  );

  const servings = $derived(getWithSystemServings(trackable));

  let quantity = $state<number>(untrack(() => editedEntry?.quantity ?? 100));

  // let selectedServing = $state<Serving | undefined>(
  //   untrack(() =>
  //     editedEntry
  //       ? servings.find((val) => val.id === editedEntry.id)
  //       : servings[0],
  //   ),
  // );
  let initialServing = untrack(() =>
    editedEntry
      ? servings.find((val) => val.id === editedEntry.id)
      : servings[0],
  );
  let selectedServing = $derived(initialServing ?? servings[0]);

  async function addFood() {
    if (!selectedServing) {
      alert("Cannot add food: Unknown serving type.");
      return;
    }

    const logEntry: LogEntry = createLogEntry(
      trackable,
      selectedServing,
      quantity,
    );

    try {
      const success = await postLogEntry(logEntry);
      if (!success) {
        throw new Error("Failed to log food.");
      }
      onCancel();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "An unexpected error occurred.");
    }
  }
</script>

<div class="wrapper">
  <div class="row right">
    <TransparentButton onclick={onCancel} Icon={CrossIcon} />
  </div>

  <div id="intro-info" class="apart">
    {#if thumbnailSrc}
      <img src={thumbnailSrc} alt={"picture of " + trackable.name} />
    {:else}
      <div class="image-placeholder">No image available</div>
    {/if}

    <LogEntryForm
      {trackable}
      onSubmitTask={addFood}
      bind:quantity
      bind:selectedServing
    />
  </div>

  <hr />

  <!-- {#if trackable.type }
    <NutritionalInfo
      grams={quantity * (selectedServing?.size ?? 0)}
      macros={food.macronutrients}
      micros={food.micronutrients}
    />
  {/if} -->

  <hr />

  <div>
    <span>daily target graph fill</span>
  </div>
</div>

<style>
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
