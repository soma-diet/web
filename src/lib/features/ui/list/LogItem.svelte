<script lang="ts">
    import recipeIcon from "../../../../assets/icon/recipe.svg?raw";
    import foodIcon from "../../../../assets/icon/food.svg?raw";
    import { TrackableType } from "../../../model/TrackableType";

    interface Props {
        name: string;
        subtext: string;
        itemType: TrackableType;
        kcal?: number;
        onclick?: () => null;
    }

    let {
        name,
        subtext,
        kcal,
        itemType,
        onclick = () => null,
    }: Props = $props();
</script>

<button class="wrapper" {onclick}>
    <div class="row left">
        {#if itemType == TrackableType.FOOD}
            {@html foodIcon}
        {:else if itemType == TrackableType.RECIPE}
            {@html recipeIcon}
        {/if}

        <div class="details">
            <h5 class="item-name">
                {name}
            </h5>
            <span>{subtext}</span>
        </div>
    </div>
    {#if kcal}
        <span>{kcal} kcal</span>
    {/if}
</button>

<style>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5em;
        gap: 1em;
        background-color: var(--tertiary-color);
        width: 100%;
        border: none;
    }

    .wrapper:hover {
        cursor: pointer;
        background-color: var(--quadratery-color);
    }

    .wrapper:hover span {
        color: var(--secondary-color);
    }

    span {
        color: var(--subtle-color);
        font-size: 80%;
    }

    .wrapper > span {
        white-space: nowrap;
    }

    .row.left {
        gap: 0.5rem;
        min-width: 0;
    }

    .details {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 0.25em;
        min-width: 0;
    }

    .item-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        margin: 0;
    }
</style>
