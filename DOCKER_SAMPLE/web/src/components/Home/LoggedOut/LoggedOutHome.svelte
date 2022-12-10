<script lang="ts">
    import SignUpModal from 'src/components/auth/SignUpModal.svelte';
    let modalVisible = false;
</script>

<SignUpModal bind:modalVisible />
<main class="center-self">
    <h1>Empower</h1>
    <button
        on:click={() => {
            modalVisible = true;
        }}>Get Started</button
    >
</main>
