<script lang="ts">
    let isMobile = window.innerWidth < 768;
</script>

{#if isMobile}
    <slot name="mobile" />
{:else}
    <slot name="desktop" />
{/if}
