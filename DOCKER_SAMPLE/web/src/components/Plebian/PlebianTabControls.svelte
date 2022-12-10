<script lang="ts">
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import Plebian from '../svg/icons/Plebian.svelte';
    import Power from '../svg/icons/Power.svelte';
    import Video from '../svg/icons/Video.svelte';
    import type { PlebianTab } from './PlebianTabContext.svelte';
    let tab: Writable<PlebianTab> = getContext('plebian-tab');
</script>

<div class="plebian-tab-controls">
    <button
        class="icon-button"
        on:click={() => tab.set('video')}
        title="Plebian"
        class:active={$tab === 'video'}
    >
        <Video />
    </button>
    <button
        class="icon-button"
        on:click={() => tab.set('power')}
        title="Video"
        class:active={$tab === 'power'}
    >
        <Power />
    </button>
    <button
        class="icon-button"
        on:click={() => tab.set('plebian')}
        title="Power"
        class:active={$tab === 'plebian'}
    >
        <Plebian />
    </button>
</div>

<style lang="scss">
    .plebian-tab-controls {
        display: flex;
        flex-wrap: wrap;
        padding: 0.5em;
        align-items: center;
        justify-content: space-around;
        color: var(--color-medium);
        border-bottom: 2px solid var(--color-dark);
        margin: 0 10%;
    }

    .icon-button {
        --color-active: var(--color-dark);
        all: unset;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        &:hover {
            color: var(--color-active);
        }
        &.active {
            color: var(--color-active);
        }
    }
</style>
