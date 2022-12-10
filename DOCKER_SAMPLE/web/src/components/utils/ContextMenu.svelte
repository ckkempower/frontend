<script lang="ts">
    import { browser } from '$app/env';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    export let inline = false;
    let contextMenu: HTMLDivElement;
    let visible = false;
    let loaded = false;
    let coordinates = writable<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    const normalizePosition = (mouseX: number, mouseY: number) => {
        if (!browser) return { x: 0, y: 0 };
        const scope = document.body;
        const { left: scopeOffsetX, top: scopeOffsetY } =
            scope.getBoundingClientRect();

        const scopeX = mouseX - scopeOffsetX;
        const scopeY = mouseY - scopeOffsetY;
        const maxWidth = scope.clientWidth - 5;
        const maxHeight = scope.clientHeight - 5;

        // ? check if the element will go out of bounds
        const outOfBoundsOnX = scopeX + contextMenu.clientWidth > maxWidth;

        const outOfBoundsOnY = scopeY + contextMenu.clientHeight > maxHeight;

        let x = mouseX;
        let y = mouseY;

        // ? normalzie on X
        if (outOfBoundsOnX) {
            x = scopeOffsetX + maxWidth - contextMenu.clientWidth;
        }

        // ? normalize on Y
        if (outOfBoundsOnY) {
            y = scopeOffsetY + maxHeight - contextMenu.clientHeight;
        }

        return { x, y };
    };

    const openContextMenu = (
        e: Event & { clientX: number; clientY: number }
    ) => {
        e.preventDefault();
        e.stopPropagation();
        if (!browser) return;
        visible = true;
        const { clientX: mouseX, clientY: mouseY } = e;
        setTimeout(() => {
            $coordinates = normalizePosition(mouseX, mouseY);
            loaded = true;
        }, 1);
    };
</script>

<svelte:window
    on:click={() => {
        visible = false;
        loaded = false;
    }}
/>
{#if visible}
    <div
        style="left: {$coordinates.x}px; top: {$coordinates.y}px"
        bind:this={contextMenu}
        class:loaded
        class="context-menu light-theme"
        on:click={(e) => {
            e.stopPropagation();
        }}
    >
        <slot name="menu" />
    </div>
{/if}
<div class="context-target" class:inline on:click={openContextMenu}>
    <slot />
</div>

<style>
    .context-target {
        cursor: pointer;
        z-index: 1001;
    }

    .inline {
        display: inline;
    }
    .loaded {
        opacity: 1 !important;
    }

    .context-menu {
        position: fixed;
        width: max-content;
        max-width: 100vw;
        opacity: 0;
        border-radius: 10px;
        border: 2px solid var(--color-medium);
        display: flex;
        padding: 0.5em 0;
        flex-direction: column;
    }
</style>
