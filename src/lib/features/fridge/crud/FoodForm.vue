<script setup lang="ts">
import { postFood } from "@/lib/api";
import { NUTRIENT_DISPLAY_NAMES, NUTRITION_KEYS } from "@/lib/constants";
import { computed, reactive, ref } from "vue";
import { createFood, type Food, type Serving } from "../../../model";

const emit = defineEmits<{
  (e: "finished"): void
}>();

const props = defineProps<{
  food?: Food
}>();

const name = ref(props.food?.name ?? "");
const brand = ref(props.food?.brand ?? "");
const isMass = ref(props.food?.isMass ?? true);
const nutrients = reactive<Record<string, number | null>>(
  Object.fromEntries(NUTRITION_KEYS.map(key => [key, props.food?.macronutrients[key as keyof typeof props.food.macronutrients] ?? null]))
);

// IMG UPLOAD
const selectedImg = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const foodImg = computed(() => {
  if (previewUrl.value) return previewUrl.value;
  if (props.food?.imageFilename) return props.food.imageFilename;
  return "/assets/no-img-placeholder.jpg";
})
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    const file = files[0]!;
    selectedImg.value = file;
    previewUrl.value = URL.createObjectURL(file); // vytvori preview url pro zobrazeni nahraneho obrazku
  } else {
    selectedImg.value = null;
    previewUrl.value = null;
  }
}

// SUBMITTING
const isSubmitting = ref<boolean>(false);
function handleSubmit() {
  isSubmitting.value = true;
  // TODO call API

  if (!props.food) {
    // new food
    const macros = {
      kcal: nutrients.kcal!,
      protein: nutrients.protein!,
      fats: nutrients.fats!,
      carbs: nutrients.carbs!
    }
    const micros = {
      fiber: nutrients.fiber ?? null,
      sodium: nutrients.sodium ?? null
    }
    const servings: Serving[] = [];
    const newFood = createFood(name.value, isMass.value, macros, micros, servings, brand.value, null);
    postFood(newFood, selectedImg.value).finally(() => {
      console.log("post finished!!");
    });
  }

  // clean up
  isSubmitting.value = false;
  emit("finished");
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="intro">
      <img :src="foodImg" alt="food" />
      <ul>
        <LabeledInput type="text" label="Food name" v-model="name" />
        <LabeledInput type="text" label="Brand" v-model="brand" />

        <!-- TODO kandidat na Drag&drop -->
        <ImageInput name="food-img" label="Change food image" @file-changed="(e: Event) => handleFileChange(e)" />
      </ul>
    </div>

    <ul>
      <LabeledNumberInput :key="key" v-for="key in NUTRITION_KEYS" :label="NUTRIENT_DISPLAY_NAMES[key] ?? key"
        :name="key" v-model="nutrients[key]" />
    </ul>
    <button type="submit" :disabled="isSubmitting">{{ props.food ? "save changes" : "create new food" }}</button>
  </form>
</template>

<style scoped>
form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 0.75rem;
}

.intro {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  gap: 1rem;
}

.intro>ul {
  flex: 2;

  /* zarizuji ze nebude pretekat svoji width assignutou dynamicky pomoci flex vlastnosti*/
  min-width: 0;
  width: 100%;
}

img {
  flex: 1;
  object-fit: contain;
  min-width: 0;
  width: 100%;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: space-between;
}
</style>
