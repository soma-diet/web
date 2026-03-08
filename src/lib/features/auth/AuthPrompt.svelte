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
    <Prompt class="prompt">
        {#if $isAuthLoading}
            <LoadingEffect />
        {:else if !$isLoggedIn}
            <h2>Register to SOMA</h2>
            <p>email? and password?</p>
            <LabeledHorizontalRule
                ><span>or sign in with</span></LabeledHorizontalRule
            >
            <button on:click={registerWithGoogle}>sign in with Google</button>
        {:else}
            <span>unexpected state</span>
        {/if}
    </Prompt>
</Shadeout>

<style>
    /* TODO zmenit na neco co nevyuziva :global, nabizi se wrapper nebo nejaka knihovna */
    :global(.prompt) {
        padding: 2rem;
    }
</style>
