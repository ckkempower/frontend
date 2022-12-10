<script lang="ts">
    import UploadVideo from 'src/components/Create/UploadVideo.svelte';
    import WaitForUser from 'src/components/utils/WaitForUser.svelte';
</script>

<WaitForUser>
    <UploadVideo />
</WaitForUser>
