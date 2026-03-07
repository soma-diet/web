<script lang="ts">
    import { SAMPLE_LOG_ENTRY } from "../../sample/SampleLogEntry";
    import TransparentButton from "../ui/action/TransparentButton.svelte";
    import LogItem from "../ui/list/LogItem.svelte";

    import backIcon from "../../../assets/icon/back.svg?raw";
    import forwardIcon from "../../../assets/icon/forward.svg?raw";

    let entries = [SAMPLE_LOG_ENTRY];
</script>

<nav class="apart center">
    <div class="left center">
        <TransparentButton
            onclick={() => null}
            icon={backIcon}
            class="date-button"
        />
        <h3>03.06.2026</h3>
    </div>
    <TransparentButton
        onclick={() => null}
        icon={forwardIcon}
        class="date-button"
    />
</nav>
<div>
    <span>daily targets progress bar</span>
</div>
<ul>
    <hr />
    {#each entries as entry}
        <li>
            <LogItem
                name={entry.itemName}
                subtext={`${entry.quantity} ${entry.servingName}`}
                itemType={entry.itemType}
            />
        </li>
        <hr />
    {/each}
</ul>

<style>
    nav {
        padding: 1rem;
    }

    :global(.date-button) {
        width: 2.5rem;
    }

    ul {
        flex-grow: 1;
        overflow-y: auto;
    }

    hr {
        border: 1px solid black;
    }
</style>
