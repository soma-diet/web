<template>
  <div class="wrapper">
    <span>
      <slot />
    </span>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  padding-bottom: 4rem;
  height: 100%;
}
</style>
