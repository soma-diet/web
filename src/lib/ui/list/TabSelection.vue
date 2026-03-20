<script setup lang="ts">
const selected = defineModel<string>();
const props = defineProps<{
  options?: string[]
}>();

const onOptionSelected = (opt: string) => selected.value = opt;
</script>

<template>
  <div>
    <button v-for="opt in props.options" :key="opt" :class="{ selected: opt == selected }"
      @click="onOptionSelected(opt)">
      {{ opt }}
    </button>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: row;
}

button {
  background-color: var(--tertiary-color);
  height: 2rem;
  width: 100%;
}

button:hover {
  background-color: var(--quadratery-color);
  cursor: pointer;
}

button.selected {
  background-color: var(--subtle-color);
}
</style>
