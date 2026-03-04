<script lang="ts">
    import type { Component } from "svelte";

    interface Props {
        Icon: Component;
        name: string;
        subtext: string;
        kcal: number;
    }

    let { Icon, name, subtext, kcal }: Props = $props();
</script>

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

<style>
    span {
        color: var(--span-color, var(--subtle-color));
        font-size: 80%;
    }

    .left {
        display: flex;
        gap: 0.5rem;
    }

    .details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.25em;
    }

    .item-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        margin: 0;
    }
</style>
