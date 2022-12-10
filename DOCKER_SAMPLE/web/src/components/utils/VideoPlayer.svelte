<script lang="ts">
    import { fade } from 'svelte/transition';

    export let src: string;

    // These values are bound to properties of the video
    let currentTime = 0;
    let duration: number;
    let paused: boolean = true;

    // Used to track time of last mouse down event
    let lastMouseDown: number;

    // we can't rely on the built-in click event, because it fires
    // after a drag — we have to listen for clicks ourselves
    const handleMousedown = (e: any) => {
        lastMouseDown = new Date().getTime();
    };

    let showPlayPause: boolean = false;
    let showPlayPauseTimeout: NodeJS.Timeout;
    const fadeout: number = 250;

    const handleMouseup = (e: any) => {
        if (new Date().getTime() - lastMouseDown < 300) {
            clearTimeout(showPlayPauseTimeout);
            showPlayPauseTimeout = setTimeout(
                () => (showPlayPause = false),
                fadeout
            );
            showPlayPause = true;

            if (paused) e.target.play();
            else e.target.pause();
        }
    };
</script>

<!-- use /video/car.mp4 or dog.mp4 for testing -->
<video
    loop
    {src}
    type="video/mp4"
    on:mousedown={handleMousedown}
    on:mouseup={handleMouseup}
    bind:currentTime
    bind:duration
    bind:paused
>
    <track kind="captions" />
    <p>Your device does not support playing video</p>
</video>

{#if showPlayPause && duration}
    <div class="paused" out:fade={{ duration: fadeout }}>
        {#if paused}
            <!-- pause -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="square"
                stroke-linejoin="round"
            >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
            </svg>
        {:else}
            <!-- play -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="square"
                stroke-linejoin="round"
            >
                <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
        {/if}
    </div>
{/if}

<div class="progress-bar">
    <div
        class="progress"
        style="width: {(currentTime / duration) * 100 || 0}%"
    />
</div>

<!-- </div>
</div> -->
<style>
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .video-player {
        display: relative;
        width: auto;
        position: relative;
    }

    .paused {
        color: red;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform: scale(4);
    }

    .progress-bar {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 4px;
        transform: translate(0px, -4px);
        /* background: green; */
    }

    .progress {
        height: inherit;
        background: red;
    }
</style>
