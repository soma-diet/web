<script setup lang="ts">
import { computed, ref } from "vue";
import { getWithSystemServings } from "../../../constants/system-servings.const";
import {
  type LogEntry,
  type Serving,
  type Trackable,
} from "../../../model";
import { CrossIcon } from "../../../ui/icon";
import { getImage, SomaImageSize } from "../../../utils/image.util";

const emit = defineEmits<{
  (e: "cancel"): void,
  (e: "submit", quantity: number, servingId: string | null, callback: () => void): void,
}>();

const props = defineProps<{
  trackable: Trackable;
  entry?: LogEntry;
}>();

const unit = "g";
const thumbnailSrc = computed(() =>
  props.trackable.imageFilename
    ? getImage(props.trackable.imageFilename, SomaImageSize.LARGE)
    : "/assets/no-img-placeholder.jpg");

// inputs
const quantity = ref<number>(props.entry?.quantity ?? 100);

// servings
const servings = computed(() => getWithSystemServings(props.trackable));
const systemServing = servings.value.find((serving: Serving) => serving.isSystem)!;
const entryServing = props.entry ? servings.value.find((s: Serving) => s.id === props.entry!.servingId) : null;
const selectedServing = ref<Serving>(
  entryServing ?? systemServing
);

// helpers
const totalSize = computed(() => quantity.value * selectedServing.value.size);
const isSubmitting = ref(false);

function handleSubmit() {
  isSubmitting.value = true;

  emit("submit", quantity.value, selectedServing.value.id, () => {
    isSubmitting.value = false;
  });
}
</script>

<template>
  <div class="wrapper col stretch-h">
    <div class="right">
      <OutlineButton type="button" @click="emit('cancel')">
        <CrossIcon />
      </OutlineButton>
    </div>

    <div class="intro-info apart center">
      <div class="food-thumbnail middle">
        <img :src="thumbnailSrc" :alt="'picture of ' + props.trackable.name" />
      </div>

      <form @submit.prevent="handleSubmit">
        <h3>{{ props.trackable.name }}</h3>
        <span>{{ props.trackable.author }}</span>

        <LabeledNumberInput label="Amount: " v-model:value="quantity" step="0.01" />

        <LabeledSelect label="Serving" v-model:selected="selectedServing"
          :options="servings.map(serving => ({ name: serving.name, value: serving }))" />

        <span>{{ `totals ${totalSize} ${unit}` }}</span>

        <PrimaryButton type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "saving.." : (props.entry ? "update" : "add") }}
        </PrimaryButton>
      </form>
    </div>

    <hr />
    <NutritionalInfo :key="props.trackable.id" :grams="totalSize" :macros="props.trackable.macronutrients"
      :micros="props.trackable.micronutrients" />
    <hr />

    <div>
      <span>daily target graph fill</span>
    </div>
  </div>
</template>

<style scoped>
form {
  flex: 1;
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
  text-align: end;
}

.wrapper {
  padding: 1.5rem;
  gap: 1rem;
}

.intro-info {
  min-width: 0;
  max-height: 20rem;
  gap: 1rem;
}

.food-thumbnail {
  flex: 1;
  max-height: 100%;
  border: 2px solid var(--border-main);
}

.food-thumbnail>img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
