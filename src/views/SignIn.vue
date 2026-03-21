  <script setup lang="ts">
  import RotatingSomaLogo from '@/lib/ui/animated/RotatingSomaLogo.vue';

</script>

  <template>
    <main>
      <section class="bevel bevel-tr bevel-br f3 center middle">
        <div class="background-wrapper center middle">
          <RotatingSomaLogo :duration="5" :delay="3" />
        </div>
      </section>
      <section class="bevel bevel-tl bevel-bl f2">
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
</style>