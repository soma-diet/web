<script setup lang="ts">
import { getImage, SomaImageSize } from '@/lib/utils/image.util';
import { computed, ref } from 'vue';

const props = defineProps<{
  initialImage?: string
}>();

const name = defineModel<string>("name", { required: true });
const brand = defineModel<string>("brand", { required: true });
const isLiquid = defineModel<boolean>("isLiquid", { required: true });
const selectedImg = defineModel<File | null>("selectedImg", { required: true });

const previewUrl = ref<string | null>(null);
const displayImg = computed(() => {
  if (previewUrl.value) return previewUrl.value;
  if (props.initialImage) return getImage(props.initialImage, SomaImageSize.LARGE);
  return "/assets/no-img-placeholder.jpg";
});

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
</script>

<template>
  <div class="intro">
    <img :src="displayImg" alt="food" />
    <ul class="col">
      <LabeledInput type="text" label="Food name" v-model="name" :required="true" />
      <LabeledInput type="text" label="Brand" v-model="brand" />
      <LabeledInput type="checkbox" label="Is a liquid" v-model="isLiquid" />

      <!-- TODO kandidat na Drag&drop -->
      <ImageInput name="food-img" label="Change food image" @file-changed="(e: Event) => handleFileChange(e)" />
    </ul>
  </div>
</template>

<style scoped>
.intro {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  gap: 1rem;
}

ul {
  gap: 0.25rem;
  justify-content: space-between;
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
</style>