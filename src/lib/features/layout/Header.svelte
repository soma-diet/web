<script lang="ts">
    import somaLogoSvg from "../../../assets/icon/logo.svg?raw";
</script>

<header class="apart center">
    <div class="left center">
        {@html somaLogoSvg}
        <h1>SOMA</h1>
    </div>
    <div id="actions" class="right center">
        <a href="#actions">register</a>
        <a href="#actions">log in</a>
        <a href="#actions">targets</a>
    </div>
</header>

<style>
    header {
        background-color: var(--primary-color);
        padding: 1rem;
        height: 5rem;
    }

    header > div {
        height: 100%;
        gap: 1rem;
    }

    header > div :global(svg) {
        height: 100%;
        width: auto;
    }

    h1 {
        color: var(--secondary-color);
        margin: 0;
    }

    #actions a {
        color: var(--secondary-color);
        font-size: 125%;
        text-decoration: none;
        font-style: italic;
    }
    #actions a:hover {
        color: var(--pentarery-color);
    }
</style>
