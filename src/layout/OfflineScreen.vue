<template>
  <main>
    <section class="center middle">
      <div class="col center middle">
        <RotatingSomaLogo :duration="5" :delay="1" class="logo" />
        <h1 class="accent-heading">Offline</h1>
        <span class="italic">this site requires an internet connection, please connect to a network</span>
      </div>
    </section>
  </main>
</template>

<style scoped>
main, section {
  width: 100vw;
  height: 100vh;
}

h1 {
  font-size: 200%;
}

.logo {
  margin: 1rem 0;
  width: 75%;
}

div {
  gap: 0.75rem;
  padding: 1rem;
  text-align: center;
  width: 20rem;
}

div:hover {
  border-color: var(--color-accent);
  transition: 0.5s all;
}
</style>