<script setup lang="ts">
import { useId } from 'vue';

interface Props {
  label: string;
  type: string;
  step?: string;
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  required: false
});
const model = defineModel<any>();

const inputId = useId();
</script>

<template>
  <div>
    <label :for="inputId">{{ props.label }}</label>
    <input :type="props.type" :id="inputId" :step="props.step" :required="required" v-model="model" />
  </div>
</template>

<style scoped>
div {
  display: flex;
}

label {
  flex: 1;
}

input {
  flex: 2;
}
</style>
