<script setup lang="ts">
import { useRouter } from "vue-router";
import { signInWithGitHub, signInWithGoogle } from "../../api";
import LabeledHorizontalRule from "../../ui/util/LabeledHorizontalRule.vue";
import GoogleSignInButton from "./buttons/GoogleSignInButton.vue";
import GitHubSignInButton from "./buttons/GitHubSignInButton.vue";

const router = useRouter();

type Provider = "google" | "github";
const signInMethods = {
  google: signInWithGoogle,
  github: signInWithGitHub,
};
function handleSignIn(provider: Provider) {
  const signInMethod = signInMethods[provider];
  signInMethod()
    .then(() => router.push({ name: "Dashboard" }))
    .catch(() => {
      // TODO handle sign in error
    });
}
</script>

<template>
  <div class="col center middle content">
    <div class="description center col">
      <h1 class="accent-heading">SOMA</h1>
      <p class="italic">hit your diet goals without the guesswork</p>
    </div>
    <LabeledHorizontalRule
      ><span>please sign in with</span></LabeledHorizontalRule
    >
    <div class="col center oauth">
      <GoogleSignInButton @click="() => handleSignIn('google')" />
      <GitHubSignInButton @click="() => handleSignIn('github')" />
    </div>
  </div>
</template>

<style scoped>
.content {
  height: 100%;
  padding: 2rem;
  gap: 1rem;

  div {
    gap: 0.5rem;
    width: 100%;
  }

  h1 {
    font-size: 350%;
  }
}
</style>
