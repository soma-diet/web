<script lang="ts">
  import { type Food, TrackableType } from "../../../model";
  import LogItem from "../../../ui/list/LogItem.svelte";

  // prijmout itemy z rodice
  let { items = [] as Food[], onLoadMore, onItemSelected } = $props();

  function handleScroll(e: Event) {
    const el = e.target as HTMLElement;

    // vypocet toho zda uz doscrolloval dolu
    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 200;
    if (isBottom && onLoadMore) {
      setTimeout(onLoadMore, 50);
    }
  }
</script>

<ul onscroll={handleScroll}>
  <hr />
  {#if items.length > 0}
    {#each items as item}
      <li>
        <LogItem
          name={item.name}
          subtext={item.brand ?? ""}
          kcal={item.macronutrients.kcal}
          itemType={TrackableType.FOOD}
          onclick={() => onItemSelected(item)}
        />
      </li>
      <hr />
    {/each}
  {/if}
</ul>

<style>
  ul {
    flex-grow: 1;
    overflow-y: auto;
  }

  hr {
    border: 1px solid var(--secondary-color);
  }
</style>
