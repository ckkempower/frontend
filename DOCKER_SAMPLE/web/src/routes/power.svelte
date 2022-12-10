<script lang="ts">
    import WaitForUser from 'src/components/utils/WaitForUser.svelte';
    import Power from 'src/components/Power/Power.svelte';
</script>

<WaitForUser>
    <h1 slot="header-left">Power</h1>
    <Power />
</WaitForUser>
