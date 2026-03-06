<script lang="ts">
    import type {
        Macronutrients,
        Micronutrients,
    } from "../../../api/interface";

    interface Props {
        grams: number;
        macros: Macronutrients;
        micros: Micronutrients;
    }
    let { grams, macros, micros }: Props = $props();

    let koeficient = $derived(grams / 100);
    let recalculate = (val: number) => val * koeficient;

    let nutrient_visual = $derived({
        Fats: macros.fats,
        Carbohydrates: macros.carbs,
        Protein: macros.protein,
        Fiber: micros.fiber,
        Sodium: micros.sodium,
    });
</script>

<table>
    <thead>
        <tr>
            <td>nutrient data on QUANTITY SERVING SIZE</td>
        </tr>
    </thead>
    <tbody>
        {#each Object.entries(nutrient_visual) as [name, base_val]}
            <tr>
                <td>{name}</td>
                <td>{recalculate(base_val)} g</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table,
    td {
        border: 1px solid var(--secondary-color);
        border-collapse: collapse;
    }
</style>
