<script lang="ts">
    import LoggedOutHeader from './LoggedOutHeader.svelte';
</script>

<LoggedOutHeader>
    <slot slot="header-left" name="header-left" />
    <div class="right" slot="header-right">
        <slot name="header-right" />
    </div>
</LoggedOutHeader>
<main class="page-container dark-theme">
    <slot />
</main>
