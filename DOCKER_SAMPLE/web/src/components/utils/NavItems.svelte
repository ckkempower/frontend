<script lang="ts">
    import Actions from '../svg/icons/Actions.svelte';
    import Create from '../svg/icons/Create.svelte';
    import Plebian from '../svg/icons/Plebian.svelte';
    import Power from '../svg/icons/Power.svelte';
    import Rank from '../svg/icons/Rank.svelte';
    import IconStack from './IconStack.svelte';
</script>

<a href="/power">
    <IconStack>
        <Power />
        <span slot="text">Power</span>
    </IconStack>
</a>

<a href="ranks">
    <IconStack>
        <Rank />
        <span slot="text">Ranks</span>
    </IconStack>
</a>
<a href="/create">
    <IconStack>
        <Create />
        <span slot="text">Create</span>
    </IconStack>
</a>
<a href="/actions">
    <IconStack>
        <Actions />
        <span slot="text" style="transform: translateX(-.8ch);">Actions</span>
    </IconStack>
</a>
<a href="/plebian">
    <IconStack>
        <Plebian />
        <span slot="text">Plebian</span>
    </IconStack>
</a>

<style lang="scss">
    a {
        transition: all 0.2s ease-in-out;
        &:hover {
            color: var(--color-primary);
            transform: translateY(-2px);
        }
    }
</style>
