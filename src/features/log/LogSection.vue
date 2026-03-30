<!-- Center section displaying DailyLog and forms for adding and updating log entries. -->
<script setup lang="ts">
import { useLogSelectionStore, useSummaryStore } from "@/stores";
import DailyLog from "./overview/DailyLog.vue";
import AddLogEntryForm from "./crud/AddLogEntryForm.vue";
import EditLogEntryForm from "./crud/EditLogEntryForm.vue";
import type { LogEntry } from "@/model";

const { logSelectionState, closeLogForm, openLogForm } = useLogSelectionStore();
const { summaryState } = useSummaryStore();

const showOverview = () => closeLogForm();
const showEdit = (entry: LogEntry) => openLogForm(entry.item, entry);
</script>

<template>
  <DailyLog
    v-if="!logSelectionState.activeLogSelection"
    @itemSelected="showEdit"
  />
  <AddLogEntryForm
    v-else-if="!logSelectionState.activeLogSelection.entry"
    @finished="showOverview"
    :trackable="logSelectionState.activeLogSelection.trackable"
    :date="summaryState.selectedDate"
  />
  <EditLogEntryForm
    v-else="!logSelectionState.activeLogSelection.entry"
    @finished="showOverview"
    :trackable="logSelectionState.activeLogSelection.trackable"
    :entry="logSelectionState.activeLogSelection.entry"
  />
</template>
