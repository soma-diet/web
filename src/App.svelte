<script lang="ts">
  import AuthPrompt from "./lib/features/auth/AuthPrompt.svelte";
  import Header from "./lib/features/layout/Header.svelte";
  import DailyLog from "./lib/features/log/DailyLog.svelte";
  import LogTrackable from "./lib/features/log/LogTrackable.svelte";
  import FoodSearch from "./lib/features/search/FoodSearch.svelte";
  import type { Trackable, LogEntry, Food } from "./lib/model";
  import { authLoading, authUser, isLoggedIn } from "./lib/stores/auth.store";

  let selectedTrackableItem = $state<Trackable | null>(null);
  let selectedLogEntry = $state<LogEntry | null>(null);
</script>

{#if $authLoading || !$isLoggedIn}
  <AuthPrompt />
{/if}

<div id="content">
  <Header />
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
</div>

<style>
  #content {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1px;
    height: 100%;
    width: 100%;
    background-color: var(--border-color);
  }

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
