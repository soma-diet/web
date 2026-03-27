<script setup lang="ts">
import { LogEntryRequestDto, putLogEntry } from '@/lib/api';
import { type LogEntry, type Trackable } from '@/lib/model';

const props = defineProps<{
  trackable: Trackable,
  entry: LogEntry
}>();

const emit = defineEmits<{
  (e: "finished"): void
}>();

async function updateLogEntry(quantity: number, servingId: string | null, date: Date, callback: () => void) {
  const newEntryRequest: LogEntryRequestDto = LogEntryRequestDto.updateRequest(props.entry, servingId, quantity, date);
  const success = await putLogEntry(newEntryRequest);
  // TODO pokud success false, mohl by dat pres callback funkci informace proc selhalo a pak by UI mohlo vykreslit
  emit("finished");
  callback();
}
</script>

<template>
  <LogEntryFormView @cancel="emit('finished')" @submit="updateLogEntry" :trackable="trackable" :entry="entry" />
</template>