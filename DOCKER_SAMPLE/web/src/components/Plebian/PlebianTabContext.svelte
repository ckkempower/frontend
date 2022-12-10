<script lang="ts" context="module">
    export type PlebianTab = 'plebian' | 'video' | 'power' | 'plebian';
</script>

<script lang="ts">
    import { setContext } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import MyVideosContext from './PrivatePlebianTabs/Video/MyVideosContext.svelte';
    let tab: Writable<PlebianTab> = writable('video');
    setContext('plebian-tab', tab);
</script>

<MyVideosContext>
    <slot />
</MyVideosContext>
