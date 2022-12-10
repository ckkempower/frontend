<script lang="ts">
    import { userStore } from 'src/stores';
</script>

{#if !$userStore.fetching && $userStore.user}
    <slot />
{/if}
