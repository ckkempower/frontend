<script lang="ts">
    import { browser } from '$app/env';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import PublicPlebian from 'src/components/Plebian/PublicPlebian.svelte';
    import PublicPlebianContext from 'src/components/Plebian/PublicPlebianContext.svelte';
    import WaitForUser from 'src/components/utils/WaitForUser.svelte';
    import { onMount } from 'svelte';
</script>

<WaitForUser required={false}>
    <div class="header-left" slot="header-left">
        <h1>Plebian</h1>
    </div>
    <PublicPlebianContext>
        <PublicPlebian />
    </PublicPlebianContext>
</WaitForUser>
