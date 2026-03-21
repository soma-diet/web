<script setup lang="ts">
import { computed, useId } from 'vue';

const selected = defineModel<any>("selected", { required: true });

interface Option {
  name: string,
  value: any
}
const props = defineProps<{
  label: string,
  options: Option[]
}>();

const selectId = useId();
</script>

<template>
  <div>
    <label :for="selectId">{{ props.label }}</label>
    <select :id="selectId" v-model="selected">
      <option v-for="(opt, index) in options" :key="index" :value="opt.value">{{ opt.name }}</option>
    </select>
  </div>
</template>

<style scoped>
div {
  display: flex;
}

label {
  flex: 1;
}

select {
  flex: 2;
}
</style>