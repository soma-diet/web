<script lang="ts">
  import type { Food } from "../../model";
    import FileInput from "../ui/form/input/FileInput.svelte";
    import LabeledTextInput from "../ui/form/input/LabeledTextInput.svelte";

    interface Props {
        editedFood?: Food | null;
    }
    let { editedFood = null }: Props = $props();
</script>

<form>
    <div class="intro">
        <img
            src="https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/7de863efbfe0eef06f7a66c1e97201ec/Derivates/d5754b87aaaccfe716bc2615afd93dad9c6e73d7.jpg"
            alt="food"
        />
        <ul>
            <LabeledTextInput label="Food name" name="name" value="" />
            <LabeledTextInput label="Brand" name="brand" value="" />

            <!-- TODO kandidat na Drag&drop -->
            <FileInput label="Change food image" name="image" />
        </ul>
    </div>

    <ul>
        <LabeledTextInput label="Carbohydrates" name="carbs" value="" />
        <LabeledTextInput label="Protein" name="protein" value="" />
        <LabeledTextInput label="Fats" name="fats" value="" />
        <LabeledTextInput label="Fiber" name="fiber" value="" />
        <LabeledTextInput label="Sodium" name="sodium" value="" />
    </ul>
    <button type="submit"
        >{editedFood ? "save changes" : "create new food"}</button
    >
</form>

<style>
    form {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        gap: 0.75rem;
    }

    .intro {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: start;
        gap: 1rem;
    }
    .intro > ul {
        flex: 2;

        /* zarizuji ze nebude pretekat svoji width assignutou dynamicky pomoci flex vlastnosti*/
        min-width: 0;
        width: 100%;
    }

    img {
        flex: 1;
        object-fit: contain;
        min-width: 0;
        width: 100%;
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        justify-content: space-between;
    }
</style>
