<script lang="ts">
    import Loading from './Loading.svelte';
    import { userStore } from 'src/stores';
    import LoggedInLayout from '../layout/LoggedInLayout.svelte';
    import { fade } from 'svelte/transition';
    import LoggedOutLayout from '../layout/LoggedOutLayout.svelte';
    export let required: boolean = true;
    let className: string = '';
    export { className as class };
</script>

{#if $userStore?.fetching && required}
    <div
        out:fade={{ duration: 500 }}
        class="page-container centered dark-theme"
        style="position: absolute; width: 100vw; height: 100vh;"
    >
        <Loading />
    </div>
{/if}
{#if $userStore?.user?.id}
    <LoggedInLayout>
        <slot name="header-left" slot="header-left" />
        <slot name="header-right" slot="header-right" />
        <slot class={className} />
    </LoggedInLayout>
{:else if required}
    <LoggedOutLayout>
        <slot name="header-left" slot="header-left" />
        <slot name="header-right" slot="header-right" />
        <slot name="fallback" class={className} />
    </LoggedOutLayout>
{:else}
    <LoggedOutLayout>
        <slot name="header-left" slot="header-left" />
        <slot name="header-right" slot="header-right" />
        <slot class={className} />
    </LoggedOutLayout>
{/if}
