<script setup lang="ts">
import { TrackableType } from "../../model";
import FoodIcon from "../icon/FoodIcon.vue"; // Přidán import (uprav cestu dle potřeby)
import RecipeIcon from "../icon/RecipeIcon.vue"; // Přidán import (uprav cestu dle potřeby)
import SwipeableItem from "./SwipeableItem.vue"; // Import tvé nové swipe komponenty

interface Props {
  name: string;
  subtext?: string;
  itemType: TrackableType;
  kcal?: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "onedit"): void,
  (e: "ondelete"): void
}>();
</script>

<template>
  <SwipeableItem directions="both" @swipe-left="emit('onedit')" @swipe-right="emit('ondelete')">
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

    <button class="wrapper">
      <div class="row left">
        <FoodIcon v-if="props.itemType == TrackableType.FOOD"></FoodIcon>
        <RecipeIcon v-if="props.itemType == TrackableType.RECIPE"></RecipeIcon>

        <div class="details">
          <h5 class="item-name">
            {{ props.name }}
          </h5>
          <span>{{ props.subtext }}</span>
        </div>
      </div>
      <span v-if="props.kcal">{{ props.kcal }} kcal</span>
    </button>
  </SwipeableItem>
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

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;
  gap: 1em;
  background-color: var(--tertiary-color);
  width: 100%;
  border: none;
}

.wrapper:hover {
  cursor: pointer;
  background-color: var(--quadratery-color);
}

.wrapper:hover span {
  color: var(--secondary-color);
}

span {
  color: var(--subtle-color);
  font-size: 80%;
}

.wrapper>span {
  white-space: nowrap;
}

button>div {
  gap: 0.5rem;
  min-width: 0;
}

.details {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0.25em;
  min-width: 0;
}

.item-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin: 0;
}
</style>