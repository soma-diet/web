<script setup lang="ts">
import { useMobile } from "@/lib/stores/mobile.store";
import { TrackableType } from "../../../model";

import { computed } from "vue";
import EditIcon from "../../icon/EditIcon.vue";
import TrashIcon from "../../icon/TrashIcon.vue";
import ActionItem from "./abstract/ActionItem.vue";
import SwipeableItem from "./abstract/SwipeableItem.vue";
import ItemDetails from "./components/ItemDetails.vue";

const props = defineProps<{
  name: string;
  subtext?: string;
  itemType: TrackableType;
  kcal?: number;
  leftAction?: boolean;
  rightAction?: boolean;
  index: number; // pro animaci
}>();

const emit = defineEmits<{
  (e: "click"): void;
  (e: "ondelete"): void;
  (e: "onedit"): void;
}>();

const { isMobile } = useMobile();

const animDelay = computed(() => `${props.index * 0.1}s`);

// MediaAPI sound effect
function handleDelete() {
  const deleteSound = new Audio("/assets/sound/delete-effect.mp3");
  deleteSound.volume = 0.2;
  deleteSound.playbackRate = 0.9;
  deleteSound.play();
  emit("ondelete");
}
</script>

<template>
  <SwipeableItem
    v-if="isMobile"
    :leftAction="leftAction"
    :rightAction="rightAction"
    @swipe-left="emit('onedit')"
    @swipe-right="handleDelete"
    class="animated"
  >
    <template #action-right>
      <TrashIcon class="action" />
    </template>

    <template #action-left>
      <EditIcon class="action" />
    </template>

    <ItemDetails
      :name="name"
      :subtext="subtext"
      :itemType="itemType"
      :kcal="kcal"
      @click="emit('click')"
    />
  </SwipeableItem>

  <ActionItem
    v-else
    :leftAction="leftAction"
    :rightAction="rightAction"
    @click-left="handleDelete"
    @click-right="emit('onedit')"
    class="animated"
  >
    <template #action-right>
      <TrashIcon class="action" />
    </template>

    <template #action-left>
      <EditIcon class="action" />
    </template>

    <ItemDetails
      :name="name"
      :subtext="subtext"
      :itemType="itemType"
      :kcal="kcal"
      @click="emit('click')"
    />
  </ActionItem>
</template>

<style scoped>
.action {
  margin: 0.5rem;
}

.animated {
  opacity: 0;
  animation: appearAnim 0.3s ease-out forwards;
  /* anim delay spocten nahore */
  animation-delay: v-bind(animDelay);
}

@keyframes appearAnim {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
