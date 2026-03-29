<script setup lang="ts">
import PrimaryButton from "@/ui/action/PrimaryButton.vue";

// HistoryAPI jednoduche vraceni zpet
function goBack() {
  window.history.back();
}
</script>

<template>
  <main>
    <section class="center middle">
      <h1 class="accent-heading">Page Not Found</h1>
      <PrimaryButton @click="goBack" class="safety-btn"
        >Return to safety</PrimaryButton
      >
    </section>
    <video
      preload="none"
      autoplay
      muted
      loop
      playsinline
      id="pattern-bg"
      src="/assets/video/topographic-pattern.mp4"
    ></video>
  </main>
</template>

<style scoped>
main {
  position: relative;

  section {
    width: 100%;
    gap: 1rem;
  }
  h1 {
    font-size: 250%;
  }
  video {
    opacity: 0.02;
    z-index: 0;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    object-fit: cover;
    pointer-events: none;

    @media print {
      display: none;
    }
  }

  .safety-btn {
    width: 30%;
  }
}
@media (max-width: 1000px) {
  h1 {
    font-size: 200%;
  }
}
</style>
