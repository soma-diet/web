<script lang="ts">
    import { SAMPLE_LOG_ENTRY } from "../../sample/SampleLogEntry";
    import FoodIcon from "../ui/icon/FoodIcon.svelte";
    import LogItem from "../ui/list/LogItem.svelte";

    let entries = [SAMPLE_LOG_ENTRY];
</script>

<div>
    <div>
        <button>&lt;</button>
        <span>03.06.2026</span>
    </div>
    <button>&gt;</button>
</div>
<div>
    <span>daily targets progress bar</span>
</div>
<ul>
    <hr />
    {#each entries as entry}
        <li>
            <LogItem
                Icon={FoodIcon}
                name={entry.itemName}
                subtext={`${entry.quantity} ${entry.servingName}`}
                kcal={entry.item.kcal}
            />
        </li>
        <hr />
    {/each}
</ul>

<style>
    ul {
        flex-grow: 1;
        overflow-y: auto;
    }

    hr {
        border: 1px solid black;
    }
</style>
