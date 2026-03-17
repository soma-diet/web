<script setup lang="ts">
import { authStore } from "@/lib/stores";
import { signInWithGoogle } from "../../api";
import GoogleSignInButton from "../../ui/ext/GoogleSignInButton.vue";
import LabeledHorizontalRule from "../../ui/util/LabeledHorizontalRule.vue";
import LoadingEffect from "../../ui/util/LoadingEffect.vue";
import Prompt from "../../ui/util/Prompt.vue";
import Shadeout from "../../ui/util/Shadeout.vue";
</script>

<template>
  <Shadeout>
    <LoadingEffect v-if="authStore.isLoading" />
    <Prompt v-else>
      <div class="col apart center content">
        <template v-if="!authStore.isLoggedIn">
          <div id="classic" class="col top center">
            <h1>Sign In</h1>
            <span>not imlemented</span>
          </div>
          <div class="col center oauth">
            <LabeledHorizontalRule><span class="sub">or sign in with</span></LabeledHorizontalRule>
            <GoogleSignInButton @click="signInWithGoogle" />
          </div>
        </template>
        <template v-else>
          <span>unexpected state</span>
          <span class="sub">this page requires an account to use</span>
        </template>
      </div>
    </Prompt>
  </Shadeout>
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
