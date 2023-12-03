<script lang="ts">
import { get } from 'svelte/store';

import Weather from './Weather/Weather.svelte';
import Login from './Login/Login.svelte';

import { mode } from '../../utils/Store';

$: mode;

</script>

{#if get(mode).name === "login"}
        <Login />
{:else}
        <h1>Not implemented yet</h1>
{/if}

