<script setup lang="ts">
import { ref, reactive } from "vue";
import type { Food } from "../../../model";
import { NUTRIENT_NAMES, NUTRITION_KEYS } from "@/lib/constants";

const emit = defineEmits<{
  (e: "finished"): void
}>();

const props = defineProps<{
  food?: Food
}>();

const name = ref(props.food?.name ?? "");
const brand = ref(props.food?.brand ?? "");
const nutrients = reactive<Record<string, string | number>>(
  Object.fromEntries(NUTRITION_KEYS.map(key => [key, props.food?.macronutrients[key as keyof typeof props.food.macronutrients] ?? ""]))
);

const isSubmitting = ref<boolean>(false);
function handleSubmit() {
  isSubmitting.value = true;
  // TODO call API

  // clean up
  isSubmitting.value = false;
  emit("finished");
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="intro">
      <img
        src="https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/7de863efbfe0eef06f7a66c1e97201ec/Derivates/d5754b87aaaccfe716bc2615afd93dad9c6e73d7.jpg"
        alt="food" />
      <ul>
        <LabeledInput type="text" label="Food name" name="name" v-model="name" />
        <LabeledInput type="text" label="Brand" name="brand" v-model="brand" />

        <!-- TODO kandidat na Drag&drop -->
        <FileInput label="Change food image" name="image" />
      </ul>
    </div>

    <ul>
      <LabeledInput :key="key" v-for="key in NUTRITION_KEYS" type="number" :label="NUTRIENT_NAMES[key]" :name="key"
        v-model="nutrients[key]" />
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
