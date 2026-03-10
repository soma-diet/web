<script lang="ts">
  import { signInWithGoogle } from "../../api";
  import { isAuthLoading, isLoggedIn } from "../../stores/auth.store";
  import GoogleSignInButton from "../../ui/ext/GoogleSignInButton.svelte";
  import LabeledHorizontalRule from "../../ui/util/LabeledHorizontalRule.svelte";
  import LoadingEffect from "../../ui/util/LoadingEffect.svelte";
  import Prompt from "../../ui/util/Prompt.svelte";
  import Shadeout from "../../ui/util/Shadeout.svelte";
</script>

<Shadeout>
  {#if $isAuthLoading}
    <LoadingEffect />
  {:else}
    <Prompt>
      <div id="content" class="col apart center">
        {#if !$isLoggedIn}
          <div id="classic" class="col top center">
            <h1>Sign In</h1>
            <span>not imlemented</span>
          </div>

          <div id="oauth" class="col center">
            <LabeledHorizontalRule
              ><span class="sub">or sign in with</span></LabeledHorizontalRule
            >
            <GoogleSignInButton onclick={signInWithGoogle} />
          </div>
        {:else}
          <span>unexpected state</span>
          <span class="sub">this page requires an account to use</span>
        {/if}
      </div>
    </Prompt>
  {/if}
</Shadeout>

<style>
  #content {
    height: 100%;
    padding: 2rem;
    gap: 1rem;
  }

  #oauth {
    gap: 0.5rem;
    width: 100%;
  }

  .sub {
    font-style: italic;
  }
</style>
