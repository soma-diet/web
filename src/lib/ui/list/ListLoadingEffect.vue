<script setup lang="ts">
import LoadingEffect from '../util/LoadingEffect.vue';

</script>

<template>
    <div class="wrapper">
        <LoadingEffect />
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
}
</style>
