<script lang="ts">
    import { draw } from 'svelte/transition';
</script>

<svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        transition:draw={{ duration: 1000 }}
        d="M2 22L22 2M2 2L22 22"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
    />
</svg>
