<script lang="ts">
    import type { Component } from "svelte";

    interface Props {
        Icon: Component;
        name: string;
        subtext: string;
        kcal: number;
        onclick?: () => null;
    }

    let { Icon, name, subtext, kcal, onclick = () => null }: Props = $props();
</script>

<button class="wrapper" {onclick}>
    <div class="left">
        <Icon></Icon>
        <div class="details">
            <h5 class="item-name">
                {name}
            </h5>
            <span>{subtext}</span>
        </div>
    </div>
    <span>{kcal} kcal</span>
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

    .left {
        display: flex;
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
