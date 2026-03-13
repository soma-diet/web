<!-- LabeledNumberInput -->
<script setup lang="ts">
import LabeledInput from "./LabeledInput.vue";

interface Props {
  label: string;
  name?: string;
  step?: string;
}

// zklonovane props
const props = withDefaults(defineProps<Props>(), {
  step: "0.1"
})

const model = defineModel<number | string | null>();
</script>

<template>
  <LabeledInput type="number" v-bind="props" v-model.number="model" />
</template>
