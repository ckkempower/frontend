<script lang="ts">
    export let files: File[] | undefined = undefined;
</script>

{#if files?.length}
    <video src={URL.createObjectURL(files[0])} controls class="video">
        <track kind="captions" />
    </video>
{/if}

<style lang="scss">
    .video {
        width: min(500px, 100%);
        height: auto;
    }
</style>
