<script lang="ts">
    export let click: (e: Event) => void = () => {};
    let className = '';
    export { className as class };
</script>

<div class="context-item {className}" on:click={click}>
    <slot name="icon" />
    <slot />
</div>

<style lang="scss">
    .context-item {
        display: flex;
        gap: 0.3em;
        align-items: center;
        opacity: 0.7;
        padding: 0.2em 1em;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        border: 1px solid transparent;
        border-left: none;
        border-right: none;

        &:hover {
            opacity: 1;
            color: var(--color-off-primary);
            border: 1px solid var(--color-off-primary);
            border-left: none;
            border-right: none;
        }
    }
</style>
