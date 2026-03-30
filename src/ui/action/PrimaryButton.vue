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

  @media print {
    /*
      Source - https://stackoverflow.com/a/79741490
      Posted by gre_gor
      Retrieved 2026-03-29, License - CC BY-SA 4.0
    */
    color: rgb(from var(--text-main) calc(255 - r) calc(255 - g) calc(255 - b));
  }

  @media (min-width: 2560px) {
    font-size: 150%;
    padding: 1.5rem 2rem;
  }
}

button:hover {
  background-color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

button:disabled {
  color: var(--text-dim);
  background-color: var(--bg-surface);
  border-color: var(--border-main);

  cursor: not-allowed;
}
</style>
