<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useDrawGraph } from "./composables/graph.composable";

const props = defineProps<{
  name: string;
  days: string[];
  values: number[];
}>();

const { createBarGraphSvg } = useDrawGraph();
const graphWrap = ref<HTMLElement | null>(null);
onMounted(() => {
  if (graphWrap.value) {
    graphWrap.value.innerHTML = "";
    const graph = createBarGraphSvg(props.days, props.values);
    graphWrap.value?.append(graph);
  }
});
</script>

<template>
  <h3 class="accent-heading">{{ name }}</h3>
  <div ref="graphWrap" class="graph"></div>
</template>

<style scoped>
.graph {
  width: 100%;
  min-width: 0;
}

/* pristoupit k svg elementu grafu (vue) */
.graph :deep(svg) {
  width: 100%;
  height: auto;

  text {
    font-size: 0.75rem;
    font-family: var(--font-data);
  }

  rect {
    fill: var(--color-accent-light);
  }

  .value {
    fill: var(--text-main);
  }
  .date {
    fill: var(--text-dim);
  }
}
</style>
