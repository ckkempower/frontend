<script lang="ts">
    import UpdatePassword from 'src/components/auth/UpdatePassword.svelte';
    import UpdatePfp from 'src/components/settings/UpdatePfp.svelte';
    import WaitForUser from 'src/components/utils/WaitForUser.svelte';
    import { userStore } from 'src/stores';
    let pfp: {
        file: string;
        extension: string;
    } = {
        file: '',
        extension: '',
    };
    userStore.subscribe((user) => {
        if (user?.user) {
            pfp.file = user.user?.pfp || '';
        }
    });
</script>

<WaitForUser>
    <h1 slot="header-left">Settings</h1>
    <div class="settings-page">
        <UpdatePfp />
        <UpdatePassword />
    </div>
</WaitForUser>

<style lang="scss">
    .settings-page {
        padding: min(5%, 3em);
        display: flex;
        flex-direction: column;
        gap: 2em;
    }
</style>
