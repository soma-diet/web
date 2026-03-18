<script setup lang="ts">
import { useAuthStore } from "@/lib/stores";
import { signInWithGitHub, signInWithGoogle } from "../../api";
import GoogleSignInButton from "../../ui/ext/GoogleSignInButton.vue";
import LabeledHorizontalRule from "../../ui/util/LabeledHorizontalRule.vue";

const { authState } = useAuthStore();
</script>

<template>
  <div class="col apart center content">
    <div id="classic" class="col top center">
      <h1>Sign In</h1>
      <span>not imlemented</span>
    </div>
    <div class="col center oauth">
      <LabeledHorizontalRule><span class="sub">or sign in with</span></LabeledHorizontalRule>
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

.oauth {
  gap: 0.5rem;
  width: 100%;
}

.sub {
  font-style: italic;
}
</style>
