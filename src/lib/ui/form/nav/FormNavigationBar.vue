<script setup lang="ts">
const props = defineProps<{
  title?: string
}>();
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="row apart">
    <h2 class="upper">{{ props.title ?? "" }}</h2>
    <OutlineButton @click="emit('close')">
      <CrossIcon></CrossIcon>
    </OutlineButton>
  </div>
</template>