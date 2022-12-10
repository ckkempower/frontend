<script lang="ts">
    import type { AccountType } from 'src/shared/types';
    import { onMount, setContext } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { page } from '$app/stores';
    import { browser } from '$app/env';
    import { goto } from '$app/navigation';
    let publicUser: Writable<AccountType | null> = writable(null);
    let followers: Writable<number[]> = writable([]);

    setContext('public-user', publicUser);
    setContext('public-followers', followers);
    const fetchAccount = async (userId: string) => {
        const res = await fetch(`/api/account/${userId}`);
        const { account } = await res.json();
        if (res.status === 200) {
            publicUser.set(account);
        } else {
            console.log(
                'Error loading user:',
                account.message || 'Unknown error'
            );
        }
    };

    const fetchFollowers = async (userId: string) => {
        const res = await fetch(`/api/account/${userId}/followers`);
        if (res.ok) {
            const payload = await res.json();
            followers.set(payload.followers);
        }
    };
    onMount(async () => {
        if (!browser) return;
        const userId = $page.params.userId;
        if (typeof userId === 'undefined' || userId === null) {
            goto('/');
            return;
        }
        fetchAccount(userId);
        fetchFollowers(userId);
    });
</script>

<slot />
