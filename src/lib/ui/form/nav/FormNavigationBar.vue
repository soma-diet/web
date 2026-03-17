<script setup lang="ts">
const props = defineProps<{
  title?: string
}>();
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="row apart">
    <h2>{{ props.title ?? "" }}</h2>
    <TransparentButton @click="emit('close')">
      <CrossIcon></CrossIcon>
    </TransparentButton>
  </div>
</template>