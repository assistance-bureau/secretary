<script lang="ts">
	import ApplicationTemplate from '../components/applications/Application_template.svelte';
    import Main_dashboard from '../components/dashboard/Main_dashboard.svelte';
    import { scale } from 'svelte/transition';

    // 0 -> dashboard
    // 1 -> application
    let mod: number = 0;
</script>

<button on:click={() => mod = mod === 0 ? 1 : 0}>Toggle Mode</button>

{#if mod === 0}
    <div transition:scale={{ duration: 250 }}>
        <Main_dashboard />
    </div>
{:else}
    <div transition:scale={{ duration: 250 }}>
        <ApplicationTemplate />
    </div>
{/if}