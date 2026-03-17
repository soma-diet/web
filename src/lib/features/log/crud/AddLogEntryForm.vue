<script setup lang="ts">
import { postLogEntry } from '@/lib/api';
import { createLogEntryRequest, type Trackable } from '@/lib/model';

const props = defineProps<{
  trackable: Trackable
}>();

const emit = defineEmits<{
  (e: "finished"): void
}>();

async function createLogEntry(quantity: number, servingId: string | null, callback: () => void) {
  const newEntryRequest = createLogEntryRequest(props.trackable.id, servingId, quantity);
  const success = await postLogEntry(newEntryRequest);
  // TODO pokud success false, mohl by dat pres callback funkci informace proc selhalo a pak by UI mohlo vykreslit
  emit("finished");
  callback();
  // const newEntry = !props.entry
  //   ? createLogEntry(props.trackable, selectedServing.value, quantity.value)
  //   : { ...props.entry, quantity: quantity.value, servingId: selectedServing.value.id };
  // const httpCall = !props.entry ? postLogEntry : putLogEntry;
  // console.log(newEntry, selectedServing.value);
  // const success = await httpCall(newEntry);
  // if (success) {
  //   emit("finished");
  // }
}
</script>

<template>
  <LogEntryFormView @cancel="emit('finished')" @submit="createLogEntry" :trackable="trackable" />
</template>