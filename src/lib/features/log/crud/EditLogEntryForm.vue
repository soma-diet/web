<script setup lang="ts">
import { putLogEntry, type LogEntryRequestDto } from '@/lib/api';
import { createLogEntryRequuestWithExisting, type LogEntry, type Trackable } from '@/lib/model';

const props = defineProps<{
  trackable: Trackable,
  entry: LogEntry
}>();

const emit = defineEmits<{
  (e: "finished"): void
}>();

async function updateLogEntry(quantity: number, servingId: string | null, callback: () => void) {
  // const newEntryRequest = createLogEntryRequest(props.trackable.id, servingId, quantity);
  const newEntryRequest: LogEntryRequestDto = createLogEntryRequuestWithExisting(props.entry, servingId, quantity);
  const success = await putLogEntry(newEntryRequest);
  // TODO pokud success false, mohl by dat pres callback funkci informace proc selhalo a pak by UI mohlo vykreslit
  emit("finished");
  callback();
}
</script>

<template>
  <LogEntryFormView @cancel="emit('finished')" @submit="updateLogEntry" :trackable="trackable" :entry="entry" />
</template>