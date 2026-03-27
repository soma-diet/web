<script setup lang="ts">
import OutlineButton from '../../action/OutlineButton.vue';
import CrossIcon from '../../icon/CrossIcon.vue';

const props = defineProps<{
  title?: string
}>();
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="row apart center">
    <h2 class="upper">{{ props.title ?? "" }}</h2>
    <OutlineButton @click="emit('close')">
      <CrossIcon></CrossIcon>
    </OutlineButton>
  </div>
</template>