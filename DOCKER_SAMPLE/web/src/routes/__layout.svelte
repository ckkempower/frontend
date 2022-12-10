<script lang="ts">
    import { userStore } from 'src/stores';
    import GlobalStyles from 'src/styles/GlobalStyles.svelte';
    import { onMount } from 'svelte';

    onMount(async () => {
        const token = localStorage.getItem('token');
        if ($userStore?.user || !token) {
            $userStore.fetching = false;
            return;
        }
        const res = await fetch('/api/account', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        if (res.status === 200 || 304) {
            userStore.set({
                user: data.account,
                fetching: false,
            });
        } else {
            userStore.set({
                user: undefined,
                fetching: false,
            });
        }
        console.log($userStore);
    });
</script>

<svelte:head>
    <title>Empower</title>
    <meta name="description" content="Empower" />
    <meta name="keywords" content="Empower" />
    <meta name="author" content="Trevor Brown" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
    />
    <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
    />
</svelte:head>

<GlobalStyles>
    <slot />
</GlobalStyles>
