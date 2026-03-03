<script lang="ts">
    import type { FoodItem } from "../../api/food_search";

    // prijmout itemy z rodice
    let { items = [] as FoodItem[], onLoadMore } = $props();

    function handleScroll(e: Event) {
        const el = e.target as HTMLElement;

        // vypocet toho zda uz doscrolloval dolu
        const isBottom =
            el.scrollTop + el.clientHeight >= el.scrollHeight - 200;
        if (isBottom && onLoadMore) {
            console.log("loading more");
            onLoadMore();
        }
    }
</script>

<ul onscroll={handleScroll}>
    <hr />
    {#if items.length > 0}
        {#each items as item}
            <li>
                <div class="col">
                    <h5 class="item-name">
                        {item.name}
                    </h5>
                    <span>{item.brand ?? "GENERIC"}</span>
                </div>
                <span>{item.macronutrients.kcal} kcal</span>
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

    li {
        background-color: var(--tertiary-color);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0.5em;
        gap: 1em;
    }

    .item-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        margin: 0;
    }

    li > div {
        gap: 0.25em;
    }

    li span {
        color: var(--subtle-color);
        font-size: 80%;
    }

    hr {
        border: 1px solid black;
    }

    li:hover span {
        color: var(--secondary-color);
    }

    li:hover {
        cursor: pointer;
        background-color: var(--quadratery-color);
    }
</style>
