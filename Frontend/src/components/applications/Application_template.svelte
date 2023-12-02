<script lang="ts">

import Weather from './Weather/Weather.svelte';

let mod: string = "Weather";
//이 mod는 외부에서 받는 값이어야 함

</script>

{#if mod === "Weather"}
        <Weather />
{:else}
        <h1>Not implemented yet</h1>
{/if}

