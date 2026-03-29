<template>
  <button type="button" class="col center middle outlined">
    <slot />
  </button>
</template>

<style scoped>
button {
  padding: 0.5em;
  color: var(--text-dim);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  cursor: pointer;

  background-color: var(--bg-surface);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

button :deep(svg) {
  object-fit: contain;
  width: 2em;
  height: 2em;
}

@media (min-width: 2560px) {
  button {
    font-size: 150%;
  }
}
</style>
