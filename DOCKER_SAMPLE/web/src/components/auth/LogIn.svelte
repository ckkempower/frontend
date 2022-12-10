<script lang="ts">
    import { userStore } from 'src/stores';
    import { tick } from 'svelte';

    let loginInfo = {
        email: '',
        password: '',
    };
    let errorMessage = '';
    const handleLogin = async (e: SubmitEvent) => {
        e.preventDefault();
        $userStore.fetching = true;

        if (!loginInfo.email || !loginInfo.password) {
            $userStore.fetching = false;
            errorMessage = 'Please fill out all fields';
            setTimeout(() => {
                errorMessage = '';
            }, 3000);
        }
        const res = await fetch('/api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInfo),
        });
        const data = await res.json();
        if (data.message) {
            errorMessage = data.message;
            userStore.set({
                fetching: false,
                user: undefined,
            });
            setTimeout(() => {
                errorMessage = '';
            }, 3000);
        } else if (data.token) {
            localStorage.setItem('token', data.token);
            userStore.set({
                fetching: false,
                user: data.account,
            });
        }
    };
</script>

<form action="POST" name="login" class="login" on:submit={handleLogin}>
    <h2>Log In</h2>
    <div class="group">
        <input
            type="email"
            placeholder="Email"
            name="email"
            required
            bind:value={loginInfo.email}
        />
        <input
            type="password"
            placeholder="Password"
            name="password"
            required
            bind:value={loginInfo.password}
        />
    </div>
    {#if errorMessage}
        <div class="error">{errorMessage}</div>
    {/if}
    <button type="submit">Login</button>
</form>

<style lang="scss">
    .login {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.8em;
        padding: 4em;
        padding-top: 1em;
        .group {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.4em;
        }
        & > * {
            width: 100%;
        }
        .error {
            color: var(--color-warning-dark);
        }
    }
</style>
