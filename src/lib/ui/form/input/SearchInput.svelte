<script lang="ts">
    let { value = $bindable(""), placeholder = "", type = "text" } = $props();
</script>

<input {type} bind:value {placeholder} />

<style>
    input {
        background-color: var(--tertiary-color);
        height: 3rem;

        border-radius: 0.5em;
        border: none;
        padding: 0 1rem;
        margin: 0.5rem;
        outline: none;
    }
</style>
