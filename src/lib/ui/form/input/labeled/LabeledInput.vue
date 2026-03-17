<script setup lang="ts">
interface Props {
  label: string;
  name?: string;
  type: string;
  step?: string;
}

const props = defineProps<Props>();
const model = defineModel<string | number | null>();
</script>

<template>
  <div>
    <label :for="props.name">{{ props.label }}</label>
    <input :type="props.type" :name="props.name" :id="props.name" :step="props.step" v-model="model" />
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
