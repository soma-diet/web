<script setup lang="ts">
interface Props {
    label: string;
    name: string;
}

const props = withDefaults(defineProps<Props>(), {
    label: "Upload a file"
});
</script>

<template>
    <label :for="props.name">{{ props.label }}</label>
    <input type="file" :name="props.name" />
</template>
