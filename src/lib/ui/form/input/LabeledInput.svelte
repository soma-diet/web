<script lang="ts">
    interface Props {
        label: string;
        name: string;
        value: string;
        type: string;
    }

    let { label, name, value, type }: Props = $props();
</script>

<div>
    <label for={name}>{label}</label>
    <input {type} {name} {value} />
</div>

<style>
    div {
        display: flex;
    }

    label {
        flex: 1;
    }

    input {
        flex: 2;
    }
</style>
