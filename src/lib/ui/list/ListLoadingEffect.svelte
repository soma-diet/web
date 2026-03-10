<script lang="ts">
    import LoadingEffect from "../util/LoadingEffect.svelte";
</script>

<div class="wrapper">
    <LoadingEffect />
</div>

<style>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex-grow: 1;
        padding-bottom: 4rem;
    }
</style>
