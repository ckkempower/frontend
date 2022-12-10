<script lang="ts">
    import { fade } from 'svelte/transition';

    let passwordData = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    let disabled = true;

    $: passwordData,
        (disabled =
            !passwordData.oldPassword ||
            !passwordData.newPassword ||
            !passwordData.confirmPassword);

    let success: boolean = false;
    let message: string = '';

    const handleUpdatePassword = async (e: SubmitEvent) => {
        e.preventDefault();
        if (
            !passwordData.oldPassword ||
            !passwordData.newPassword ||
            !passwordData.confirmPassword
        )
            return;
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            message = 'Passwords do not match!';
            success = false;
            setTimeout(() => {
                message = '';
            }, 3000);
            return;
        }
        const res = await fetch('/api/account/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(passwordData),
        });
        const data = await res.json();
        if (data) {
            message = data.message;
            success = data.success;
            setTimeout(() => {
                message = '';
                success = false;
            }, 3000);
        }
    };
</script>

<form
    method="POST"
    name="update-password"
    class="update-password"
    on:submit={handleUpdatePassword}
>
    <h2>Update Password</h2>
    <input
        type="password"
        placeholder="Old Password"
        name="oldPassword"
        required
        bind:value={passwordData.oldPassword}
    />
    <input
        type="password"
        placeholder="New Password"
        name="newPassword"
        required
        bind:value={passwordData.newPassword}
    />
    <input
        type="password"
        placeholder="Confirm New Password"
        name="confirmPassword"
        required
        bind:value={passwordData.confirmPassword}
    />
    {#if message}
        <div
            class={success ? 'success' : 'error'}
            transition:fade={{ duration: 200 }}
        >
            {message}
        </div>
    {/if}
    <button type="submit" {disabled}>Update Password</button>
</form>

<style lang="scss">
    .update-password {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
    }
</style>
