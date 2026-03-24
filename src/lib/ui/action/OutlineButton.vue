<template>
  <button class="col center middle">
    <slot />
  </button>
</template>

<style scoped>
button {
  padding: 0.5rem;

  border: 1px solid var(--border-main);
  background-color: var(--bg-body);
  color: var(--text-dim);

  transition: all 0.2s;
}

button:hover {
  cursor: pointer;

  background-color: var(--bg-surface);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

button :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>