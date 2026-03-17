<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    label: string;
    name: string;
}

const props = withDefaults(defineProps<Props>(), {
    label: "Upload a file"
});

const emit = defineEmits<{
    (e: "fileChanged", event: Event): void,
}>();
</script>

<template>
    <label :for="props.name">{{ props.label }}</label>
    <input type="file" accept="image/*" :name="props.name" @change="(e: Event) => emit('fileChanged', e)" />
</template>
