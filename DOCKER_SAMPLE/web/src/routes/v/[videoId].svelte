<script lang="ts">
    import { goto } from '$app/navigation';

    import { page } from '$app/stores';
    import Loading from 'src/components/utils/Loading.svelte';
    import PowerDisplay from 'src/components/utils/PowerDisplay.svelte';
    import WaitForUser from 'src/components/utils/WaitForUser.svelte';
    import { Video } from 'src/models/Video';
    import type { VideoType } from 'src/shared/types';
    import { onMount } from 'svelte';
    const videoId = $page.params.videoId;
    let video: VideoType | null = null;
    let fetching = false;
    let error = false;
    let errorMessage = '';
    onMount(async () => {
        fetching = false;
        if (videoId === null) {
            goto('/');
            return;
        }
        fetching = true;
        try {
            video = await Video.fetchVideo(videoId);
        } catch (e: any) {
            error = true;
            errorMessage = e.toString();
        } finally {
            fetching = false;
        }
    });
    let videoPlayer: HTMLVideoElement | null = null;
</script>

<WaitForUser required={false}>
    {#if video}
        <div class="video-container">
            <video
                src={video.url}
                autoplay
                class="video"
                controls
                type="video/mp4"
                bind:this={videoPlayer}
                on:error={() => {
                    console.log('error');
                }}
                on:ended={() => {
                    console.log('ended');
                    if (!videoPlayer) return;
                    videoPlayer.currentTime = 0;
                    videoPlayer.play();
                }}
            >
                <track kind="captions" />
            </video>
            <div class="video-info">
                <div class="left">
                    <h1>{video?.title}</h1>
                    <p>{video?.description}</p>
                </div>
                <div class="right">
                    <PowerDisplay power={video?.power} />
                </div>
            </div>
        </div>
    {/if}
    {#if fetching}
        <Loading />
    {/if}
    {#if error}
        <div class="error">{errorMessage}</div>
    {/if}
</WaitForUser>

<style lang="scss">
    .video-container {
        width: min-content;
    }
    .video {
        max-width: 768px;
    }
    .video-info {
        margin-top: 1em;
        display: flex;
        justify-content: space-between;
    }
</style>
