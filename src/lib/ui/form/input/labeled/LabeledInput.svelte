<script lang="ts">
  interface Props {
    label: string;
    name?: string | null;
    value: any;
    type: string;
    step?: string | null;
    oninput: (e: Event) => void;
  }

  let { label, name, value, type, step, oninput }: Props = $props();
</script>

<div>
  <label for={name}>{label}</label>
  <input {type} {name} {value} {step} {oninput} />
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
