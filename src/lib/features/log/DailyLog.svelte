<script lang="ts">
  import { SAMPLE_LOG_ENTRY } from "../../sample/log-entry.sample";
  import TransparentButton from "../ui/action/TransparentButton.svelte";
  import LogItem from "../ui/list/LogItem.svelte";

  import BackArrowIcon from "../ui/icon/BackArrowIcon.svelte";
  import ForwardArrowIcon from "../ui/icon/ForwardArrowIcon.svelte";
  import { getLogEntries } from "../../api/log/log.api";

  let entries = [SAMPLE_LOG_ENTRY];
  getLogEntries();
</script>

<nav class="apart center">
  <div class="left center">
    <TransparentButton
      onclick={() => null}
      Icon={BackArrowIcon}
      class="date-button"
    />
    <h3>03.06.2026</h3>
  </div>
  <TransparentButton
    onclick={() => null}
    Icon={ForwardArrowIcon}
    class="date-button"
  />
</nav>
<div>
  <span>daily targets progress bar</span>
</div>
<ul>
  <hr />
  {#each entries as entry}
    <li>
      <LogItem
        name={entry.itemName}
        subtext={`${entry.quantity} ${entry.servingName}`}
        itemType={entry.itemType}
      />
    </li>
    <hr />
  {/each}
</ul>

<style>
  nav {
    padding: 1rem;
  }

  :global(.date-button) {
    width: 2.5rem;
  }

  ul {
    flex-grow: 1;
    overflow-y: auto;
  }

  hr {
    border: 1px solid black;
  }
</style>
