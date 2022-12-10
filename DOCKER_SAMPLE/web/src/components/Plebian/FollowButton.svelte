<script lang="ts">
    import { goto } from '$app/navigation';
    import type { AccountType } from 'src/shared/types';
    import { userStore } from 'src/stores';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { follow, unfollow } from './utils/follow';

    export let user: AccountType | null = null;
    let myUser = $userStore.user;
    export let style: string = '';
    let className = '';
    export { className as class };
    let followers = getContext<Writable<number[]>>('public-followers');

    const handleClick = async (e: MouseEvent) => {
        if (!user) return;
        if (!myUser) {
            // TODO: show login modal
            goto('/');
            return;
        }
        if (myUser.id === user.id) return;
        const success = following ? await unfollow(user) : await follow(user);
        if (success) {
            following = !following;
        }
    };

    let following: boolean =
        $followers.find((f) => f === myUser?.id) !== undefined;

    $: following = $followers.find((f) => f === myUser?.id) !== undefined;
</script>

<button
    {style}
    class={className}
    on:click={handleClick}
    disabled={myUser?.id === user?.id}
>
    <slot>
        {following ? 'Following' : 'Follow'}
    </slot>
</button>
