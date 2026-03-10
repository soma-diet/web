<script lang="ts">
    import type { Macronutrients, Micronutrients } from "../../../../model";

    interface Props {
        grams: number;
        macros: Macronutrients;
        micros: Micronutrients;
    }
    let { grams, macros, micros }: Props = $props();

    let coefficient = $derived(grams / 100);
    let recalculate = (val: number) => Math.round(val * coefficient) / 10;

    // pro urceni poradi a nazvu v tabulce
    let nutrient_visual = $derived({
        Energy: `${recalculate(macros.kcal * 4.184)} kJ / ${recalculate(macros.kcal)} kcal`,
        Fat: `${recalculate(macros.fats)} g`,
        Carbohydrate: `${recalculate(macros.carbs)} g`,
        Protein: `${recalculate(macros.protein)} g`,
        Fiber: `${micros.fiber ? recalculate(micros.fiber) : "?"} g`,
        Salt: `${micros.sodium ? recalculate(micros.sodium) : "?"} g`,
    });
</script>

<h3>Nutrition Information</h3>
<table>
    <thead>
        <tr>
            <td></td>
            <td class="text-center">per {grams} g</td>
        </tr>
    </thead>
    <tbody>
        {#each Object.entries(nutrient_visual) as [first_col, second_col]}
            <tr>
                <td class="text-left">{first_col}</td>
                <td class="text-center">{second_col}</td>
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
        font-weight: bold;
    }

    .text-left {
        text-align: left;
    }

    .text-center {
        text-align: center;
    }
</style>
