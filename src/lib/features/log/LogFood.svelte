<script lang="ts">
  import type { Food, LogEntry, Serving } from "../../model";
  import TransparentButton from "../ui/action/TransparentButton.svelte";
  import NutritionalInfo from "./info/NutritionalInfo.svelte";

  import CrossIcon from "../ui/icon/CrossIcon.svelte";
  import { getImage, SomaImageSize } from "../../utils/image.util";
  import { createLogEntry } from "../../model/log-entry.model";
  import { postLogEntry } from "../../api";
  import LogEntryForm from "./add/LogEntryForm.svelte";
  import { getWithSystemServings } from "../../constants/system-servings.const";

  interface Props {
    food: Food;
    editedEntry?: LogEntry | null;
    onCancel: () => null;
  }
  let { food: food, editedEntry = null, onCancel }: Props = $props();

  let foodThumbnailSrc = $derived(
    food.imageFilename ? getImage(food.imageFilename, SomaImageSize.LARGE) : "",
  );

  let servings = $derived(getWithSystemServings(food));

  let quantity = $state<number>(100);
  let selectedServing = $derived<Serving>(servings[0]);

  async function addFood() {
    const logEntry: LogEntry = createLogEntry(food, selectedServing, quantity);

    try {
      const success = await postLogEntry(logEntry);
      if (!success) {
        throw new Error("Failed to log food");
      }
      onCancel(); // close menu
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  }
</script>

<div class="wrapper">
  <div class="row right">
    <TransparentButton onclick={() => onCancel()} Icon={CrossIcon} />
  </div>
  <div id="intro-info" class="apart">
    <img src={foodThumbnailSrc} alt={"picture of " + food.name} />
    <LogEntryForm
      {food}
      onSubmitTask={addFood}
      bind:quantity
      bind:selectedServing
    />
  </div>
  <hr />
  {#if food}
    <NutritionalInfo
      grams={quantity * selectedServing.size}
      // TODO zatim i presto ze zobrazuje servings v ml, tak nutritional je na gramy? vubec nevim jak to funguje
      macros={food.macronutrients}
      micros={food.micronutrients}
    />
  {/if}
  <hr />
  <div>
    <!-- TODO daily target graph -->
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
