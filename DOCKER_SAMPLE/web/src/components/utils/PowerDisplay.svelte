<script lang="ts">
    import Power from '../svg/icons/Power.svelte';
    import IconDisplay from './IconDisplay.svelte';
    export let power: number = 0;
    export let type: 'light' | 'medium' | 'dark' = 'light';
    export let height = '1.6em';
</script>

<IconDisplay {height} bind:type>
    <Power {height} slot="icon" />
    {power}
</IconDisplay>
