<script setup lang="ts">
import { postFood } from "@/lib/api";
import { MACROS_KEYS, MICROS_KEYS, NUTRIENT_DISPLAY_NAMES, NUTRITION_KEYS } from "@/lib/constants";
import { computed, reactive, ref } from "vue";
import { createFood, createServing, type Food, type Serving } from "../../../model";

const emit = defineEmits<{
  (e: "finished"): void
}>();

const props = defineProps<{
  food?: Food
}>();

const name = ref(props.food?.name ?? "");
const brand = ref(props.food?.brand ?? "");
const isLiquid = ref(props.food?.isMass ? !props.food.isMass : false);

const macros = Object.fromEntries(MACROS_KEYS.map(key => [key, props.food?.macronutrients[key] ?? null]));
const micros = Object.fromEntries(MICROS_KEYS.map(key => [key, props.food?.micronutrients[key] ?? null]));
const nutrientInput = reactive({ ...macros, ...micros });

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

// SERVINGS
interface FormServing {
  previousId: string | null,
  name: string | null,
  size: number | null
}
const servings = ref<FormServing[]>(props.food?.servings.map(serving => {
  return {
    previousId: serving.id,
    name: serving.name,
    size: serving.size
  }
}) ?? []);
const addServingField = () => {
  servings.value.push({
    previousId: null,
    name: null,
    size: null
  } as FormServing)
}
const removeServingField = (name: string | null) => {
  servings.value = servings.value.filter((serving: FormServing) => {
    return serving.name !== name;
  })
}

// SUBMITTING
const isSubmitting = ref<boolean>(false);
function handleSubmit() {
  isSubmitting.value = true;
  // TODO call API

  // asi jde lehceji ale typescript mi to neumoznuje moc elegantne se zda
  const macros = {
    kcal: nutrientInput.kcal!,
    protein: nutrientInput.protein!,
    fats: nutrientInput.fats!,
    carbs: nutrientInput.carbs!
  }
  const micros = {
    fiber: nutrientInput.fiber ?? null,
    sodium: nutrientInput.sodium ?? null
  }

  if (!props.food) {
    // new food
    const newServings = servings.value.map((formServing: FormServing) => {
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
    const newFood = createFood(name.value, !isLiquid.value, macros, micros, newServings, brand.value, null);
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
        <LabeledInput type="text" label="Food name" v-model="name" :required="true" />
        <LabeledInput type="text" label="Brand" v-model="brand" :required="true" />
        <LabeledInput type="checkbox" label="Is a liquid" v-model="isLiquid" />

        <!-- TODO kandidat na Drag&drop -->
        <ImageInput name="food-img" label="Change food image" @file-changed="(e: Event) => handleFileChange(e)" />
      </ul>
    </div>
    <hr>
    <h3>Servings</h3>
    <ul>
      <li v-for="formServing in servings">
        <div class="row apart">
          <h4>{{ formServing.name }}</h4>
          <TransparentButton @click="removeServingField(formServing.name)">
            <CrossIcon></CrossIcon>
          </TransparentButton>
        </div>
        <LabeledInput type="text" label="Name" v-model="formServing.name" :required="true" />
        <LabeledNumberInput label="Size (g)" v-model="formServing.size" :required="true" />
        <br>
      </li>
    </ul>
    <button type="button" @click="addServingField">add serving</button>
    <hr>
    <h3>Nutrients</h3>
    <ul>
      <LabeledNumberInput :key="key" v-for="key in NUTRITION_KEYS" :label="NUTRIENT_DISPLAY_NAMES[key] ?? key"
        :name="key" v-model="nutrientInput[key]" :required="MACROS_KEYS.some(_key => _key === key)" />
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
