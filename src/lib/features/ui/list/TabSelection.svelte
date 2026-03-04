<script lang="ts">
    let { selected = $bindable(), options = [] } = $props();
</script>

<div>
    {#each options as opt}
        <button
            class:selected={opt === selected}
            onclick={() => (selected = opt)}
        >
            {opt}
        </button>
    {/each}
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
    }

    button {
        background-color: var(--tertiary-color);
        height: 2rem;
        width: 100%;
    }

    button:hover {
        background-color: var(--quadratery-color);
        cursor: pointer;
    }

    button.selected {
        background-color: var(--subtle-color);
    }
</style>
