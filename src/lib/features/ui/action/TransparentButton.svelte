<script lang="ts">
    import type { Component } from "svelte";

    interface Props {
        Icon: Component;
        onclick: () => void;
        class?: string;
    }

    let { Icon, onclick, class: className = "" }: Props = $props();
</script>

<button {onclick} class=" {className}">
    <Icon></Icon>
</button>

<style>
    button {
        padding: 0;
        border: none;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button:hover {
        cursor: pointer;
    }

    button :global(svg) {
        width: 100%;
        height: 100%;
    }
</style>
