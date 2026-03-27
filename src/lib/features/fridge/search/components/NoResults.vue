<script setup lang="ts">
import SadMagnifierIcon from '@/lib/ui/icon/SadMagnifierIcon.vue';

</script>

<template>
  <div class="col center">
    <SadMagnifierIcon class="icon" />
    <h3 class="upper">No items found</h3>
    <p class="italic">Sorry, we can't find any items that match your query. Please try again.</p>
  </div>
</template>

<style scoped>
div {
  margin: 30% 15%;
  text-align: center;
}

h3 {
  margin-top: 1rem;
  margin-bottom: 0.25rem;
}

.icon,
h3 {
  color: var(--color-accent);
}

.icon {
  width: 50%;
  height: fit-content;
}
</style>