<!-- Center section displaying DailyLog and forms for adding and updating log entries. -->
<script setup lang="ts">
import { useLogSelectionStore } from "@/lib/stores";
import type { LogEntry } from "../../model";
import LogEntryForm from "./crud/LogEntryForm.vue";
import DailyLog from "./overview/DailyLog.vue";

const { logSelectionState, closeLogForm, openLogForm } = useLogSelectionStore();

const showOverview = () => closeLogForm();
const showEdit = (entry: LogEntry) => openLogForm(entry.item, entry);
</script>

<template>
  <LogEntryForm v-if="logSelectionState.activeLogSelection" @finished="showOverview"
    :trackable="logSelectionState.activeLogSelection.trackable"
    :entry="logSelectionState.activeLogSelection.entry ?? undefined" />
  <DailyLog v-else @itemSelected="showEdit" />
</template>
