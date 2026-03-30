<script setup lang="ts">
import { useAlerts } from "@/composables/alert.composable";
import { useLog } from "@/composables/log.composable";
import { type LogEntry, type Trackable } from "@/model";
import LogEntryFormView from "./LogEntryFormView.vue";

const props = defineProps<{
  trackable: Trackable;
  entry: LogEntry;
}>();

const emit = defineEmits<{
  (e: "finished"): void;
}>();

const { updateLogEntry } = useLog();

async function submitUpdatedEntry(
  quantity: number,
  servingId: string | null,
  date: Date,
  callback: () => void,
) {
  try {
    await updateLogEntry(props.entry, quantity, servingId, date);
    emit("finished");
  } finally {
    callback();
  }
}
</script>

<template>
  <LogEntryFormView
    @cancel="emit('finished')"
    @submit="submitUpdatedEntry"
    :trackable="trackable"
    :entry="entry"
  />
</template>
