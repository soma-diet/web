<script setup lang="ts">
import { NUTRIENT_DISPLAY_NAMES } from "@/constants";
import { useGraphsStore } from "@/stores/graph.store";
import ListLoadingEffect from "@/ui/list/ListLoadingEffect.vue";
import ServerError from "@/ui/util/ServerError.vue";
import BarGraph from "./BarGraph.vue";

const { graphsState, isReloadingGraphs } = useGraphsStore();
</script>

<template>
  <div class="wrapper col">
    <div class="row apart center">
      <h2 class="section-title">Weekly summary</h2>
    </div>
    <ListLoadingEffect
      v-if="graphsState.isLoadingGraphs && !isReloadingGraphs"
    />
    <template
      v-else-if="
        (!graphsState.isLoadingGraphs || isReloadingGraphs) &&
        !graphsState.isFetchError
      "
    >
      <BarGraph
        v-for="[key, data] of graphsState.graphs"
        :key="key+data.values.reduce((a, b) => a + b)"
        :name="NUTRIENT_DISPLAY_NAMES[key] ?? key"
        :days="data.days"
        :values="data.values"
      />
    </template>
    <ServerError class="offcenter" v-else />
  </div>
</template>

<style scoped>
.wrapper {
  padding: 1.5rem;
  overflow-y: scroll;
  gap: 0.75rem;
  height: 100%;
}
</style>
