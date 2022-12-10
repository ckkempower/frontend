<script lang="ts">
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import LogIn from './LogIn.svelte';
    import Modal from './Modal.svelte';
    import SignUp from './SignUp.svelte';
    import Arrow from '../svg/Arrow.svelte';

    export let modalVisible = false;
    let mode = writable<'signup' | 'login'>('signup');
    let stage = writable(0);
    setContext('stage', stage);
    setContext('mode', mode);
</script>

<Modal
    visible={modalVisible}
    handleClose={() => {
        modalVisible = false;
    }}
>
    <div class="header" slot="header">
        {#if $stage != 0}
            <span class="back" on:click={() => $stage--}><Arrow /></span>
        {/if}
        {#if $mode === 'signup'}
            <span
                >Already have an account? <span
                    class="link"
                    on:click={() => {
                        $mode = 'login';
                    }}>Login</span
                ></span
            >
        {/if}
        {#if $mode === 'login'}
            <span
                >Don't have an account? <span
                    class="link"
                    on:click={() => {
                        $mode = 'signup';
                    }}>Sign Up</span
                ></span
            >
        {/if}
    </div>
    {#if $mode == 'signup'}
        <SignUp />
    {/if}
    {#if $mode == 'login'}
        <LogIn />
    {/if}
</Modal>

<style lang="scss">
    .header {
        display: flex;
        gap: 1em;
        align-items: center;
    }
    .back {
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        color: var(--color-medium);
        &:hover {
            color: var(--color-primary);
        }
    }
    .link {
        color: var(--color-primary);
        cursor: pointer;
        user-select: none;
        &:hover {
            text-decoration: underline;
        }
    }
</style>
