<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

const emit = defineEmits(["swipe-left", "swipe-right"]);
const props = defineProps<{
  leftAction?: boolean,
  rightAction?: boolean
}>();

const TRIGGER_THRESHOLD_PX = 50; // dragged pixels for action to be performed
const MAX_DRAG_PX = 60;

const isDragging = ref(false);
const startX = ref(0);
const currentX = ref(0);

// #region DRAGGING
// utils
const getPosX = (event: MouseEvent | TouchEvent) => 'touches' in event ? event.touches[0]!.clientX : event.clientX;

const startDrag = (event: MouseEvent | TouchEvent) => {
  isDragging.value = true;

  // get origin X position
  startX.value = getPosX(event);

  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchmove', onDrag, { passive: false }); // passive false potreba aby nescrolloval pri tazeni do strany
  window.addEventListener('touchend', stopDrag);
};

// dragging
const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;

  let deltaX = getPosX(event) - startX.value;

  if (props.leftAction && props.rightAction) {
    deltaX = Math.max(-MAX_DRAG_PX, Math.min(MAX_DRAG_PX, deltaX));
  } else if (props.leftAction) {
    deltaX = Math.max(-MAX_DRAG_PX, Math.min(0, deltaX));
  } else {
    deltaX = Math.min(MAX_DRAG_PX, Math.max(0, deltaX));
  }

  currentX.value = deltaX;
};
const stopDrag = () => {
  if (!isDragging.value) return;
  isDragging.value = false;

  // activate on triggered
  if (currentX.value > TRIGGER_THRESHOLD_PX) {
    // drag RIGHT
    emit('swipe-right');
  } else if (currentX.value < -TRIGGER_THRESHOLD_PX) {
    // drag LEFT
    emit('swipe-left');
  }

  currentX.value = 0;

  // remove event listeners when drag ends
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('touchmove', onDrag);
  window.removeEventListener('touchend', stopDrag);
};
//#endregion

onUnmounted(() => stopDrag());
</script>

<template>
  <div class="swipe-container">
    <div class="swipe-action left-action" :class="{ 'active': currentX > TRIGGER_THRESHOLD_PX }">
      <slot name="action-right"></slot>
    </div>

    <div class="swipe-action right-action" :class="{ 'active': currentX < -TRIGGER_THRESHOLD_PX }">
      <slot name="action-left"></slot>
    </div>

    <div class="swipe-content" :class="{ 'dragging': isDragging }" @mousedown="startDrag" @touchstart="startDrag">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dragging {
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

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

  user-select: none;
  touch-action: pan-y;
  cursor: grab;

  /* CSS TRANSFORMACE */
  /* Posune content o X pixelu vypocitanych z rozdilu vzdalenosti mysi po uvodnim kliknuti */
  transform: translateX(calc(v-bind(currentX) * 1px));
}

.swipe-content:active {
  cursor: grabbing;
}
</style>