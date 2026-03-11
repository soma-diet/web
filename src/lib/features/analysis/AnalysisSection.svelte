<!-- Section for Targets and Graphs -->
<script lang="ts">
  import { AnalysisView } from "./analysis.helper";
  import TargetsForm from "./targets/TargetsForm.svelte";

  let view = $state<AnalysisView>(AnalysisView.TARGETS);

  const showTargets = () => {
    view = AnalysisView.TARGETS;
  };
  const showGraphs = () => {
    view = AnalysisView.GRAPHS;
  };
</script>

{#if view === AnalysisView.TARGETS}
  <TargetsForm onFinished={showGraphs} />
{:else if view === AnalysisView.GRAPHS}
  <button onclick={showTargets}>show targets</button>
  <span>tady budou grafy</span>
{/if}
