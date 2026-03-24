<script setup lang="ts">
import { signInWithGitHub, signInWithGoogle } from "../../api";
import GoogleSignInButton from "../../ui/ext/GoogleSignInButton.vue";
import LabeledHorizontalRule from "../../ui/util/LabeledHorizontalRule.vue";
</script>

<template>
  <div class="col center middle content">
    <div class="description center col">
      <h1>SOMA</h1>
      <p class="italic">hit your diet goals without the guesswork</p>
    </div>
    <LabeledHorizontalRule><span>please sign in with</span></LabeledHorizontalRule>
    <div class="col center oauth">
      <GoogleSignInButton @click="signInWithGoogle" />
      <GitHubSignInButton @click="signInWithGitHub" />
    </div>
  </div>
</template>

<style scoped>
.content {
  height: 100%;
  padding: 2rem;
  gap: 1rem;
}

.content>div,
.description {
  gap: 0.5rem;
  width: 100%;
}
</style>
