<script lang="ts">
    import FoodIcon from "../ui/icon/FoodIcon.svelte";
    import LogItem from "../ui/list/LogItem.svelte";

    let testItem = {
        name: "test",
        serving: {
            id: "xjaklsjdlajiw",
            name: "g",
            size: 1239,
        },
        macronutrients: {
            kcal: 193,
        },
    };
    let items = [testItem, testItem, testItem];
</script>

<ul>
    <hr />
    {#each items as item}
        <li>
            <LogItem
                Icon={FoodIcon}
                name={item.name}
                subtext={`${item.serving.size} ${item.serving.name}`}
                kcal={item.macronutrients.kcal}
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
