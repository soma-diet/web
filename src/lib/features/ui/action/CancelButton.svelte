<script lang="ts">
    import CrossIcon from "../icon/CrossIcon.svelte";

    interface Props {
        onclick: () => null;
    }

    let { onclick }: Props = $props();
</script>

<button {onclick}>
    <CrossIcon />
</button>

<style>
    button {
        padding: 0;
        border: none;
        background-color: transparent;
    }

    button:hover {
        cursor: pointer;
    }
</style>
