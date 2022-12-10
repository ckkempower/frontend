<script lang="ts">
    import LoggedInHeader from './LoggedInHeader.svelte';
    import NavItems from '../utils/NavItems.svelte';

    let className = 'dark-theme';
    export { className as class };
</script>

<LoggedInHeader>
    <slot slot="header-left" name="header-left" />
    <slot slot="header-right" name="header-right" />
</LoggedInHeader>
<div class="page-container sidebar-layout {className}">
    <aside class="sidebar">
        <nav>
            <NavItems />
        </nav>
    </aside>
    <main class="content">
        <slot />
    </main>
</div>

<style lang="scss">
    .sidebar-layout {
        $mobile-cutoff: 768px;

        display: flex;
        flex-direction: row;
        @media (max-width: $mobile-cutoff) {
            flex-direction: column-reverse;
        }
        .content {
            flex: 1;
        }
        .current {
            color: var(--color-primary);
        }
        flex-wrap: wrap-reverse;
        .sidebar nav {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            gap: 1em;
            height: 100%;
            justify-content: center;
            padding: 1em;
            @media (max-width: $mobile-cutoff) {
                flex-direction: row;
                align-items: center;
                justify-content: center;
                padding: 0.5em;
            }
        }
    }
</style>
