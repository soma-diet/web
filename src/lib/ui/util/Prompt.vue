<template>
  <div class="wrapper stretch-h stretch-v">
    <div class="col middle bevel bevel-tl bevel-tr bevel-bl bevel-br">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  /* bevel border cutout + color */
  padding: 1px;
  background-color: var(--bg-body);

  /* surrounding shadow (symmetrical) */
  filter: drop-shadow(0px 0px 40px var(--border-main));
}

.wrapper>div {
  background-color: var(--border-main);
}
</style>
