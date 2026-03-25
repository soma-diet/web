<!-- Section for Targets and Graphs -->
<script setup lang="ts">
import { useAnalysisSelectionStore } from "@/lib/stores/analysis-selection.store";
import TargetsForm from "./targets/TargetsForm.vue";

const { analysisSelectionState, closeTargetsForm } = useAnalysisSelectionStore();
</script>

<template>
  <TargetsForm v-if="analysisSelectionState.targetsFormOpen" @finished="closeTargetsForm" />
  <GraphsOverview v-else />
</template>
