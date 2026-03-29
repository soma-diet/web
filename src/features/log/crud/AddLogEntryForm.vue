<script setup lang="ts">
import { LogEntryRequestDto, postLogEntry } from "@/api";
import { type Trackable } from "@/model";
import LogEntryFormView from "./LogEntryFormView.vue";

const props = defineProps<{
  trackable: Trackable;
}>();

const emit = defineEmits<{
  (e: "finished"): void;
}>();

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
  const success = await postLogEntry(newEntryRequest);
  // TODO pokud success false, mohl by dat pres callback funkci informace proc selhalo a pak by UI mohlo vykreslit
  emit("finished");
  callback();
}
</script>

<template>
  <LogEntryFormView
    @cancel="emit('finished')"
    @submit="createLogEntry"
    :trackable="trackable"
  />
</template>
