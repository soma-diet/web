<script lang="ts">
    import type { User } from "firebase/auth";
    import { registerWithGoogle } from "../../api";
    import {
        authLoading,
        authUser,
        isAuthLoading,
        isLoggedIn,
    } from "../../stores/auth.store";
    import LabeledHorizontalRule from "../ui/util/LabeledHorizontalRule.svelte";
    import LoadingEffect from "../ui/util/LoadingEffect.svelte";
    import Prompt from "../ui/util/Prompt.svelte";
    import Shadeout from "../ui/util/Shadeout.svelte";
    import GoogleSignInButton from "../ui/ext/GoogleSignInButton.svelte";

    /* authLoading.subscribe((loading: boolean) => {
        console.log("auth loading:", loading);
    });
    authUser.subscribe((user: User | null) => {
        console.log(
            "anonym:",
            user?.isAnonymous,
            "logged in",
            $isLoggedIn,
            "token",
            user?.getIdToken(),
        );
    }); */
</script>

<Shadeout>
    <Prompt>
        <div id="content" class="col apart center">
            {#if $isAuthLoading}
                <LoadingEffect />
            {:else if !$isLoggedIn}
                <div id="classic" class="col top center">
                    <h1>Sign In</h1>
                    <span>not imlemented</span>
                </div>

                <div id="oauth" class="col center">
                    <LabeledHorizontalRule
                        ><span class="sub">or sign in with</span
                        ></LabeledHorizontalRule
                    >
                    <GoogleSignInButton onclick={registerWithGoogle} />
                </div>
            {:else}
                <span>unexpected state</span>
            {/if}
            <span class="sub">this page requires an account to use</span>
        </div>
    </Prompt>
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
