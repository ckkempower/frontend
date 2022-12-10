<script lang="ts">
    export let src: string | undefined;
    export let alt = 'Profile Pic';
</script>

<img {src} class="profile-picture" {alt} />

<style lang="scss">
    .profile-picture {
        object-fit: cover;
        width: 10em;
        height: 8em;
    }
</style>
