<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        class?: string;
    }
    let { children, class: className = "" }: Props = $props();
</script>

<div class="middle center {className}">
    {@render children()}
</div>

<style>
    div {
        width: 100%;
        height: 100%;
        background-color: rgba(1, 1, 1, 0.5);
        z-index: 1;
    }
</style>
