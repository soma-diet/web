<script setup lang="ts">
import { useId } from "vue";

interface Props {
  label: string;
  type: string;
  step?: string;
  required?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
});
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
      class="input-field"
    />
  </div>
</template>

<style scoped>
div {
  gap: 0.5rem;
}
</style>
