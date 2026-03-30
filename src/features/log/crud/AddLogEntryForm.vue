<script setup lang="ts">
import { LogEntryRequestDto, postLogEntry } from "@/api";
import { type Trackable } from "@/model";
import LogEntryFormView from "./LogEntryFormView.vue";
import { useAlerts } from "@/composables/alert.composable";
import { useLogStore } from "@/stores";
import { useLog } from "@/composables/log.composable";

const props = defineProps<{
  trackable: Trackable;
}>();

const emit = defineEmits<{
  (e: "finished"): void;
}>();

const { createLogEntry } = useLog();
const { logSelectionState } = useLogStore();

function submitLogEntry(
  quantity: number,
  servingId: string | null,
  date: Date,
  callback: () => void,
) {
  createLogEntry(props.trackable.id, quantity, servingId, date)
    .then(() => {
      emit("finished");
    })
    .finally(() => {
      callback();
    });
}
</script>

<template>
  <LogEntryFormView
    @cancel="emit('finished')"
    @submit="submitLogEntry"
    :trackable="trackable"
    :initialLogDate="logSelectionState.logDate"
  />
</template>
