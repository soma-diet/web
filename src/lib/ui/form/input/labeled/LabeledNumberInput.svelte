<!-- LabeledNumberInput -->
<script lang="ts">
  import LabeledInput from "./LabeledInput.svelte";

  interface Props {
    label: string;
    name?: string | null;
    value: any;
    step?: string;
    oninput: (e: Event) => void;
  }

  let {
    label,
    name,
    value = $bindable(""),
    step = "0.1",
    oninput,
  }: Props = $props();
</script>

<LabeledInput type="number" {label} {name} {value} {oninput} {step} />
