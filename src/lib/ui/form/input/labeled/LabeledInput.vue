<script setup lang="ts">
interface Props {
  label: string;
  name?: string;
  type: string;
  step?: string;
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  required: false
});
const model = defineModel<any>();
</script>

<template>
  <div>
    <label :for="props.name">{{ props.label }}</label>
    <input :type="props.type" :name="props.name" :id="props.name" :step="props.step" :required="required"
      v-model="model" />
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
