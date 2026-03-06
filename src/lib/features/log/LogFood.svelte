<script lang="ts">
    import type { Food } from "../../model";
    import NutritionalInfo from "./item/NutritionalInfo.svelte";

    interface Props {
        food_item: Food;
    }
    let { food_item }: Props = $props();
</script>

<div class="wrapper">
    <div id="intro-info" class="apart">
        <img
            src="https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/7de863efbfe0eef06f7a66c1e97201ec/Derivates/d5754b87aaaccfe716bc2615afd93dad9c6e73d7.jpg"
            alt="obrazek jidla"
        />
        <div>
            <h3>{food_item.name}</h3>
            <span>{food_item.brand}</span>
            <span>{food_item.author}</span>
            <input type="number" name="quantity" />
            <select name="" id="">
                <option value="test1">test1</option>
                <option value="test2">test2</option>
                <option value="test3">test3</option>
            </select>
            <button>add</button>
        </div>
    </div>
    <hr />
    {#if food_item}
        <NutritionalInfo
            grams={100}
            macros={food_item.macronutrients}
            micros={food_item.micronutrients}
        />
    {:else}
        <!-- TODO smazat az bude nacten food item -->
        <span>no food item loaded</span>
    {/if}
    <hr />
    <div>
        <span>daily target graph fill</span>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
        justify-content: stretch;
        gap: 0.5rem;
    }

    .apart {
        display: flex;
        justify-content: space-between;
    }

    #intro-info {
        gap: 1rem;
    }

    #intro-info > img {
        flex: 2;
        object-fit: contain;
        min-width: 0;
        width: 100%;
    }

    #intro-info > div {
        flex: 3;
        min-width: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 0.25rem;
    }
</style>
