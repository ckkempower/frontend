<script lang="ts">
    import FileInput from '../utils/FileInput.svelte';
    import FileNameList from '../utils/FileNameList.svelte';
    import PreviewVideo from '../utils/PreviewVideo.svelte';
    import PowerTransfer from './PowerTransfer.svelte';
    let title: string;
    let description: string;
    let files: File[] = [];
    let assignedPower: number = 0;
    const handleSubmit = async () => {
        if (!files?.length || !title || !description || !assignedPower) return;
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', 'test');
        formData.append('description', 'test desc');
        formData.append('power', assignedPower.toString());

        // upload
        const resUpload = await fetch('/api/video', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: formData,
        });
        const { video } = await resUpload.json();
        if (resUpload.status !== 200) {
            // pass
        }

        // fetch uploaded video
        const resVideo = await fetch(`/api/video/${video.id}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
            }),
        });
    };
    $: files;
</script>

<form
    action="POST"
    class="upload-video"
    on:submit|preventDefault={handleSubmit}
>
    <input type="text" name="title" placeholder="Title" bind:value={title} />
    <textarea
        name="description"
        placeholder="Description"
        bind:value={description}
    />
    <FileInput bind:files />
    <FileNameList bind:files />
    <PowerTransfer bind:assignedPower />
    <button type="submit" disabled={!files?.length}>Upload</button>
</form>
<PreviewVideo bind:files />

<style lang="scss">
    .upload-video {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: min(400px, 100%);
        max-width: 400px;
    }
</style>
