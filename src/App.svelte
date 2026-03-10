<script lang="ts">
  import AuthPrompt from "./lib/features/auth/AuthPrompt.svelte";
  import Header from "./lib/features/layout/Header.svelte";
  import Content from "./lib/features/layout/Content.svelte";
  import { authLoading, isLoggedIn } from "./lib/stores/auth.store";
</script>

{#if $authLoading || !$isLoggedIn}
  <AuthPrompt />
{/if}

<div id="content">
  <Header />
  <Content />
</div>

<style>
  #content {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1px;
    height: 100%;
    width: 100%;
    background-color: var(--border-color);
  }
</style>
