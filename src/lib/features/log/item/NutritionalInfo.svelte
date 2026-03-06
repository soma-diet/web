<script lang="ts">
    import type { Macronutrients, Micronutrients } from "../../../model";

    interface Props {
        grams: number;
        macros: Macronutrients;
        micros: Micronutrients;
    }
    let { grams, macros, micros }: Props = $props();

    let coefficient = $derived(grams / 100);

    // pro urceni poradi a nazvu v tabulce
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
            <td colspan="2">nutrient data on QUANTITY SERVING SIZE</td>
        </tr>
    </thead>
    <tbody>
        {#each Object.entries(nutrient_visual) as [name, base_val]}
            <tr>
                <td>{name}</td>
                <td>{(base_val ?? 0) * coefficient} g</td>
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
