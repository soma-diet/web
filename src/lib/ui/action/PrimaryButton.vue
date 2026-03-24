<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  background-color: var(--color-accent);
  color: var(--text-main);

  width: 100%;
  padding: 0.75rem 1rem;

  border: 1px solid var(--color-accent);

  font-family: var(--font-main);
  font-weight: 800;

  text-transform: uppercase;
  letter-spacing: 0.1em;

  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.85rem;
}

button:hover {
  background-color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);

  /* box-shadow: 0 4px 15px rgba(255, 0, 0, 0.2); */
}

button:disabled {
  color: var(--text-dim);
  background-color: var(--bg-surface);
  border-color: var(--border-main);

  cursor: not-allowed;
}
</style>