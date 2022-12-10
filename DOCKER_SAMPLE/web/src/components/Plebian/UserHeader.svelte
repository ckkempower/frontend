<script lang="ts">
    import { userStore } from 'src/stores';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import Plebian from '../svg/icons/Plebian.svelte';
    import IconDisplay from '../utils/IconDisplay.svelte';
    import PfpSquare from '../utils/PfpSquare.svelte';
    import PowerDisplay from '../utils/PowerDisplay.svelte';
    import FollowButton from './FollowButton.svelte';
    export let isPublic = false;
    export let user = $userStore.user;
    const followers = getContext<Writable<number[]>>('public-followers');
</script>

<div class="user-header">
    <div class="flex">
        <PfpSquare src={user?.pfp} alt="Profile Pic" />
        <div class="info">
            <strong class="username">
                {user?.userName}
            </strong>
            <hr class="line" />
            <span class="title">Legionary</span>
            <address class="location">
                {user?.city}, {user?.state}, {user?.country}
            </address>
            {#if !isPublic}
                <a class="view-public" href={`/plebian/${user?.id}`}
                    >View Public Profile</a
                >
            {/if}
            {#if isPublic}
                <FollowButton
                    {user}
                    style="width:min-content; padding: 1em 2em;"
                    class="secondary"
                />
            {/if}
        </div>
    </div>
    <div class="power-followers">
        <IconDisplay type="medium">
            <Plebian height="1.6em" slot="icon" />
            {$followers?.length || 0}
        </IconDisplay>
        <PowerDisplay power={user?.power} type="medium" />
    </div>
</div>

<style lang="scss">
    .flex {
        flex-wrap: wrap;
        flex: 1;
    }
    .user-header {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
        padding: 1em 2em;
        align-items: center;
    }
    .line {
        width: 7em;
        border-top: 1px solid var(--color-dark);
        margin: 0.3em 0;
    }

    .info {
        display: flex;
        flex-direction: column;
        flex: 1;
        :not(.line) {
            padding-left: 1em;
        }
    }
    .view-public {
        color: var(--color-medium);
    }
</style>
