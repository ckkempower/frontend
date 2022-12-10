<script lang="ts">
    import { userStore } from 'src/stores';
</script>

<h1>Hi there {$userStore?.user?.userName}</h1>
