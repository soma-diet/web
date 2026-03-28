<script setup lang="ts">
import OutlineButton from "@/lib/ui/action/OutlineButton.vue";

const props = defineProps<{
  label: string;
}>();
</script>
<template>
  <OutlineButton class="btn">
    <div class="row center wrapper">
      <div class="icon">
        <slot name="svg" />
      </div>
      <span>{{ label }}</span>
    </div>
  </OutlineButton>
</template>

<style scoped>
.btn {
  width: 100%;
}
.wrapper {
  width: 100%;
  height: 100%;

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  span {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
