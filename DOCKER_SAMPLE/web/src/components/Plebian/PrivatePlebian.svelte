<script lang="ts">
    import WaitForUser from 'src/components/utils/WaitForUser.svelte';
    import { userStore } from 'src/stores';
    import PlebianTabContext from './PlebianTabContext.svelte';
    import PlebianTabControls from './PlebianTabControls.svelte';
    import PrivatePlebianTabs from './PrivatePlebianTabs/PrivatePlebianTabs.svelte';
    import UserHeader from './UserHeader.svelte';
    let user = $userStore.user;
</script>

<PlebianTabContext>
    <WaitForUser class="light-theme">
        <div class="header-left" slot="header-left">
            <h1>Plebian</h1>
        </div>
        <div class="plebian-container light-theme">
            <UserHeader />
            <PlebianTabControls />
            <PrivatePlebianTabs />
        </div>
    </WaitForUser>
</PlebianTabContext>

<style lang="scss">
    .plebian-container {
        height: 100%;
    }
</style>
