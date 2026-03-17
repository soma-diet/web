<template>
    <button type="button">
        <slot />
    </button>
</template>

<style scoped>
button {
    padding: 0;
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}

button:hover {
    cursor: pointer;
}

button :deep(svg) {
    width: 100%;
    height: 100%;
}
</style>
