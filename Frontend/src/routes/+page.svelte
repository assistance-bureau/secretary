<script lang="ts">
	import ApplicationTemplate from '../components/applications/Application_template.svelte';
    import Main_dashboard from '../components/dashboard/Main_dashboard.svelte';
    import { scale } from 'svelte/transition';

    // 0 -> dashboard 1 -> application

    import { mode } from '../utils/Store';
    // sounds
    // import { playSound } from '../utils/Sounds';

</script>

{#if $mode.mod === 0}
    <div transition:scale={{ duration: 250 }}>
        <Main_dashboard />
    </div>
{:else}
    <div transition:scale={{ duration: 250 }}>
        <ApplicationTemplate />
    </div>
{/if}