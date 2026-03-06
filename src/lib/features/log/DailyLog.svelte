<script lang="ts">
    import { SAMPLE_FOOD_ITEM } from "../../sample/SampleFoodItem";
    import FoodIcon from "../ui/icon/FoodIcon.svelte";
    import LogItem from "../ui/list/LogItem.svelte";

    let items = [SAMPLE_FOOD_ITEM, SAMPLE_FOOD_ITEM, SAMPLE_FOOD_ITEM];
</script>

<div>
    <div>
        <button>&lt;</button>
        <span>03.06.2026</span>
    </div>
    <button>&gt;</button>
</div>
<div>
    <span>daily targets progress bar</span>
</div>
<ul>
    <hr />
    {#each items as item}
        <li>
            <LogItem
                Icon={FoodIcon}
                name={item.name}
                subtext={`${item.serving.size} ${item.serving.name}`}
                kcal={item.macronutrients.kcal}
            />
        </li>
        <hr />
    {/each}
</ul>

<style>
    ul {
        flex-grow: 1;
        overflow-y: auto;
    }

    hr {
        border: 1px solid black;
    }
</style>
