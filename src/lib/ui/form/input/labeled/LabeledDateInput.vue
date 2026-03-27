<script setup lang="ts">
import { makeDateFromDateString, makeInputDateString } from '@/lib/utils/date.util';
import { computed, useId, watch } from 'vue';

const id = useId();

const props = defineProps<{
  label: string,
  required?: boolean
}>()

const dateModel = defineModel<Date>();
const dateInput = computed<string>({
  get() {
    if (!dateModel.value) return '';
    return makeInputDateString(dateModel.value);
  },
  set(inputValue) {
    if (!inputValue) {
      dateModel.value = new Date(); // pokud smaze date resetovat na dnesni datum
      return;
    }
    dateModel.value = makeDateFromDateString(inputValue);
  }
});
watch(dateInput, (newVal: string) => console.log(newVal), { immediate: true });

const todayDate = new Date();
const maxDateCap: string = makeInputDateString(todayDate);
</script>

<template>
  <label :id="id" class="accent-heading">{{ props.label }}</label>
  <input :id="id" :max="maxDateCap" :required="required" v-model="dateInput" type="date" class="input-field" />
</template>

<style>
input {
  color: var(--text-main);
  background-color: var(--bg-surface);
}

input:focus {
  border-color: var(--color-accent);
}
</style>