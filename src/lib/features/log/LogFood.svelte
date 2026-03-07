<script lang="ts">
    import { SYSTEM_SERVINGS } from "../../constants/system-servings.const";
    import type { Food, Serving } from "../../model";
    import TransparentButton from "../ui/action/TransparentButton.svelte";
    import NutritionalInfo from "./item/NutritionalInfo.svelte";

    import CrossIcon from "../ui/icon/CrossIcon.svelte";
    import { getImage, SomaImageSize } from "../../utils/image.util";

    interface Props {
        food_item: Food;
        onCancel: () => null;
    }
    let { food_item, onCancel }: Props = $props();

    let foodThumbnailSrc = $derived(
        food_item.imageFilename
            ? getImage(food_item.imageFilename, SomaImageSize.LARGE)
            : "",
    );

    let servings = $derived([...SYSTEM_SERVINGS, ...food_item.servings]);

    let selectedServing = $derived<Serving>(servings[0]);
    let quantity = $state<number>(1);
    let totalSize = $derived(quantity * selectedServing.size);
</script>

<div class="wrapper">
    <div class="row right">
        <TransparentButton onclick={() => onCancel()} Icon={CrossIcon} />
    </div>
    <div id="intro-info" class="apart">
        <img src={foodThumbnailSrc} alt={"picture of " + food_item.name} />
        <div>
            <h3>{food_item.name}</h3>
            <span>{food_item.brand}</span>
            <span>{food_item.author}</span>

            <div>
                <label for="quantity">Amount: </label>
                <input type="number" name="quantity" bind:value={quantity} />
                <span>{`(${totalSize} g)`}</span>
            </div>

            <div>
                <label for="serving">Serving: </label>
                <select name="serving" id="" bind:value={selectedServing}>
                    {#each servings as serving}
                        <option value={serving}>{serving.name}</option>
                    {/each}
                </select>
            </div>
            <button>add</button>
        </div>
    </div>
    <hr />
    {#if food_item}
        <NutritionalInfo
            grams={totalSize}
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

    #intro-info {
        height: 12rem;
        min-width: 0;
        gap: 1rem;
    }

    #intro-info > img {
        flex: 1;
        height: 100%;
        object-fit: contain;
        min-width: 0;
    }

    #intro-info > div {
        flex: 1;
        min-width: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0.25rem;
        text-align: end;
    }
</style>
