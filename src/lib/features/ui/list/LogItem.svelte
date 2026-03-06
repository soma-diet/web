<script lang="ts">
    import type { Component } from "svelte";

    interface Props {
        Icon: Component;
        name: string;
        subtext: string;
        kcal: number;
        onclick: () => null;
    }

    let { Icon, name, subtext, kcal, onclick = () => null }: Props = $props();

    function handleOnWrapperKeypress() {
        onclick();
    }
</script>

<div class="wrapper" onkeydown={() => {}} tabindex="0">
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
</div>

<style>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5em;
        gap: 1em;
        background-color: var(--tertiary-color);
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

    .left {
        display: flex;
        gap: 0.5rem;
        min-width: 0;
    }

    .details {
        display: flex;
        flex-direction: column;
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
