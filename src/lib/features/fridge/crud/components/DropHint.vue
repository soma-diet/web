<script setup lang="ts">
import ImageIcon from '@/lib/ui/icon/ImageIcon.vue';

</script>

<template>
  <div class="col center middle outlined">
    <ImageIcon class="icon" />
  </div>
</template>

<style scoped>
div {
  margin: 1rem;
  height: 100%;
  opacity: 0.7;
  border-color: var(--color-accent);

  >.icon {
    color: var(--color-accent);
    width: 50%;
    height: auto;
  }
}
</style>