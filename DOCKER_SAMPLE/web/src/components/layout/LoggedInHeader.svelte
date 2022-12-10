<script lang="ts">
    import { browser } from '$app/env';
    import { goto } from '$app/navigation';
    import { userStore } from 'src/stores';
    import { signout } from 'src/utils/signout';
    import Gear from '../svg/Gear.svelte';
    import ThreeDots from '../svg/ThreeDots.svelte';
    import ContextItem from '../utils/ContextItem.svelte';
    import ContextMenu from '../utils/ContextMenu.svelte';
    import Header from './Header.svelte';
</script>

<Header>
    <slot slot="header-left" name="header-left" />
    <div class="right" slot="header-right">
        <slot class="right" name="header-right" />
        <span class="context">
            <ContextMenu>
                <div class="menu" slot="menu">
                    <a href="/settings" class="no-underline">
                        <ContextItem>
                            <Gear size="1.5em" slot="icon" />
                            Settings
                        </ContextItem>
                    </a>
                    <span on:click={signout}>
                        <ContextItem>Log Out</ContextItem>
                    </span>
                </div>
                <ThreeDots size="24px" />
            </ContextMenu>
        </span>
    </div>
</Header>
