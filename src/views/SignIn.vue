<script setup lang="ts">
import AuthForm from "@/lib/features/auth/AuthForm.vue";
import { useMobile } from "@/lib/stores/mobile.store";
import RotatingSomaLogo from "@/lib/ui/animated/RotatingSomaLogo.vue";

const { isMobile } = useMobile();
</script>

<template>
  <main>
    <section
      :class="{ 'bevel bevel-tr bevel-br': !isMobile }"
      class="center middle"
    >
      <div class="background-wrapper center middle">
        <RotatingSomaLogo :duration="5" :delay="3" />
      </div>
    </section>
    <section :class="{ 'bevel bevel-tl bevel-bl': !isMobile }">
      <AuthForm />
    </section>
  </main>
</template>

<style scoped>
.background-wrapper {
  width: 100%;
  height: 100%;
  padding: 10vh 15vw;
}

section:first-child {
  flex: 3;
}
section:last-child {
  flex: 2;
}

@media (max-width: 786px) {
  .background-wrapper {
    width: 50%;
    margin-top: 3rem;
    padding: 2rem;
  }

  main {
    gap: 0;
  }
  section:first-child {
    flex-shrink: 1;
  }
  section:last-child {
    flex: 5;
  }
}
</style>
