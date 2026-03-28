<script setup lang="ts">
import type { DailySummary } from "@/lib/model";
import { ref } from "vue";
import BarGraph from "./components/BarGraph.vue";

const weeklySummary = ref<Map<string, DailySummary>>(new Map());
</script>

<template>
  <div class="wrapper col">
    <h2 class="upper">Graphs</h2>
    <BarGraph />
  </div>
</template>

<style scoped>
.wrapper {
  padding: 1.5rem;
}
</style>
