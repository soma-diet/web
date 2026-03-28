<!-- LabeledNumberInput -->
<script setup lang="ts">
import LabeledInput from "./LabeledInput.vue";

const props = withDefaults(
  defineProps<{
    label: string;
    name?: string;
    step?: string;
  }>(),
  {
    step: "0.1",
  },
);

const inputModel = defineModel<number | string | null>("value");
</script>

<template>
  <LabeledInput type="number" v-bind="props" v-model.number="inputModel" />
</template>
