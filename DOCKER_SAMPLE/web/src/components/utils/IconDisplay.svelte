<script lang="ts">
    export let type: 'light' | 'medium' | 'dark' = 'light';
    export let height = '1.6em';
</script>

<span class="power-count {type}">
    <span class="icon">
        <slot name="icon" />
    </span>
    <strong class="amount" style="--height: {height}">
        <slot />
    </strong>
</span>

<style lang="scss">
    .icon,
    .amount {
        display: block;
        font-size: var(--height);
    }

    .power-count {
        display: flex;
        align-items: center;
        gap: 0.2em;
    }
    .light {
        color: var(--color-light);
    }
    .medium {
        color: var(--color-off-dark);
    }
    .dark {
        color: var(--color-dark);
    }
</style>
