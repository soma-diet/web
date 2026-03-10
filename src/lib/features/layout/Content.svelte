<script lang="ts">
  import type { Trackable, LogEntry, Food } from "../../model";
  import DailyLog from "../log/DailyLog.svelte";
  import LogTrackable from "../log/LogTrackable.svelte";
  import FoodSearch from "../search/FoodSearch.svelte";

  let selectedTrackableItem = $state<Trackable | null>(null);
  let selectedLogEntry = $state<LogEntry | null>(null);
</script>

<main>
  <section class="side-view">
    <FoodSearch
      onItemSelected={(item: Food) => (selectedTrackableItem = item)}
    />
    <!-- <AddFoodForm /> -->
  </section>
  <section class="main-view">
    {#if !selectedTrackableItem && !selectedLogEntry}
      <!-- <PostLogEntryTest /> -->
      <DailyLog
        onItemSelected={(entry: LogEntry) => {
          selectedLogEntry = entry;
          selectedTrackableItem = entry.item;
        }}
      />
    {:else if selectedTrackableItem && !selectedLogEntry}
      {#key selectedTrackableItem.id}
        <LogTrackable
          trackable={selectedTrackableItem}
          onCancel={() => (selectedTrackableItem = null)}
        />
      {/key}
    {:else if selectedTrackableItem && selectedLogEntry}
      {#key selectedLogEntry.id}
        <LogTrackable
          trackable={selectedTrackableItem}
          editedEntry={selectedLogEntry}
          onCancel={() => {
            selectedTrackableItem = null;
            selectedLogEntry = null;
          }}
        />
      {/key}
    {/if}
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
