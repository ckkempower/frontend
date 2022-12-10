<script lang="ts">
    import PowerDisplay from 'src/components/utils/PowerDisplay.svelte';
    import type { VideoType } from 'src/shared/types';

    export let video: VideoType;
</script>

<a
    href="/v/{video.id}"
    class="video-card header-body-footer no-underline hoverable"
>
    <div class="header">
        <span class="title" title={video.title}>{video.title}</span>
    </div>
    <div class="body" />
    <div class="footer">
        <PowerDisplay power={video.power} />
    </div>
</a>

<style lang="scss">
    .video-card {
        width: 18rem;
        height: 20rem;
        background-color: var(--color-primary);
    }
    .header-body-footer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .body {
            flex: 1;
        }
    }

    .footer {
        display: flex;
        justify-content: center;
        margin-bottom: 0.5rem;
    }
</style>
