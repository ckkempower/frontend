<script lang="ts">
    import { goto } from '$app/navigation';
    import { userStore } from 'src/stores';
    import PowerDisplay from '../utils/PowerDisplay.svelte';

    export let assignedPower = 0;
    let hoverState: 'left' | 'right' | 'none' = 'none';

    const transferPowerToVideo = (amount: number) => {
        if (!$userStore.user) return;
        if (amount < 0) return;
        if (amount > $userStore.user?.power) return;
        $userStore.user.power -= amount;
        assignedPower += amount;
    };

    const transferPowerToUser = (amount: number) => {
        if (!$userStore.user) return;
        if (amount < 0) return;
        if (amount > assignedPower) return;
        $userStore.user.power += amount;
        assignedPower -= amount;
    };
</script>

<div class="power-transfer">
    <div
        class="power left"
        on:mouseenter={() => {
            hoverState = 'left';
        }}
        on:mouseleave={() => {
            hoverState = 'none';
        }}
        on:click={() => {
            transferPowerToUser(1);
        }}
    >
        <div class="top">
            <PowerDisplay power={$userStore?.user?.power || 0} height="2em" />
        </div>
        <div class="bottom">Your Power</div>
    </div>
    <div class="middle">
        {#if hoverState === 'right'}
            &gt;&gt;
        {/if}
        {#if hoverState === 'left'}
            &lt;&lt;
        {/if}
        {#if hoverState === 'none'}
            &mdash;&mdash;
        {/if}
    </div>
    <div
        class="power right"
        on:mouseenter={() => (hoverState = 'right')}
        on:mouseleave={() => (hoverState = 'none')}
        on:click={() => {
            transferPowerToVideo(1);
        }}
    >
        <div class="top">
            <PowerDisplay power={assignedPower} height="2em" />
        </div>
        <div class="bottom">Assigned Power</div>
    </div>
</div>

<style lang="scss">
    .power-transfer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        font-size: 2em;
        font-weight: bold;
        margin: 1em 0;
        color: var(--color-primary);
    }
    .left {
        flex: 1;
    }
    .middle {
        flex: 1;
        text-align: center;
        user-select: none;
    }
    .right {
        flex: 1;
    }
    .power {
        cursor: pointer;
        user-select: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .bottom {
            font-size: 50%;
        }
    }
</style>
