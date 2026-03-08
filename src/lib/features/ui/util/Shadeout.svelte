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
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.753);
        z-index: 9999;
    }
</style>
