<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        children,
        class: className = "",
    }: { children: Snippet; class?: string } = $props();
</script>

<div class="col middle center {className}">
    {@render children()}
</div>

<style>
    div {
        background-color: var(--primary-color);
        border: 1px solid var(--secondary-color);
    }
</style>
