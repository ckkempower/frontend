<script lang="ts">
    import { userStore } from 'src/stores';
    import { fade } from 'svelte/transition';
    import PfpInput from '../auth/PfpInput.svelte';
    let message: string = '';
    let success: boolean = false;
    let pfp: {
        file: string;
        extension: string;
    } = {
        file: $userStore?.user?.pfp || '',
        extension: '',
    };
    let disabled = false;
    $: pfp, (disabled = !pfp?.file || pfp?.file === $userStore?.user?.pfp);

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        if (!$userStore?.user) return;
        if (disabled) return;
        console.log(pfp);
        const res = await fetch('/api/account/pfp', {
            method: 'PUT',
            body: JSON.stringify(pfp),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const data = await res.json();
        if (res.status === 200) {
            $userStore.user.pfp = data.pfp;
        }
        message = data.message;
        success = data.success;
        setTimeout(() => {
            message = '';
            success = false;
        }, 3000);
    };
</script>

<form
    action="POST"
    name="update-pfp"
    on:submit={handleSubmit}
    class="update-pfp"
>
    <h3>Change Profile Picture</h3>
    <PfpInput bind:pfp />
    {#if message}
        <div
            transition:fade={{ duration: 400 }}
            class="message bold {success ? 'success' : 'error'}"
        >
            {message}
        </div>
    {/if}
    <button type="submit" {disabled}>Change Profile Picture</button>
</form>

<style lang="scss">
    .update-pfp {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
    }
</style>
