import { reactive } from "vue";
import type { Food } from "../model";

const foodSelectionState = reactive({
  selectedFood: null as Food | null,
  isFormOpen: false as boolean,
});

function openFoodForm(food = null as Food | null) {
  if (food) foodSelectionState.selectedFood = food;
  foodSelectionState.isFormOpen = true;
}

function closeFoodForm() {
  foodSelectionState.selectedFood = null;
  foodSelectionState.isFormOpen = false;
}

export function useFoodSelectionStore() {
  return { foodSelectionState, openFoodForm, closeFoodForm };
}
