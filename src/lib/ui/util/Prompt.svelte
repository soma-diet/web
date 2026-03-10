<script lang="ts">
    import type { Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
</script>

<div class="wrapper stretch-h stretch-v">
    <div class="col middle">
        {@render children()}
    </div>
</div>

<style>
    .wrapper {
        /* bevel border cutout + color */
        padding: 1px;
        background-color: var(--secondary-color);

        /* surrounding shadow (symmetrical) */
        filter: drop-shadow(0px 0px 40px var(--primary-color));
    }

    .wrapper > div {
        background-color: var(--primary-color);

        clip-path: polygon(
            7px 0%,
            /* Top-left (start) */ calc(100% - 7px) 0%,
            /* Top-right (start) */ 100% 7px,
            /* Top-right (drop down) */ 100% calc(100% - 7px),
            /* Bottom-right (start) */ calc(100% - 7px) 100%,
            /* Bottom-right (drop left) */ 7px 100%,
            /* Bottom-left (start) */ 0% calc(100% - 7px),
            /* Bottom-left (drop up) */ 0% 7px /* Top-left (finish) */
        );
    }
</style>
