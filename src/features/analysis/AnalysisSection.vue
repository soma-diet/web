<!-- Section for Targets and Graphs -->
<script setup lang="ts">
import { useAnalysisSelectionStore } from "@/stores/analysis-selection.store";
import TargetsForm from "./targets/TargetsForm.vue";
import GraphsOverview from "./graphs/GraphsOverview.vue";

const { analysisSelectionState, closeTargetsForm } =
  useAnalysisSelectionStore();
</script>

<template>
  <TargetsForm
    v-if="analysisSelectionState.targetsFormOpen"
    @finished="closeTargetsForm"
  />
  <GraphsOverview v-else />
</template>
