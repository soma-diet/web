<script setup lang="ts">
import { useMobile } from "@/composables/use-mobile.composable";
import { TrackableType } from "../../../model";
import ItemDetails from "./components/ItemDetails.vue";

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
      <div class="action delete-action">
        <TrashIcon />
      </div>
    </template>

    <template #action-left>
      <div class="action edit-action">
        <EditIcon />
      </div>
    </template>

    <ItemDetails :name="name" :subtext="subtext" :itemType="itemType" :kcal="kcal" />
  </SwipeableItem>

  <ActionItem v-else :leftAction="leftAction" :rightAction="rightAction" @click-left="emit('ondelete')"
    @click-right="emit('onedit')">
    <template #action-right>
      <div class="action delete-action">
        <TrashIcon />
      </div>
    </template>

    <template #action-left>
      <div class="action edit-action">
        <EditIcon />
      </div>
    </template>

    <ItemDetails :name="name" :subtext="subtext" :itemType="itemType" :kcal="kcal" />
  </ActionItem>
</template>

<style scoped>
.action {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  /* padding urcuje v podstate velikost ikonky */
  padding: 0.75rem;
  color: var(--secondary-color);
}

.action svg {
  height: 100%;
  width: auto;
}

.edit-action {
  background-color: #23ee10;
  justify-content: flex-end;
}

.delete-action {
  background-color: #f44336;
  justify-content: flex-start;
}
</style>