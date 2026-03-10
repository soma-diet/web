<script lang="ts">
    interface Props {
        label: string;
        name: string;
        value: string;
    }

    let { label, name, value }: Props = $props();
</script>

<div>
    <label for={name}>{label}</label>
    <input {name} {value} />
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
