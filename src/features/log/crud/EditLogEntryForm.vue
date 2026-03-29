<script setup lang="ts">
import { LogEntryRequestDto, putLogEntry } from "@/api";
import { type LogEntry, type Trackable } from "@/model";
import LogEntryFormView from "./LogEntryFormView.vue";
import { useAlerts } from "@/composables/alert.composable";

const props = defineProps<{
  trackable: Trackable;
  entry: LogEntry;
}>();

const emit = defineEmits<{
  (e: "finished"): void;
}>();

const { scheduleAlert } = useAlerts();

async function updateLogEntry(
  quantity: number,
  servingId: string | null,
  date: Date,
  callback: () => void,
) {
  const newEntryRequest: LogEntryRequestDto = LogEntryRequestDto.updateRequest(
    props.entry,
    servingId,
    quantity,
    date,
  );

  try {
    await putLogEntry(newEntryRequest);
  } catch (_) {
    scheduleAlert("Updating a log entry failed. Please try again.");
  }
  emit("finished");
  callback();
}
</script>

<template>
  <LogEntryFormView
    @cancel="emit('finished')"
    @submit="updateLogEntry"
    :trackable="trackable"
    :entry="entry"
  />
</template>
