<!-- Center section displaying DailyLog and forms for adding and updating log entries. -->
<script setup lang="ts">
import { useLogSelectionStore } from "@/lib/stores";
import type { LogEntry } from "../../model";
import LogEntryForm from "./crud/LogEntryForm.vue";
import DailyLog from "./overview/DailyLog.vue";

const logSelectionStore = useLogSelectionStore();

const showOverview = () => logSelectionStore.closeLogForm();
const showEdit = (entry: LogEntry) => logSelectionStore.openLogForm(entry.item, entry);
</script>

<template>
  <LogEntryForm v-if="logSelectionStore.activeLogSelection" @finished="showOverview"
    :trackable="logSelectionStore.activeLogSelection.trackable"
    :entry="logSelectionStore.activeLogSelection.entry ?? undefined" />
  <DailyLog v-else @itemSelected="showEdit" />
</template>
