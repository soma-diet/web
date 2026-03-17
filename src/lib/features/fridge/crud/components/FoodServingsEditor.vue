<script setup lang="ts">
import type { FormServing } from '../model/form-serving.ui.model';

const servings = defineModel<FormServing[]>("servings", { required: true });

const addServingField = () => {
  servings.value.push({
    previousId: null,
    name: null,
    size: null
  } as FormServing)
}
const removeServingField = (index: number) => {
  servings.value.splice(index, 1);
}
</script>

<template>
  <ul>
    <li v-for="(formServing, index) in servings" :key="index">
      <div class="row apart">
        <h4>{{ formServing.name }}</h4>
        <TransparentButton @click="removeServingField(index)">
          <CrossIcon></CrossIcon>
        </TransparentButton>
      </div>
      <LabeledInput type="text" label="Name" v-model="formServing.name" :required="true" />
      <LabeledNumberInput label="Size (g)" v-model="formServing.size" :required="true" />
      <br>
    </li>
  </ul>
  <button type="button" @click="addServingField">add serving</button>
</template>