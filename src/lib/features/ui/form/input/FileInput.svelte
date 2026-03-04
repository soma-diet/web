<script lang="ts">
    interface Props {
        label: string;
        name: string;
    }
    let { label = "Upload a file", name }: Props = $props();
</script>

<label for={name}>{label}</label>
<input type="file" {name} />
