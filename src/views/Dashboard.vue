<script setup lang="ts">
import AnalysisSection from '@/lib/features/analysis/AnalysisSection.vue';
import FridgeSection from '@/lib/features/fridge/FridgeSection.vue';
import Header from '@/lib/features/layout/Header.vue';
import LogSection from '@/lib/features/log/LogSection.vue';

</script>

<template>
  <Header />
  <main>
    <section class="side-view bevel bevel-tr">
      <FridgeSection />
    </section>
    <section class="main-view bevel bevel-tl bevel-tr">
      <LogSection />
    </section>
    <section class="side-view bevel bevel-tl">
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