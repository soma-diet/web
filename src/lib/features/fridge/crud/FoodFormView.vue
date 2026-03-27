<script setup lang="ts">
import { MACROS_KEYS, MICROS_KEYS } from "@/lib/constants";
import { computed, reactive, ref } from "vue";
import { createFood, createServing, type Food, type Serving } from "../../../model";
import type { FormServing } from "./model/form-serving.ui.model";
import FormNavigationBar from "@/lib/ui/form/nav/FormNavigationBar.vue";
import FoodDetailsEditor from "./components/FoodDetailsEditor.vue";
import FoodServingsEditor from "./components/FoodServingsEditor.vue";
import FoodNutrientsEditor from "./components/FoodNutrientsEditor.vue";
import PrimaryButton from "@/lib/ui/action/PrimaryButton.vue";

const emit = defineEmits<{
  (e: "cancel"): void,
  (e: "submit", food: Food, image: File | null, callback: () => void): void
}>();

const props = defineProps<{
  food?: Food
}>();

// Navigation bar
const title = computed(() => props.food ? `Update ${props.food.name}` : 'Create a new food');

// Details Editor State
const name = ref(props.food?.name ?? "");
const brand = ref(props.food?.brand ?? "");
const isLiquid = ref(props.food?.isMass ? !props.food.isMass : false);
const selectedImg = ref<File | null>(null);

// Servings Editor State
const formServings = ref<FormServing[]>(props.food?.servings.map(serving => {
  return {
    previousId: serving.id,
    name: serving.name,
    size: serving.size
  }
}) ?? []);

// Nutrients Editor State
const macros = Object.fromEntries(MACROS_KEYS.map(key => [key, props.food?.macronutrients[key] ?? null]));
const micros = Object.fromEntries(MICROS_KEYS.map(key => [key, props.food?.micronutrients[key] ?? null]));
let nutrientInput = reactive({ ...macros, ...micros });

function prepareServings(formServings: FormServing[]): Serving[] {
  return formServings.map((formServing: FormServing) => {
    // TODO display error and prevent
    if (!formServing.name || !formServing.size) {
      console.error("serving must have name and size");
      throw Error("serving must have name and size");
    }

    if (formServing.previousId) {
      return {
        id: formServing.previousId,
        name: formServing.name,
        size: formServing.size,
        isSystem: false
      }
    } else {
      return createServing(formServing.name, formServing.size);
    }
  });
}

// SUBMITTING
const isSubmitting = ref<boolean>(false);
function handleSubmit() {
  isSubmitting.value = true;

  const { kcal, protein, fats, carbs, fiber, sodium } = nutrientInput;
  const macros = { kcal: kcal!, protein: protein!, fats: fats!, carbs: carbs! }; // melo by byt davno zvalidovany formularem
  const micros = { fiber: fiber ?? null, sodium: sodium ?? null }; // null hodnoty jsou OK

  const newServings = prepareServings(formServings.value);

  let uploadedFood;
  if (props.food) {
    // UPDATE FOOD

    // Object.assign nastavi dane vlastnosti props.food a vrati zmeneny objekt
    uploadedFood = Object.assign(props.food, {
      name: name.value,
      brand: brand.value,
      isMass: !isLiquid.value,
      macronutrients: macros,
      micronutrients: micros,
      servings: newServings
    });
  } else {
    // CREATE NEW
    uploadedFood = createFood(name.value, !isLiquid.value, macros, micros, newServings, brand.value)
  }

  emit("submit", uploadedFood, selectedImg.value, () => {
    isSubmitting.value = false;
  });
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <FormNavigationBar :title="title" @close="emit('cancel')" />
    <FoodDetailsEditor :initial-image="food?.imageFilename ?? undefined" v-model:name="name" v-model:brand="brand"
      v-model:isLiquid="isLiquid" v-model:selectedImg="selectedImg" />
    <FoodServingsEditor v-model:servings="formServings" />
    <FoodNutrientsEditor v-model:nutrients="nutrientInput" />
    <PrimaryButton type="submit" :disabled="isSubmitting">{{ props.food ? "Save" : "Create" }}</PrimaryButton>
  </form>
</template>

<style scoped>
form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 0.75rem;

  overflow-y: auto;
}
</style>
