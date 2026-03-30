<!-- Section for Targets and Graphs -->
<script setup lang="ts">
import TargetsForm from "./targets/TargetsForm.vue";
import GraphsOverview from "./graphs/GraphsOverview.vue";
import { useGraphsStore } from "@/stores/graph.store";

const { analysisSelectionState, closeTargetsForm } =
  useGraphsStore();
</script>

<template>
  <TargetsForm
    v-if="analysisSelectionState.targetsFormOpen"
    @finished="closeTargetsForm"
  />
  <GraphsOverview v-else />
</template>
