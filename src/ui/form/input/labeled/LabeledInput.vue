<script setup lang="ts">
import { useId } from "vue";

const props = withDefaults(
  defineProps<{
    label: string;
    type: string;
    step?: string;
    required?: boolean;
    placeholder?: string;
    error?: string;
  }>(),
  {
    required: false,
  },
);
const model = defineModel<any>();

const inputId = useId();
</script>

<template>
  <div class="col left">
    <label :for="inputId" class="accent-heading">{{ props.label }}</label>
    <input
      :type="type"
      :id="inputId"
      :step="step"
      :required="required"
      :placeholder="placeholder"
      v-model="model"
      v-bind="$attrs"
      :class="{ invalid: error }"
      class="input-field"
    />
    <span v-if="error" class="error-text">{{ error }}</span>
  </div>
</template>

<style scoped>
input {
  margin: 0.5rem 0 0.1rem 0;
  font-size: 90%;
}

@media (min-width: 2560px) {
  input {
    font-size: 150%;
  }
}
</style>
