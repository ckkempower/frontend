<script lang="ts">
    import { fly } from 'svelte/transition';
    import Cross from '../svg/Cross.svelte';
    export let handleClose: () => void;
    export let visible: boolean;
</script>

{#if visible}
    <div class="modal">
        <div
            class="modal-content light-theme"
            transition:fly={{ y: 100, duration: 200 }}
        >
            <div class="modal-header">
                <slot name="header" />
                <span class="close" title="close" on:click={handleClose}>
                    <Cross />
                </span>
            </div>
            <slot />
        </div>
    </div>
{/if}

<style lang="scss">
    .modal {
        position: fixed;
        z-index: 20;
        background-color: transparent;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .close {
        cursor: pointer;
        color: var(--color-medium);
        transition: all 0.2s ease-in-out;
        &:hover {
            color: var(--color-warning-dark);
        }
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1em;
    }

    .modal-content {
        border-radius: 15px;
        box-shadow: 0px 2px 20px rgba(209, 209, 209, 0.2);
    }
</style>
