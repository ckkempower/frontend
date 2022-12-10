<script lang="ts">
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
                    <a href="/" class="no-underline">
                        <ContextItem>Sign Up</ContextItem>
                    </a>
                </div>
                <ThreeDots size="24px" />
            </ContextMenu>
        </span>
    </div>
</Header>
