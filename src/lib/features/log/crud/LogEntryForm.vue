<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { postLogEntry, putLogEntry } from "../../../api";
import { getWithSystemServings } from "../../../constants/system-servings.const";
import {
  createLogEntry,
  type LogEntry,
  type Serving,
  type Trackable,
} from "../../../model";
import { CrossIcon } from "../../../ui/icon";
import { getImage, SomaImageSize } from "../../../utils/image.util";

const emit = defineEmits<{
  (e: "finished"): void;
}>();

interface Props {
  trackable: Trackable;
  entry?: LogEntry;
}

const props = defineProps<Props>();
onMounted(() => {
  console.log("entry form for trackable", props.trackable.macronutrients );
})

const unit = "g";
const thumbnailSrc = computed(() => props.trackable.imageFilename
  ? getImage(props.trackable.imageFilename, SomaImageSize.LARGE)
  : "");

// inputs
const quantity = ref(props.entry?.quantity ?? 100);

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

async function handleSubmit() {
  isSubmitting.value = true;

  const newEntry = !props.entry
    ? createLogEntry(props.trackable, selectedServing.value, quantity.value)
    : { ...props.entry, quantity: quantity.value };
  const httpCall = !props.entry ? postLogEntry : putLogEntry;
  const success = await httpCall(newEntry);
  if (success) {
    emit("finished");
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="right">
      <TransparentButton @click="emit('finished')">
        <CrossIcon />
      </TransparentButton>
    </div>

    <div id="intro-info" class="apart">
      <img v-if="thumbnailSrc" :src="thumbnailSrc" :alt="'picture of ' + props.trackable.name" />
      <div v-else class="image-placeholder">No image available</div>

      <form @submit.prevent="handleSubmit">
        <h3>{{ props.trackable.name }}</h3>
        <!-- <span>{{food.brand}}</span> -->
        <span>{{ props.trackable.author }}</span>

        <div>
          <label for="quantity">Amount: </label>
          <input type="number" name="quantity" v-model.number="quantity" />
          <span>{{ `(${totalSize} ${unit}` }}</span>
        </div>

        <div>
          <label for="serving">Serving: </label>
          <select name="serving" v-model="selectedServing">
            <!-- TODO system serving je zatim jen v g, takze potreba prepsat na ml, ale zaroven nemuzu pridat obe kazdemu foodu -->
            <option v-for="serving in servings" :value="serving">{{ serving.name }}</option>
          </select>
        </div>

        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "saving.." : (props.entry ? "update" : "add") }}
        </button>
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
  gap: 0.25rem;
  text-align: end;
}

.wrapper {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  justify-content: stretch;
  gap: 0.5rem;
}

#intro-info {
  height: 12rem;
  min-width: 0;
  gap: 1rem;
}

#intro-info>img {
  flex: 1;
  height: 100%;
  object-fit: contain;
  min-width: 0;
}
</style>
