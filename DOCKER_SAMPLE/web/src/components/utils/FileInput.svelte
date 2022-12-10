<script lang="ts">
    import MobileOrDesktop from './MobileOrDesktop.svelte';

    export let files: File[] = [];
    let fileList: FileList;
    let dragOver = false;
    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        if (!e.dataTransfer?.files) return;
        //make sure only one file is dropped
        if (e.dataTransfer.files.length > 1) return;
        //make sure file is a video
        if (e.dataTransfer.files[0].type !== 'video/mp4') return;

        files = [...Array.from(e.dataTransfer.files)];
        dragOver = false;
    };
    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        dragOver = true;
    };
    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        dragOver = false;
    };

    const handleChange = (e: Event) => {
        console.log('Running');
    };
    $: fileList, (files = Array.from(fileList || []));
</script>

<div
    class="dropzone"
    on:drop={handleDrop}
    class:dragOver
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}
>
    <input
        type="file"
        id="file"
        name="file"
        class="input-hidden"
        accept="video/mp4"
        bind:files={fileList}
    />
    <label for="file">
        <MobileOrDesktop>
            <svelte:fragment slot="desktop">
                Drag and drop a video here<br />or<br />click to select a video
            </svelte:fragment>
            <svelte:fragment slot="mobile">
                Tap here to select a video
            </svelte:fragment>
        </MobileOrDesktop>
    </label>
</div>

<style lang="scss">
    .input-hidden {
        display: none;
    }
    .dropzone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 2px dashed #ccc;
        border-radius: 5px;
        padding: 1em;
        height: 200px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &.dragOver,
        &:hover {
            border-color: var(--color-primary);
            color: var(--color-primary);
        }

        label {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            text-align: center;
        }
    }
</style>
