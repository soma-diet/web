<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';

const props = defineProps<{
  duration: number,
  delay: number,
  linear?: boolean
}>();

const PERSPECTIVE = 40;

const perspectiveCss = `${PERSPECTIVE}rem`;
const durationCss = computed(() => `${props.duration}s`);
const tweenStyle = computed(() => props.linear ? 'linear' : 'ease-in-out');

const getRandomRotation = () => {
  return {
    x: Math.random() * 0.04,
    y: Math.random(),
    z: Math.random() * 0.02
  };
};

const rotation = ref(getRandomRotation());
const active = ref(false);

let initialDelayId: ReturnType<typeof setTimeout>;
let intervalId: ReturnType<typeof setInterval>;
let timeoutId: ReturnType<typeof setTimeout>;

function clearAllTimers() {
  clearTimeout(initialDelayId);
  clearTimeout(timeoutId);
  clearInterval(intervalId);
}

function animationCycle() {
  active.value = false;

  // potreba mini block na restart animace
  setTimeout(() => {
    rotation.value = getRandomRotation();
    active.value = true;

    timeoutId = setTimeout(() => {
      active.value = false;
    }, props.duration * 1000);
  }, 0);
}

function startAnimation(immediate: boolean) {
  clearAllTimers();

  const startLoop = () => {
    animationCycle();
    intervalId = setInterval(animationCycle, (props.duration + props.delay) * 1000);
  };

  if (immediate) {
    startLoop();
  } else {
    initialDelayId = setTimeout(startLoop, props.delay * 1000);
  }
}

watch(() => [props.duration, props.delay], () => {
  startAnimation(true);
});

onMounted(() => {
  startAnimation(false);
});

onUnmounted(() => {
  clearAllTimers();
});
</script>

<template>
  <SomaLogoIcon class="highlight" :class="{ 'rotation': active }" />
</template>

<style scoped>
.rotation {
  animation-name: spin;
  animation-duration: v-bind("durationCss");
  animation-direction: normal;
  animation-timing-function: v-bind("tweenStyle");

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