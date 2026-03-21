<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  duration: number,
  delay: number
}>();

const PERSPECTIVE = 40;

const perspectiveCss = `${PERSPECTIVE}rem`
const durationCss = `${props.duration}s`;

const getRandomRotation = () => {
  return {
    x: Math.random() * 0.04,
    y: Math.random(),
    z: Math.random() * 0.02
  };
};

const rotation = ref(getRandomRotation());
const active = ref(false);
let intervalId: number;

function runAnimation() {
  active.value = true;
  rotation.value = getRandomRotation();
  setTimeout(() => active.value = false, props.duration * 1000);
}

onMounted(() => {
  setTimeout(() => {
    intervalId = setInterval(runAnimation, (props.duration + props.delay) * 1000);
    runAnimation();
  }, props.delay * 1000)
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <SomaLogoIcon :class="{ 'rotation': active }" />
</template>

<style scoped>
.rotation {
  animation-name: spin;
  animation-duration: v-bind("durationCss");
  animation-direction: normal;
  animation-timing-function: ease-in-out;

  transform-origin: center;
  transform-style: preserve-3d;
}

@keyframes spin {
  0% {
    transform: perspective(v-bind("perspectiveCss")) rotate3d(v-bind("rotation.x"), v-bind("rotation.y"), v-bind("rotation.z"), 0deg);
  }

  100% {
    transform: perspective(v-bind("perspectiveCss")) rotate3d(v-bind("rotation.x"), v-bind("rotation.y"), v-bind("rotation.z"), 360deg);
  }
}
</style>