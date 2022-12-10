<script lang="ts">
    import Gear from 'src/components/svg/Gear.svelte';
    import ContextItem from 'src/components/utils/ContextItem.svelte';
    import ContextMenu from 'src/components/utils/ContextMenu.svelte';
</script>

<main class="dark-theme page-container centered">
    <ContextMenu>
        <div class="menu" slot="menu">
            <a href="/" class="no-underline">
                <ContextItem>
                    <Gear size="1.5em" slot="icon" />
                    Settings
                </ContextItem>
            </a>
        </div>
        <button>Open Context Menu</button>
    </ContextMenu>
</main>

<style lang="scss">
</style>
