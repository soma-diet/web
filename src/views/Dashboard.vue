<script setup lang="ts">
import AnalysisSection from "@/lib/features/analysis/AnalysisSection.vue";
import FridgeSection from "@/lib/features/fridge/FridgeSection.vue";
import Header from "@/lib/features/layout/Header.vue";
import LogSection from "@/lib/features/log/LogSection.vue";
import { useTargetsStore } from "@/lib/stores";
import { useMobile } from "@/lib/stores/mobile.store";
import { onMounted } from "vue";

const { isMobile, isFridgeActive, isLogActive, isGraphsActive } = useMobile();
const { reloadTargets } = useTargetsStore();

onMounted(() => {
  reloadTargets();
});
</script>

<template>
  <Header />
  <main>
    <section
      v-if="isFridgeActive"
      :class="{ 'bevel-tl': isMobile }"
      class="side-view bevel bevel-tr"
    >
      <FridgeSection />
    </section>
    <section v-if="isLogActive" class="main-view bevel bevel-tl bevel-tr">
      <LogSection />
    </section>

    <section
      v-if="isGraphsActive"
      :class="{ 'bevel-tr': isMobile }"
      class="side-view bevel bevel-tl"
    >
      <AnalysisSection />
    </section>
  </main>
</template>

<style scoped>
section.side-view {
  flex: 2;
}

section.main-view {
  flex: 3;
}
</style>
