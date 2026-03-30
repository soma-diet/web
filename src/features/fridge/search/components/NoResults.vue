<script setup lang="ts">
import SadMagnifierIcon from "@/ui/icon/SadMagnifierIcon.vue";
</script>

<template>
  <article class="col center">
    <SadMagnifierIcon class="icon" />
    <h3 class="upper">No items found</h3>
    <p class="italic">
      Sorry, we can't find any items that match your query. Please try again.
    </p>
  </article>
</template>

<style scoped>
article {
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
