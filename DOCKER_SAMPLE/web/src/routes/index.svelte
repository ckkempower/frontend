<script lang="ts">
    import LoggedInHome from 'src/components/Home/LoggedIn/LoggedInHome.svelte';
    import LoggedOutHome from 'src/components/Home/LoggedOut/LoggedOutHome.svelte';
    import WaitForUser from 'src/components/utils/WaitForUser.svelte';
    import { userStore } from 'src/stores';
</script>

<WaitForUser>
    <LoggedOutHome slot="fallback" />
    <LoggedInHome />
</WaitForUser>
