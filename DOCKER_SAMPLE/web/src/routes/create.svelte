<script lang="ts">
    import WaitForUser from 'src/components/utils/WaitForUser.svelte';
    import Create from 'src/components/Create/Create.svelte';
</script>

<WaitForUser>
    <h1 slot="header-left">Create</h1>
    <Create />
</WaitForUser>
