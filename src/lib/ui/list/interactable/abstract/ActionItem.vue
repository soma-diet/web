<script setup lang="ts">
import { computed, ref } from 'vue';

const emit = defineEmits(["click-left", "click-right"]);
const props = defineProps<{
  leftAction?: boolean,
  rightAction?: boolean
}>();

const SLIDE_DISTANCE = 60;
const ACTIVATION_FRACTION = 5;

const isHoveringLeft = ref(false);
const isHoveringRight = ref(false);
const checkHoverPosition = (event: MouseEvent) => {
  const element = event.currentTarget as HTMLElement;
  const rectangle = element.getBoundingClientRect();

  const activationPx = rectangle.width / ACTIVATION_FRACTION;
  isHoveringLeft.value = event.clientX - rectangle.left < activationPx;
  isHoveringRight.value = rectangle.right - event.clientX < activationPx;
}

const resetHover = () => {
  isHoveringLeft.value = false;
  isHoveringRight.value = false;
}

const activeLeft = computed(() => {
  return props.leftAction && isHoveringLeft.value;
})
const activeRight = computed(() => {
  return props.rightAction && isHoveringRight.value;
})

const activeSlideDist = computed(() => {
  if (activeLeft.value) return SLIDE_DISTANCE;
  if (activeRight.value) return -SLIDE_DISTANCE;
  return 0;
})
</script>

<template>
  <div class="swipe-container" @mousemove="checkHoverPosition" @mouseleave="resetHover">
    <button v-if="props.leftAction" class="swipe-action left-action" :class="{ 'active': activeLeft }"
      @click="emit('click-left')">
      <slot name="action-right"></slot>
    </button>

    <button v-if="props.rightAction" class="swipe-action right-action" :class="{ 'active': activeRight }"
      @click="emit('click-right')">
      <slot name="action-left"></slot>
    </button>

    <div class="swipe-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.swipe-container {
  position: relative;
  overflow: hidden;
  background-color: transparent;
}

/* zvyrazneni kdyz je triggernuta */
.swipe-action.active {
  opacity: 1;
}

.swipe-action {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  transition: opacity 0.2s;
  opacity: 0.5;
  padding: 0;
  border: 0;
}

.swipe-action:hover {
  cursor: pointer;
}

.left-action {
  left: 0;
  right: 50%;
}

.right-action {
  right: 0;
  left: 50%;
}

.swipe-content {
  position: relative;
  z-index: 1;
  width: 100%;

  /* CSS TRANSFORMACE */
  /* Posune content o X pixelu vypocitanych z rozdilu vzdalenosti mysi po uvodnim kliknuti */
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  transform: translateX(calc(v-bind(activeSlideDist) * 1px));
}
</style>