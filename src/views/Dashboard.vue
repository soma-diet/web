<script setup lang="ts">
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