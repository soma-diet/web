<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import ImageIcon from '../../icon/ImageIcon.vue';

const props = defineProps<{
  initialImage?: string;
}>()

const id = useId();

const previewUrl = ref<string | null>(null);
const fileModel = defineModel<File | null>("file", { required: true });

const displayImg = computed(() => {
  if (previewUrl.value) return previewUrl.value;
  if (props.initialImage) return props.initialImage;
});

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    const file = files[0]!;
    fileModel.value = file;
    previewUrl.value = URL.createObjectURL(file); // vytvori preview url pro zobrazeni nahraneho obrazku
  } else {
    fileModel.value = null;
    previewUrl.value = null;
  }
}
</script>

<template>
  <label :for="id" :class="{ 'without-preview': !displayImg }" class="col center middle">
    <img v-if="displayImg" class="preview-img" :src="displayImg" alt="food" />
    <ImageIcon v-else class="preview-img" />
  </label>
  <input type="file" accept="image/*" :id="id" @change="handleFileChange" />
</template>

<style scoped>
input {
  display: none;
}

label {
  width: 100%;
  max-height: 12.5rem;
  border: 2px solid var(--color-accent);
  padding: v-bind("displayImg ? '0' : '2rem'");
  text-align: center;
  cursor: pointer;
  min-height: 0;
}

label.without-preview {
  aspect-ratio: 1;
}

label:hover {
  background-color: var(--bg-surface);
}

label:hover .preview-img {
  color: var(--color-accent);
}

.preview-img {
  width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.without-preview>.preview-img {
  height: 100%;
}
</style>