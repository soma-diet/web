<script lang="ts">
    import { getImage, SomaImageSize } from "../../api/methods/get_image";
    import { SYSTEM_SERVINGS } from "../../constants/SystemServings";
    import type { Food } from "../../model";
    import NutritionalInfo from "./item/NutritionalInfo.svelte";

    interface Props {
        food_item: Food;
    }
    let { food_item }: Props = $props();

    let foodThumbnailSrc = $derived(
        food_item.imageFilename
            ? getImage(food_item.imageFilename, SomaImageSize.LARGE)
            : "",
    );

    let servings = $derived([...SYSTEM_SERVINGS, ...food_item.servings]);
</script>

<div class="wrapper">
    <div id="intro-info" class="apart">
        <img src={foodThumbnailSrc} alt={"picture of " + food_item.name} />
        <div>
            <h3>{food_item.name}</h3>
            <span>{food_item.brand}</span>
            <span>{food_item.author}</span>

            <div>
                <label for="quantity">Amount: </label>
                <input type="number" name="quantity" />
            </div>

            <div>
                <label for="serving">Serving: </label>
                <select name="serving" id="">
                    {#each servings as serving}
                        <option value={serving.id}>{serving.name}</option>
                    {/each}
                </select>
            </div>
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
        align-items: stretch;
        gap: 0.25rem;
        text-align: end;
    }
</style>
