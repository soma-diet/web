<script setup lang="ts">
import { makeDateFromDateString, makeDateString } from "@/utils/date.util";
import { computed, useId } from "vue";

const id = useId();

const props = defineProps<{
  label: string;
  required?: boolean;
}>();

const dateModel = defineModel<Date>();
const dateInput = computed<string>({
  get() {
    if (!dateModel.value) return "";
    return makeDateString(dateModel.value);
  },
  set(inputValue) {
    if (!inputValue) {
      dateModel.value = new Date(); // pokud smaze date resetovat na dnesni datum
      return;
    }
    dateModel.value = makeDateFromDateString(inputValue);
  },
});

const todayDate = new Date();
const maxDateCap: string = makeDateString(todayDate);
</script>

<template>
  <label :for="id" class="accent-heading">{{ props.label }}</label>
  <input
    :id="id"
    :max="maxDateCap"
    :required="required"
    v-model="dateInput"
    type="date"
    class="input-field"
  />
</template>

<style>
input {
  color: var(--text-main);
  background-color: var(--bg-surface);
}

input:focus {
  border-color: var(--color-accent);
}

@media (min-width: 2560px) {
  input {
    font-size: 150%;
  }
}
</style>
