<script lang="ts">
    import type { FoodItem } from "../../api/interface";
    import RecipeIcon from "../ui/icon/RecipeIcon.svelte";
    import LogItem from "../ui/LogItem.svelte";

    // prijmout itemy z rodice
    let { items = [] as FoodItem[], onLoadMore } = $props();

    function handleScroll(e: Event) {
        const el = e.target as HTMLElement;

        // vypocet toho zda uz doscrolloval dolu
        const isBottom =
            el.scrollTop + el.clientHeight >= el.scrollHeight - 200;
        if (isBottom && onLoadMore) {
            setTimeout(onLoadMore, 50);
        }
    }
</script>

<ul onscroll={handleScroll}>
    <hr />
    {#if items.length > 0}
        {#each items as item}
            <li>
                <LogItem
                    Icon={RecipeIcon}
                    name={item.name}
                    subtext={item.brand ?? "GENERIC"}
                    kcal={item.macronutrients.kcal}
                />
            </li>
            <hr />
        {/each}
    {/if}
</ul>

<style>
    ul {
        flex-grow: 1;
        overflow-y: auto;
    }

    hr {
        border: 1px solid var(--secondary-color);
    }

    li {
        background-color: var(--tertiary-color);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0.5em;
        gap: 1em;
    }

    li:hover {
        --span-color: var(--secondary-color);
        cursor: pointer;
        background-color: var(--quadratery-color);
    }
</style>
