<script setup lang="ts">
import OutlineButton from "@/ui/action/OutlineButton.vue";

const props = defineProps<{
  label: string;
}>();
</script>
<template>
  <OutlineButton class="btn">
    <span class="row center wrapper">
      <span class="icon middle">
        <slot name="svg" />
      </span>
      <span class="label">{{ label }}</span>
    </span>
  </OutlineButton>
</template>

<style scoped>
.btn {
  width: 100%;
  padding: 1rem;
}
.label {
  font-size: 140%;
}
.wrapper {
  width: 100%;
  height: 100%;

  .icon {
    object-fit: contain;
  }

  .label {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
