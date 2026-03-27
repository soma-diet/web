<script setup lang="ts">
import RotatingSomaLogo from '@/lib/ui/animated/RotatingSomaLogo.vue';
</script>

<template>
  <main>
    <section class="bevel bevel-tr bevel-br f3 center middle">
      <h1 class="accent-heading">Page Not Found</h1>
      <span class="italic">how did you get here</span>
    </section>
    <section class="bevel bevel-tl bevel-bl f2 center middle">
      <video preload="none" autoplay muted loop playsinline id="pattern-bg"
        src="/assets/video/topographic-pattern.mp4"></video>
      <div class="logo-wrapper">
        <RotatingSomaLogo :duration="5" :delay="1" class="logo" />
      </div>
    </section>
  </main>
</template>

<style scoped>
h1 {
  font-size: 250%;
}

video {
  opacity: 0.1;
  z-index: -1;

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
}

.logo-wrapper {
  width: 65%;
}
</style>