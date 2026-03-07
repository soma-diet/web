<script lang="ts">
    import type { Macronutrients, Micronutrients } from "../../../model";

    interface Props {
        grams: number;
        macros: Macronutrients;
        micros: Micronutrients;
    }
    let { grams, macros, micros }: Props = $props();

    let coefficient = $derived(grams / 100);
    let recalculate = (val: number) => val * coefficient;

    // pro urceni poradi a nazvu v tabulce
    let kJ = $derived(Math.round(recalculate(macros.kcal) * 4.184 * 10) / 10);
    let nutrient_visual = $derived({
        Energy: `${kJ} kJ / ${recalculate(macros.kcal)} kcal`,
        Fat: `${recalculate(macros.fats)} g`,
        Carbohydrate: `${recalculate(macros.carbs)} g`,
        Protein: `${recalculate(macros.protein)} g`,
        Fiber: `${micros.fiber ? recalculate(micros.fiber) : "?"} g`,
        Salt: `${micros.sodium ? recalculate(micros.sodium) : "?"} g`,
    });
</script>

<table>
    <thead>
        <tr>
            <td colspan="2">nutrient data on QUANTITY SERVING SIZE</td>
        </tr>
    </thead>
    <tbody>
        {#each Object.entries(nutrient_visual) as [first_col, second_col]}
            <tr>
                <td>{first_col}</td>
                <td>{second_col}</td>
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

    thead td {
        text-align: left !important;
    }

    td:last-child {
        text-align: right;
    }
</style>
