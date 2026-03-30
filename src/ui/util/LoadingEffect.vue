<!-- https://css-loaders.com/spinner/ -->
 
<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border-radius: 50%;
  background:
    linear-gradient(0deg,
      color-mix(in srgb, var(--color-accent) 50%, transparent) 30%,
      transparent 0 70%,
      var(--color-accent) 0) 50%/8% 100%,
    linear-gradient(90deg,
      color-mix(in srgb, var(--color-accent) 25%, transparent) 30%,
      transparent 0 70%,
      color-mix(in srgb, var(--color-accent) 75%, transparent) 0) 50%/100% 8%;
  background-repeat: no-repeat;
  animation: l23 1s infinite steps(12);
}

.loader::before,
.loader::after {
  content: "";
  grid-area: 1/1;
  border-radius: 50%;
  background: inherit;
  opacity: 0.915;
  transform: rotate(30deg);
}

.loader::after {
  opacity: 0.83;
  transform: rotate(60deg);
}

@keyframes l23 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
