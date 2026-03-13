<script setup lang="ts">
interface Props {
    placeholder?: string,
}
const props = defineProps<Props>();
const model = defineModel<string>();
</script>

<template>
    <input type="text" :placeholder="props.placeholder" v-model="model" />
</template>

<style scoped>
input {
    background-color: var(--tertiary-color);
    height: 3rem;

    border-radius: 0.5em;
    border: none;
    padding: 0 1rem;
    margin: 0.5rem;
    outline: none;
}
</style>
