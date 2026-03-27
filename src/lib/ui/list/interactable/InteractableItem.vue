<script setup lang="ts">
import { useMobile } from "@/composables/use-mobile.composable";
import { TrackableType } from "../../../model";

import ItemDetails from "./components/ItemDetails.vue";
import SwipeableItem from "./abstract/SwipeableItem.vue";
import TrashIcon from "../../icon/TrashIcon.vue";
import EditIcon from "../../icon/EditIcon.vue";
import ActionItem from "./abstract/ActionItem.vue";

interface Props {
  name: string;
  subtext?: string;
  itemType: TrackableType;
  kcal?: number;
  leftAction?: boolean,
  rightAction?: boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "ondelete"): void,
  (e: "onedit"): void
}>();

const { isMobile } = useMobile();
</script>

<template>
  <SwipeableItem v-if="isMobile" :leftAction="leftAction" :rightAction="rightAction" @swipe-left="emit('onedit')"
    @swipe-right="emit('ondelete')">
    <template #action-right>
      <TrashIcon class="action" />
    </template>

    <template #action-left>
      <EditIcon class="action" />
    </template>

    <ItemDetails :name="name" :subtext="subtext" :itemType="itemType" :kcal="kcal" />
  </SwipeableItem>

  <ActionItem v-else :leftAction="leftAction" :rightAction="rightAction" @click-left="emit('ondelete')"
    @click-right="emit('onedit')">
    <template #action-right>
      <TrashIcon class="action" />
    </template>

    <template #action-left>
      <EditIcon class="action" />
    </template>

    <ItemDetails :name="name" :subtext="subtext" :itemType="itemType" :kcal="kcal" />
  </ActionItem>
</template>

<style scoped>
.action {
  margin: 0.5rem;
}
</style>