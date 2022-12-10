<script lang="ts">
    import { slide } from 'svelte/transition';
    import Cross from '../svg/Cross.svelte';

    export let files: File[] | undefined = undefined;

    const handleRemove = () => {
        files = undefined;
    };
</script>

{#if files?.length}
    <div class="file-list" transition:slide|local>
        {#each files as file}
            <div class="file-list-item" transition:slide|local>
                <span class="icon" title="Remove" on:click={handleRemove}>
                    <Cross />
                </span>
                <span class="file-name">
                    {file.name}
                </span>
            </div>
        {/each}
    </div>
{/if}

<style lang="scss">
    .file-list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5em;
    }
    .icon {
        width: 1em;
        height: 1em;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        &:hover {
            color: var(--color-warning);
        }
    }
</style>
