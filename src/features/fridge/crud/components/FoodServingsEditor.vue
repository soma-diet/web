<script setup lang="ts">
import OutlineButton from "@/ui/action/OutlineButton.vue";
import type { FormServing } from "../types/form-serving.type";
import CrossIcon from "@/ui/icon/CrossIcon.vue";
import LabeledInput from "@/ui/form/input/labeled/LabeledInput.vue";
import LabeledNumberInput from "@/ui/form/input/labeled/LabeledNumberInput.vue";

const servings = defineModel<FormServing[]>("servings", { required: true });

const addServingField = () => {
  servings.value.push({
    previousId: null,
    name: null,
    size: null,
  } as FormServing);
};
const removeServingField = (index: number) => {
  servings.value.splice(index, 1);
};
</script>

<template>
  <ul class="col">
    <li class="col" v-for="(formServing, index) in servings" :key="index">
      <div class="row apart center">
        <h3 :class="{ placeholder: formServing.name?.length === 0 }">
          {{
            formServing.name && formServing.name !== ""
              ? `Serving: ${formServing.name}`
              : "New serving"
          }}
        </h3>
        <OutlineButton @click="removeServingField(index)">
          <CrossIcon></CrossIcon>
        </OutlineButton>
      </div>
      <LabeledInput
        type="text"
        label="Name"
        v-model="formServing.name"
        :required="true"
        placeholder="Piece"
      />
      <LabeledNumberInput
        label="Size (g)"
        v-model:value="formServing.size"
        :required="true"
        placeholder="50"
      />
    </li>
  </ul>
  <OutlineButton type="button" @click="addServingField"
    >Add a serving</OutlineButton
  >
</template>

<style scoped>
ul {
  gap: 1.5rem;
}

li {
  gap: 0.5rem;
}

.placeholder {
  color: var(--text-dim);
}
</style>
