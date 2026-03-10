<!-- Center section displaying DailyLog and forms for adding and updating log entries. -->
<script lang="ts">
  import type { LogEntry } from "../../model";
  import {
    activeLogSelection,
    closeLogForm,
    openLogForm,
  } from "../../stores/ui.store";
  import LogEntryForm from "./crud/LogEntryForm.svelte";
  import DailyLog from "./overview/DailyLog.svelte";

  const isOnOverview = $derived(!$activeLogSelection);

  const showOverview = () => closeLogForm();
  const showEdit = (entry: LogEntry) => openLogForm(entry.item, entry);
</script>

{#if isOnOverview}
  <DailyLog onItemSelected={showEdit} />
{:else if $activeLogSelection}
  <LogEntryForm
    onFinished={showOverview}
    trackable={$activeLogSelection.trackable}
    entry={$activeLogSelection.entry ?? undefined}
  />
{/if}
