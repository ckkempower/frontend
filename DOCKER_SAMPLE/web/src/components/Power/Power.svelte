<script lang="ts">
    import { onMount } from 'svelte';
    import type { VideoType } from 'src/shared/types';
    import Video from '../svg/icons/Video.svelte';
    import VideoPlayer from '../utils/VideoPlayer.svelte';
    let videos: VideoType[] = [];

    onMount(async () => {
        const res = await fetch('/api/video');
        const data = await res.json();
        videos = data.videos;
    });
</script>

<div class="power">
    {#each videos as video}
        <div class="video-container">
            <strong>{video.title}</strong>
            <p>{video.description}</p>
            <p>Power: {video.power}</p>
            <p>{video.createdAt}</p>
            <div class="video">
                <!-- <video controls>
                    <source src={video.url} type="video/mp4" />
                    <track kind="captions" label="English" />
                </video> -->
                <VideoPlayer src={video.url} />
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    video {
        width: min(500px, 100%);
        height: auto;
    }
</style>
