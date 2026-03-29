<script setup lang="ts">
import { MACROS_KEYS, MICROS_KEYS } from "@/constants";
import PrimaryButton from "@/ui/action/PrimaryButton.vue";
import FormNavigationBar from "@/ui/form/nav/FormNavigationBar.vue";
import { computed, onMounted, reactive, ref, useId, watch } from "vue";
import DropHint from "./components/DropHint.vue";
import FoodDetailsEditor from "./components/FoodDetailsEditor.vue";
import FoodNutrientsEditor from "./components/FoodNutrientsEditor.vue";
import FoodServingsEditor from "./components/FoodServingsEditor.vue";
import type { FormServing } from "./types/form-serving.type";
import { type Food, type Serving, createServing, createFood } from "@/model";

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "submit", food: Food, image: File | null, callback: () => void): void;
}>();

const props = defineProps<{
  food?: Food;
}>();

// Navigation bar
const title = computed(() =>
  props.food ? `Edit ${props.food.name}` : "Add new food",
);

// Details Editor State
const name = ref(props.food?.name ?? "");
const brand = ref(props.food?.brand ?? "");
const isLiquid = ref(props.food?.isMass ? !props.food.isMass : false);
const selectedImg = ref<File | null>(null);

// Servings Editor State
const formServings = ref<FormServing[]>(
  props.food?.servings.map((serving) => {
    return {
      previousId: serving.id,
      name: serving.name,
      size: serving.size,
    };
  }) ?? [],
);

// Nutrients Editor State
const macros = Object.fromEntries(
  MACROS_KEYS.map((key) => [key, props.food?.macronutrients[key] ?? null]),
);
const micros = Object.fromEntries(
  MICROS_KEYS.map((key) => [key, props.food?.micronutrients[key] ?? null]),
);
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
        isSystem: false,
      };
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
      servings: newServings,
    });
  } else {
    // CREATE NEW
    uploadedFood = createFood(
      name.value,
      !isLiquid.value,
      macros,
      micros,
      newServings,
      brand.value,
    );
  }

  emit("submit", uploadedFood, selectedImg.value, () => {
    isSubmitting.value = false;
  });
}

// DragAndDrop obrazku jidla nad formular
const isDraggingOver = ref(false);

function handleDragOver(e: DragEvent) {
  e.preventDefault();
}
function handleDragEnter(e: DragEvent) {
  e.preventDefault();
  isDraggingOver.value = true;
}
function handleDragLeave(e: DragEvent) {
  const dragArea = e.currentTarget as HTMLElement;
  const target = e.relatedTarget as Node | null; // Node kvuli contains funkci, relatedTarget = element na ktery prijizdi mys (s target nefunguje)
  if (dragArea.contains(target)) return; // ignoruje kdyz se prejizdi mysi nad detmi formulare
  isDraggingOver.value = false;
}
function handleDrop(e: DragEvent) {
  e.preventDefault();
  isDraggingOver.value = false;

  const files = e.dataTransfer?.files;
  if (!files || files.length === 0) {
    selectedImg.value = null;
  } else {
    const file = files[0]!;
    if (!file?.type.startsWith("image/")) {
      alert("You can only upload an image.");
      return;
    }

    selectedImg.value = file;
  }
}
watch(selectedImg, (newValue) => {
  console.log(newValue);
});

const id = useId();
onMounted(() => {
  const formElement = document.getElementById(id);

  formElement?.addEventListener("dragenter", handleDragEnter);
  formElement?.addEventListener("dragover", handleDragOver);
  formElement?.addEventListener("dragleave", handleDragLeave);
  formElement?.addEventListener("drop", handleDrop);
});
</script>

<template>
  <form :id @submit.prevent="handleSubmit">
    <FormNavigationBar :title="title" @close="emit('cancel')" />
    <FoodDetailsEditor
      :initial-image="food?.imageFilename ?? undefined"
      v-model:name="name"
      v-model:brand="brand"
      v-model:isLiquid="isLiquid"
      v-model:selectedImg="selectedImg"
    />
    <FoodServingsEditor v-model:servings="formServings" />
    <FoodNutrientsEditor v-model:nutrients="nutrientInput" />
    <PrimaryButton type="submit" :disabled="isSubmitting">{{
      props.food ? "Save" : "Create"
    }}</PrimaryButton>

    <DropHint v-if="isDraggingOver" class="hint" />
  </form>
</template>

<style scoped>
form {
  position: relative;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 0.75rem;

  overflow-y: auto;
}

.hint {
  position: absolute;
  inset: 0;
  z-index: 100;
  pointer-events: none;
}
</style>
