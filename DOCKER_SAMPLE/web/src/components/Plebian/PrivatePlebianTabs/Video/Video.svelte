<script lang="ts">
    import type { VideoType } from 'src/shared/types';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import VideoCard from './VideoCard.svelte';
    let videos: Writable<VideoType[]> = getContext('videos');
</script>

<section class="video-list">
    {#each $videos as video (video.id)}
        <VideoCard {video} />
    {/each}
</section>

<style lang="scss">
    .video-list {
        margin-top: 1.5em;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 2px;
    }
</style>
