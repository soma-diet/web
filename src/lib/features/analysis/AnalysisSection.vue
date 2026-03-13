<!-- Section for Targets and Graphs -->
<script setup lang="ts">
import { ref } from "vue";
import { AnalysisView } from "./analysis.helper";
import TargetsForm from "./targets/TargetsForm.vue";

let view = ref<AnalysisView>(AnalysisView.TARGETS);

const showTargets = () => {
  view.value = AnalysisView.TARGETS;
};
const showGraphs = () => {
  view.value = AnalysisView.GRAPHS;
};
</script>

<template>
  <TargetsForm v-if="view === AnalysisView.TARGETS" @finished="showGraphs" />
  <button v-else-if="view === AnalysisView.GRAPHS" @click="showTargets">show targets</button>
  <span v-else>tady nic neni?????</span>
</template>
