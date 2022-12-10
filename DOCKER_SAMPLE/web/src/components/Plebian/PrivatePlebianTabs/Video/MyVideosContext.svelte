<script lang="ts">
    import type { VideoType } from 'src/shared/types';
    import { onMount, setContext } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    let videos: Writable<VideoType[]> = writable([]);
    setContext('videos', videos);

    onMount(async () => {
        if ($videos.length > 0) return;
        //!TODO switch this to /api/account/me/videos
        const res = await fetch('/api/video/me', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const { videos: incomingVideos, success, message } = await res.json();
        if (success) {
            videos.set(incomingVideos);
        } else {
            console.log('Error loading my videos:', message || 'Unknown error');
        }
    });
</script>

<slot />
