<script lang="ts">
    interface Props {
        icon: string;
        onclick: () => void;
        class?: string;
    }

    let { icon, onclick, class: className = "" }: Props = $props();
</script>

<button {onclick} class=" {className}">
    {@html icon}
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
