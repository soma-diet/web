<script setup lang="ts">
import { LogEntryRequestDto, postLogEntry } from "@/api";
import { type Trackable } from "@/model";
import LogEntryFormView from "./LogEntryFormView.vue";
import { useAlerts } from "@/composables/alert.composable";

const props = defineProps<{
  trackable: Trackable;
  date?: Date;
}>();

const emit = defineEmits<{
  (e: "finished"): void;
}>();

const { scheduleAlert } = useAlerts();

async function createLogEntry(
  quantity: number,
  servingId: string | null,
  date: Date,
  callback: () => void,
) {
  const newEntryRequest = LogEntryRequestDto.createRequest(
    props.trackable.id,
    servingId,
    quantity,
    date,
  );

  try {
    await postLogEntry(newEntryRequest);
    emit("finished");
  } catch (_) {
    scheduleAlert("Adding a new log entry failed. Please try again.");
  } finally {
    callback();
  }
}
</script>

<template>
  <LogEntryFormView
    @cancel="emit('finished')"
    @submit="createLogEntry"
    :trackable="trackable"
    :initialLogDate="date"
  />
</template>
