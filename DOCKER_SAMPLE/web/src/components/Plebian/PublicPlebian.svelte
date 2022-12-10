<script lang="ts">
    import type { AccountType } from 'src/shared/types';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import UserHeader from './UserHeader.svelte';

    let publicUser: Writable<AccountType> = getContext('public-user');
</script>

<div class="public-plebian light-theme">
    <UserHeader user={$publicUser} isPublic />
</div>

<style lang="scss">
    .public-plebian {
        height: 100%;
    }
</style>
