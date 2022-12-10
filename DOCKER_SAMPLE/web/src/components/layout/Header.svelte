<header class="header dark-theme">
    <div class="left">
        <slot name="header-left" />
    </div>

    <div class="right">
        <slot name="header-right" />
    </div>
</header>

<style lang="scss">
    .left,
    .right {
        display: flex;
        align-items: center;
    }
    .header {
        padding: 1em;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
