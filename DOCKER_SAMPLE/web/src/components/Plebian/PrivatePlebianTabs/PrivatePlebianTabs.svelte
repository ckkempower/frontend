<script lang="ts">
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import type { PlebianTab } from '../PlebianTabContext.svelte';
    import Video from './Video/Video.svelte';

    let tab: Writable<PlebianTab> = getContext('plebian-tab');
</script>

{#if $tab === 'plebian'}
    <h1>Plebian</h1>
{/if}

{#if $tab === 'video'}
    <Video />
{/if}

{#if $tab === 'power'}
    <h1>Power</h1>
{/if}
