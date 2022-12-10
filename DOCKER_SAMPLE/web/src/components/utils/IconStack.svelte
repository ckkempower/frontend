<script lang="ts">
    let className: string = '';
    export { className as class };
</script>

<span class="icon-stack {className}">
    <slot />
    <slot name="text" />
</span>

<style lang="scss">
    .icon-stack {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
    }
</style>
