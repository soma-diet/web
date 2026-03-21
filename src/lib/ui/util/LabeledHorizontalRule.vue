<template>
    <div class="separator">
        <slot />
    </div>
</template>

<style scoped>
/*
    Source - https://stackoverflow.com/a/26634224
    Posted by MatTheCat, modified by community. See post 'Timeline' for change history
    Retrieved 2026-03-08, License - CC BY-SA 4.0
    */

.separator {
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
}

.separator::before,
.separator::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid var(--border-main);
}

.separator:not(:empty)::before {
    margin-right: 0.25em;
}

.separator:not(:empty)::after {
    margin-left: 0.25em;
}
</style>
