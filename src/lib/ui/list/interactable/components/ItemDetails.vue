<script setup lang="ts">
import { TrackableType } from "@/lib/model";
import FoodIcon from "@/lib/ui/icon/FoodIcon.vue";
import RecipeIcon from "@/lib/ui/icon/RecipeIcon.vue";

const props = defineProps<{
  name: string;
  itemType?: TrackableType;
  subtext?: string;
  kcal?: number;
}>();

const emit = defineEmits(["click"]);
</script>

<template>
  <button class="apart center" @click="emit('click')">
    <div class="left center details">
      <FoodIcon
        class="icon"
        v-if="props.itemType == TrackableType.FOOD"
      ></FoodIcon>
      <RecipeIcon
        class="icon"
        v-else-if="props.itemType == TrackableType.RECIPE"
      ></RecipeIcon>

      <div class="col left info">
        <h6 class="item-name">{{ props.name }}</h6>
        <span class="meta">{{ props.subtext }}</span>
      </div>
    </div>

    <div v-if="props.kcal" class="col right nutrient-data">
      <span class="value">{{ props.kcal }}</span>
      <span class="unit">KCAL</span>
    </div>
  </button>
</template>

<style scoped>
button {
  padding: 0.85rem 1rem;

  background-color: var(--bg-body);

  width: 100%;
  height: 4rem;

  border: none;
  border-bottom: 1px solid var(--border-dim);

  text-align: left;
  cursor: pointer;
}
button:hover {
  background-color: var(--bg-surface);
}

.details {
  gap: 1rem;
  min-width: 0;
}

.icon {
  color: var(--color-accent);
  width: 2.5rem;
  min-width: 2.5rem;
  height: 2.5rem;
  opacity: 0.9;
}

.info {
  gap: 0.15rem;
}

.item-name {
  font-size: 105%;
}

.meta {
  font-size: 80%;
  color: var(--text-dim);
  letter-spacing: 0.05em;
}

.nutrient-data {
  text-align: right;
  gap: 0.15rem;
}

.value {
  font-size: 120%;
  font-weight: 700;
}

.unit {
  font-size: 60%;
  color: var(--color-accent);
  letter-spacing: 0.125rem;
}

@media (min-width: 1920px) {
  button {
    height: 6rem;
  }
  .item-name {
    font-size: 150%;
  }
  .meta {
    font-size: 1rem;
  }
}
</style>
