<script lang="ts">
    let files: FileList;
    export let pfp: {
        file: string;
        extension: string;
    };
    $: if (files?.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const extension = file.name.split('.').pop();
            const fileData = e?.target?.result;
            if (!extension || !fileData) return;
            pfp.file = fileData as string;
            pfp.extension = extension;
        };
        reader.readAsDataURL(file);
    }
</script>

<div class="change-pfp">
    <div class="pfp-container">
        <img
            class="pfp"
            src={pfp?.file ||
                'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='}
            alt="PFP"
        />
        <input type="file" accept="image/*" bind:files />
    </div>
</div>

<style lang="scss">
    .pfp-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
    }
    .pfp {
        border-radius: 10000px;
        width: 200px;
        height: 200px;
        object-fit: cover;
        border: 2px solid var(--color-primary);
    }
</style>
