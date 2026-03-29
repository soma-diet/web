<script setup lang="ts">
import { getWithSystemServings } from "@/constants/system-servings.const";
import type { LogEntry, Serving, Trackable } from "@/model";
import PrimaryButton from "@/ui/action/PrimaryButton.vue";
import LabeledDateInput from "@/ui/form/input/labeled/LabeledDateInput.vue";
import LabeledNumberInput from "@/ui/form/input/labeled/LabeledNumberInput.vue";
import LabeledSelect from "@/ui/form/input/labeled/LabeledSelect.vue";
import FormNavigationBar from "@/ui/form/nav/FormNavigationBar.vue";
import { makeDateFromISO } from "@/utils/date.util";
import { getImage, SomaImageSize } from "@/utils/image.util";
import { computed, ref } from "vue";
import MacroFill from "./components/MacroFill.vue";
import NutritionalInfo from "./components/NutritionalInfo.vue";

const emit = defineEmits<{
  (e: "cancel"): void;
  (
    e: "submit",
    quantity: number,
    servingId: string | null,
    date: Date,
    callback: () => void,
  ): void;
}>();

const props = defineProps<{
  trackable: Trackable;
  entry?: LogEntry;
}>();

const thumbnailSrc = computed(() =>
  props.trackable.imageFilename
    ? getImage(props.trackable.imageFilename, SomaImageSize.LARGE)
    : "/assets/img/no-img-placeholder.jpg",
);

// inputs
const quantity = ref<number>(props.entry?.quantity ?? 100);
const selectedDate = ref<Date>(
  props.entry?.timestamp ? makeDateFromISO(props.entry.timestamp) : new Date(),
);

// servings
const servings = computed(() => getWithSystemServings(props.trackable));
const systemServing = servings.value.find(
  (serving: Serving) => serving.isSystem,
)!;
const entryServing = props.entry
  ? servings.value.find((s: Serving) => s.id === props.entry!.servingId)
  : null;
const selectedServing = ref<Serving>(entryServing ?? systemServing);

// helpers
const totalSize = computed(() => quantity.value * selectedServing.value.size);
const isSubmitting = ref(false);
const originalTotalSize = computed(() => {
  if (props.entry) {
    return props.entry.quantity * props.entry.servingSize;
  }
  return 0;
});

// validation
const errors = ref<Record<string, string>>({});
function validate(): boolean {
  Object.keys(errors.value).forEach((key) => delete errors.value[key]);

  if (!quantity.value || quantity.value <= 0) {
    errors.value.quantity = "quantity must be a positive number";
  }

  return Object.keys(errors.value).length === 0;
}

function handleSubmit() {
  if (!validate()) return;
  isSubmitting.value = true;

  emit(
    "submit",
    quantity.value,
    selectedServing.value.id,
    selectedDate.value,
    () => {
      isSubmitting.value = false;
    },
  );
}

const navTitle = computed(() => {
  return props.entry ? "log consumed food" : "edit entry";
});
</script>

<template>
  <div class="wrapper col stretch-h">
    <FormNavigationBar :title="navTitle" @close="emit('cancel')" />

    <div class="intro-info apart center">
      <div class="food-thumbnail middle">
        <img :src="thumbnailSrc" :alt="'picture of ' + props.trackable.name" />
      </div>

      <form @submit.prevent="handleSubmit">
        <h2>{{ props.trackable.name }}</h2>

        <LabeledNumberInput
          :error="errors.quantity"
          @input="delete errors.quantity"
          v-model:value="quantity"
          label="Amount"
          step="0.01"
          placeholder="150"
        />
        <LabeledSelect
          label="Serving"
          v-model:selected="selectedServing"
          :required="true"
          :options="
            servings.map((serving) => ({ name: serving.name, value: serving }))
          "
        />

        <LabeledDateInput
          :required="true"
          label="Date"
          v-model="selectedDate"
        />

        <PrimaryButton type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "saving.." : props.entry ? "update" : "add" }}
        </PrimaryButton>
      </form>
    </div>

    <hr />

    <NutritionalInfo
      :key="props.trackable.id"
      :grams="totalSize"
      :macros="props.trackable.macronutrients"
      :micros="props.trackable.micronutrients"
    />

    <hr />

    <MacroFill
      :key="props.trackable.id"
      :grams="totalSize"
      :macros="props.trackable.macronutrients"
      :micros="props.trackable.micronutrients"
      :original-grams="originalTotalSize"
    />
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
  overflow-y: scroll;
}

.intro-info {
  min-width: 0;
  max-height: 25rem;
  gap: 1rem;
}

.food-thumbnail {
  flex: 1;
  max-height: 100%;
  border: 2px solid var(--border-main);
}

.food-thumbnail > img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

@media (min-width: 2560px) {
  .intro-info {
    max-height: 50rem;
  }
}
</style>
