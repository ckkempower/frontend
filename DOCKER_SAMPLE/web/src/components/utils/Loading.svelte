<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    export let errorTimeout = 3000;
    let errorMessage = '';
    let timeout: NodeJS.Timeout | undefined;
    onMount(() => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            errorMessage = 'Something went wrong when loading Empower';
        }, errorTimeout);
    });

    onDestroy(() => {
        if (timeout) clearTimeout(timeout);
        timeout = undefined;
    });
</script>

<h1>Loading...</h1>
<h2>{errorMessage}</h2>
