<script setup lang="ts">
import { TrackableType } from '@/lib/model';

const props = defineProps<{
  name: string,
  itemType?: TrackableType,
  subtext?: string,
  kcal?: number
}>();
</script>

<template>
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
</template>

<style scoped>
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