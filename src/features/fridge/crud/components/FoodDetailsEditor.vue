<script setup lang="ts">
import ImageInput from "@/ui/form/input/ImageInput.vue";
import LabeledCheckbox from "@/ui/form/input/labeled/LabeledCheckbox.vue";
import LabeledInput from "@/ui/form/input/labeled/LabeledInput.vue";
import { getImage, SomaImageSize } from "@/utils/image.util";
import { computed } from "vue";

const props = defineProps<{
  initialImage?: string;
}>();

const name = defineModel<string>("name", { required: true });
const brand = defineModel<string>("brand", { required: true });
const isLiquid = defineModel<boolean>("isLiquid", { required: true });
const selectedImg = defineModel<File | null>("selectedImg", { required: true });

const initialImgPath = computed(() =>
  props.initialImage ? getImage(props.initialImage, SomaImageSize.LARGE) : null,
);
</script>

<template>
  <div class="intro row stretch-h">
    <div class="upload col middle center f1">
      <ImageInput
        v-model:file="selectedImg"
        :initialImage="initialImgPath ?? undefined"
      />
    </div>
    <div class="details col f1">
      <LabeledInput
        type="text"
        label="Name"
        v-model="name"
        :required="true"
        placeholder="Raw Chicken Breasts"
      />
      <LabeledInput
        type="text"
        label="Brand"
        v-model="brand"
        placeholder="Walmart"
      />
      <LabeledCheckbox label="Is a liquid" v-model:checked="isLiquid" />
    </div>
  </div>
</template>

<style scoped>
.intro {
  gap: 1rem;
}

.upload {
  min-width: 0;
}

.details {
  min-width: 0;
  gap: 1rem;
}
</style>
