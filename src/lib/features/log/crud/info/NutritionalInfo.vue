<script setup lang="ts">
import { computed } from "vue";
import type { Macronutrients, Micronutrients } from "../../../../model";

interface Props {
    grams: number;
    macros: Macronutrients;
    micros: Micronutrients;
}
const props = defineProps<Props>();

const coefficient = computed(() => props.grams / 100);
const recalculate = (val: number) => Math.round(val * coefficient.value) / 10;

// pro urceni poradi a nazvu v tabulce
const nutrient_visual = computed(() => {
    return {
        Energy: `${recalculate(props.macros.kcal * 4.184)} kJ / ${recalculate(props.macros.kcal)} kcal`,
        Fat: `${recalculate(props.macros.fats)} g`,
        Carbohydrate: `${recalculate(props.macros.carbs)} g`,
        Protein: `${recalculate(props.macros.protein)} g`,
        Fiber: `${props.micros.fiber ? recalculate(props.micros.fiber) : "?"} g`,
        Salt: `${props.micros.sodium ? recalculate(props.micros.sodium) : "?"} g`,
    }
});
</script>

<template>
    <h3>Nutrition Information</h3>
    <table>
        <thead>
            <tr>
                <td></td>
                <td class="text-center">per {{ props.grams }} g</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="entry in Object.entries(nutrient_visual)" :key="entry[0]">
                <td class="text-left">{{ entry[0] }}</td>
                <td class="text-center">{{ entry[1] }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table,
td {
    border: 1px solid var(--secondary-color);
    border-collapse: collapse;
}

thead td {
    font-weight: bold;
}

.text-left {
    text-align: left;
}

.text-center {
    text-align: center;
}
</style>
